import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentSchema } from "@/application/runtime/builder/type";

export interface EditorState {
    schemas: {
        announcement: ComponentSchema | null;
        navbar: ComponentSchema | null;
        main: ComponentSchema[]; // The page main content (is an array of components)
        footer: ComponentSchema | null;
        whatsAppButton: ComponentSchema | null;
    };
    theme: any | null; // Global theme config
    selectedNodeId: string | null;
    activeSection: 'header' | 'main' | 'footer' | 'global' | null;
    status: 'idle' | 'loading' | 'saving' | 'failed';
    error: string | null;
}

const initialState: EditorState = {
    schemas: {
        announcement: null,
        navbar: null,
        main: [],
        footer: null,
        whatsAppButton: null,
    },
    theme: null,
    selectedNodeId: null,
    activeSection: null,
    status: 'idle',
    error: null,
};

// Helper: Recursively search and modify a node in a tree/array of ComponentSchema
function modifyNodeInTree(
    nodes: ComponentSchema[],
    id: string,
    modifyFn: (node: ComponentSchema) => void
): boolean {
    for (let node of nodes) {
        if (node.id === id) {
            modifyFn(node);
            return true;
        }
        if (node.children && node.children.length > 0) {
            const found = modifyNodeInTree(node.children, id, modifyFn);
            if (found) return true;
        }
    }
    return false;
}

// Helper: Recursively remove a node from the tree
function removeNodeFromTree(nodes: ComponentSchema[], id: string): boolean {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === id) {
            nodes.splice(i, 1);
            return true;
        }
        if (nodes[i].children && nodes[i].children!.length > 0) {
            const removed = removeNodeFromTree(nodes[i].children!, id);
            if (removed) return true;
        }
    }
    return false;
}

// Helper: Recursively find a node and add a child to it
function addChildToNodeInTree(
    nodes: ComponentSchema[],
    parentId: string,
    childNode: ComponentSchema
): boolean {
    for (let node of nodes) {
        if (node.id === parentId) {
            if (!node.children) node.children = [];
            node.children.push(childNode);
            return true;
        }
        if (node.children && node.children.length > 0) {
            const added = addChildToNodeInTree(node.children, parentId, childNode);
            if (added) return true;
        }
    }
    return false;
}

// Helper: Recursively find the parent and sibling list of a node for reordering
function findParentAndSiblings(
    nodes: ComponentSchema[],
    id: string
): { siblings: ComponentSchema[]; index: number } | null {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === id) {
            return { siblings: nodes, index: i };
        }
        if (nodes[i].children && nodes[i].children!.length > 0) {
            const found = findParentAndSiblings(nodes[i].children!, id);
            if (found) return found;
        }
    }
    return null;
}

// Helper to iterate through all schemas and apply mutation
function mutateGlobalSchemas(
    schemas: EditorState["schemas"],
    id: string,
    modifyFn: (node: ComponentSchema) => void
) {
    if (schemas.announcement && modifyNodeInTree([schemas.announcement], id, modifyFn)) return;
    if (schemas.navbar && modifyNodeInTree([schemas.navbar], id, modifyFn)) return;
    if (schemas.footer && modifyNodeInTree([schemas.footer], id, modifyFn)) return;
    if (schemas.whatsAppButton && modifyNodeInTree([schemas.whatsAppButton], id, modifyFn)) return;
    modifyNodeInTree(schemas.main, id, modifyFn);
}

export const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setSchemas: (
            state,
            action: PayloadAction<Partial<EditorState["schemas"]>>
        ) => {
            state.schemas = { ...state.schemas, ...action.payload };
        },
        selectNode: (state, action: PayloadAction<string | null>) => {
            state.selectedNodeId = action.payload;
            if (action.payload === null) {
                state.activeSection = null;
                return;
            }
            // Determine active section of selected node
            const findInSection = (nodes: ComponentSchema[] | null): boolean => {
                if (!nodes) return false;
                let found = false;
                modifyNodeInTree(nodes, action.payload!, () => { found = true; });
                return found;
            };

            if (findInSection(state.schemas.announcement ? [state.schemas.announcement] : null)) {
                state.activeSection = "header";
            } else if (findInSection(state.schemas.navbar ? [state.schemas.navbar] : null)) {
                state.activeSection = "header";
            } else if (findInSection(state.schemas.footer ? [state.schemas.footer] : null)) {
                state.activeSection = "footer";
            } else if (findInSection(state.schemas.whatsAppButton ? [state.schemas.whatsAppButton] : null)) {
                state.activeSection = "global";
            } else if (findInSection(state.schemas.main)) {
                state.activeSection = "main";
            }
        },
        updateNodeSettings: (
            state,
            action: PayloadAction<{ id: string; settings: Record<string, any> }>
        ) => {
            mutateGlobalSchemas(state.schemas, action.payload.id, (node) => {
                node.settings = { ...action.payload.settings };
            });
        },
        updateNodeLabel: (
            state,
            action: PayloadAction<{ id: string; label: string | null }>
        ) => {
            mutateGlobalSchemas(state.schemas, action.payload.id, (node) => {
                node.label = action.payload.label;
            });
        },
        deleteNode: (state, action: PayloadAction<{ id: string }>) => {
            const id = action.payload.id;
            if (state.selectedNodeId === id) {
                state.selectedNodeId = null;
            }

            // Attempt deletion from each layout root
            if (state.schemas.announcement && state.schemas.announcement.id === id) {
                state.schemas.announcement = null;
                return;
            }
            if (state.schemas.navbar && state.schemas.navbar.id === id) {
                state.schemas.navbar = null;
                return;
            }
            if (state.schemas.footer && state.schemas.footer.id === id) {
                state.schemas.footer = null;
                return;
            }
            if (state.schemas.whatsAppButton && state.schemas.whatsAppButton.id === id) {
                state.schemas.whatsAppButton = null;
                return;
            }

            // Recurse to delete
            if (state.schemas.announcement && removeNodeFromTree([state.schemas.announcement], id)) return;
            if (state.schemas.navbar && removeNodeFromTree([state.schemas.navbar], id)) return;
            if (state.schemas.footer && removeNodeFromTree([state.schemas.footer], id)) return;
            if (state.schemas.whatsAppButton && removeNodeFromTree([state.schemas.whatsAppButton], id)) return;
            removeNodeFromTree(state.schemas.main, id);
        },
        addNode: (
            state,
            action: PayloadAction<{
                parentId: string | null;
                section: "header" | "main" | "footer" | "global";
                node: ComponentSchema;
            }>
        ) => {
            const { parentId, section, node } = action.payload;

            if (parentId) {
                // Add under a specific parent component in the active tree
                if (state.schemas.announcement && addChildToNodeInTree([state.schemas.announcement], parentId, node)) return;
                if (state.schemas.navbar && addChildToNodeInTree([state.schemas.navbar], parentId, node)) return;
                if (state.schemas.footer && addChildToNodeInTree([state.schemas.footer], parentId, node)) return;
                if (state.schemas.whatsAppButton && addChildToNodeInTree([state.schemas.whatsAppButton], parentId, node)) return;
                addChildToNodeInTree(state.schemas.main, parentId, node);
            } else {
                // Add directly as root of the selected section
                if (section === "main") {
                    state.schemas.main.push(node);
                } else if (section === "header") {
                    // Try to append to navbar children if navbar is root
                    if (state.schemas.navbar) {
                        if (!state.schemas.navbar.children) state.schemas.navbar.children = [];
                        state.schemas.navbar.children.push(node);
                    }
                } else if (section === "footer") {
                    if (state.schemas.footer) {
                        if (!state.schemas.footer.children) state.schemas.footer.children = [];
                        state.schemas.footer.children.push(node);
                    }
                } else if (section === "global") {
                    if (state.schemas.whatsAppButton) {
                        if (!state.schemas.whatsAppButton.children) state.schemas.whatsAppButton.children = [];
                        state.schemas.whatsAppButton.children.push(node);
                    }
                }
            }
        },
        moveNode: (
            state,
            action: PayloadAction<{ id: string; direction: "up" | "down" }>
        ) => {
            const { id, direction } = action.payload;
            const searchRoots = [
                state.schemas.announcement,
                state.schemas.navbar,
                state.schemas.footer,
                state.schemas.whatsAppButton,
                ...state.schemas.main,
            ].filter(Boolean) as ComponentSchema[];

            const result = findParentAndSiblings(searchRoots, id);
            if (!result) return;

            const { siblings, index } = result;
            const newIndex = direction === "up" ? index - 1 : index + 1;

            if (newIndex >= 0 && newIndex < siblings.length) {
                // Swap places
                const temp = siblings[index];
                siblings[index] = siblings[newIndex];
                siblings[newIndex] = temp;
            }
        },
        setTheme: (
            state,
            action: PayloadAction<any>
        ) => {
            state.theme = { ...state.theme, ...action.payload };
        },
        setStatus: (
            state,
            action: PayloadAction<EditorState["status"]>
        ) => {
            state.status = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const {
    setSchemas,
    selectNode,
    updateNodeSettings,
    updateNodeLabel,
    deleteNode,
    addNode,
    moveNode,
    setTheme,
    setStatus,
    setError,
} = editorSlice.actions;

export default editorSlice.reducer;
