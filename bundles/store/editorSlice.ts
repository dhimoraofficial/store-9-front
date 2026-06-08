import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentSchema } from "@/application/runtime/builder/type";

const HISTORY_LIMIT = 50;

type SchemasSnapshot = EditorState["schemas"];

export interface EditorState {
    schemas: {
        announcement: ComponentSchema[];
        navbar: ComponentSchema[];
        main: ComponentSchema[]; // The page main content (is an array of components)
        footer: ComponentSchema[];
        whatsAppButton: ComponentSchema[];
    };
    theme: any | null; // Global theme config
    selectedNodeId: string | null;
    hoveredNodeId: string | null;
    activeSection: 'header' | 'main' | 'footer' | 'global' | null;
    status: 'idle' | 'loading' | 'saving' | 'failed';
    error: string | null;
    tenantInfo: {
        domain: string;
        slug: string;
        store: string;
        tenant: string;
    } | null;
    // Undo/redo history — only schemas are tracked (not theme/selection/status)
    history: {
        past: SchemasSnapshot[];
        future: SchemasSnapshot[];
    };
}

const initialState: EditorState = {
    schemas: {
        announcement: [],
        navbar: [],
        main: [],
        footer: [],
        whatsAppButton: [],
    },
    theme: null,
    selectedNodeId: null,
    hoveredNodeId: null,
    activeSection: null,
    status: 'idle',
    error: null,
    tenantInfo: null,
    history: {
        past: [],
        future: [],
    },
};

// Snapshot current schemas into history.past before a mutation
function snapshotHistory(state: EditorState) {
    const snapshot: SchemasSnapshot = JSON.parse(JSON.stringify(state.schemas));
    state.history.past.push(snapshot);
    if (state.history.past.length > HISTORY_LIMIT) {
        state.history.past.shift();
    }
    // Any new mutation clears the redo future
    state.history.future = [];
}

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
    if (modifyNodeInTree(schemas.announcement, id, modifyFn)) return;
    if (modifyNodeInTree(schemas.navbar, id, modifyFn)) return;
    if (modifyNodeInTree(schemas.footer, id, modifyFn)) return;
    if (modifyNodeInTree(schemas.whatsAppButton, id, modifyFn)) return;
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
            // setSchemas is a bulk load (e.g., on page load) — reset history
            state.schemas = { ...state.schemas, ...action.payload };
            state.history.past = [];
            state.history.future = [];
        },
        undo: (state) => {
            if (state.history.past.length === 0) return;
            const previous = state.history.past.pop()!;
            state.history.future.unshift(JSON.parse(JSON.stringify(state.schemas)));
            state.schemas = previous;
        },
        redo: (state) => {
            if (state.history.future.length === 0) return;
            const next = state.history.future.shift()!;
            state.history.past.push(JSON.parse(JSON.stringify(state.schemas)));
            state.schemas = next;
        },
        // Takes a snapshot of current schemas without any mutation.
        // Used to checkpoint before a debounced text burst begins.
        snapshotSchemas: (state) => {
            snapshotHistory(state);
        },
        // Updates settings without creating a history snapshot.
        // Used for live canvas preview during debounced text input.
        updateNodeSettingsLive: (
            state,
            action: PayloadAction<{ id: string; settings: Record<string, any> }>
        ) => {
            mutateGlobalSchemas(state.schemas, action.payload.id, (node) => {
                node.settings = { ...action.payload.settings };
            });
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

            if (findInSection(state.schemas.announcement)) {
                state.activeSection = "header";
            } else if (findInSection(state.schemas.navbar)) {
                state.activeSection = "header";
            } else if (findInSection(state.schemas.footer)) {
                state.activeSection = "footer";
            } else if (findInSection(state.schemas.whatsAppButton)) {
                state.activeSection = "global";
            } else if (findInSection(state.schemas.main)) {
                state.activeSection = "main";
            }
        },
        hoverNode: (state, action: PayloadAction<string | null>) => {
            state.hoveredNodeId = action.payload;
        },
        updateNodeSettings: (
            state,
            action: PayloadAction<{ id: string; settings: Record<string, any> }>
        ) => {
            snapshotHistory(state);
            mutateGlobalSchemas(state.schemas, action.payload.id, (node) => {
                node.settings = { ...action.payload.settings };
            });
        },
        updateNodeAction: (
            state,
            action: PayloadAction<{ id: string; action: any | null }>
        ) => {
            snapshotHistory(state);
            mutateGlobalSchemas(state.schemas, action.payload.id, (node) => {
                if (action.payload.action === null) {
                    delete node.action;
                } else {
                    node.action = action.payload.action;
                }
            });
        },
        updateNodeLabel: (
            state,
            action: PayloadAction<{ id: string; label: string | null }>
        ) => {
            snapshotHistory(state);
            mutateGlobalSchemas(state.schemas, action.payload.id, (node) => {
                node.label = action.payload.label;
            });
        },
        deleteNode: (state, action: PayloadAction<{ id: string }>) => {
            snapshotHistory(state);
            const id = action.payload.id;
            if (state.selectedNodeId === id) {
                state.selectedNodeId = null;
            }

            if (removeNodeFromTree(state.schemas.announcement, id)) return;
            if (removeNodeFromTree(state.schemas.navbar, id)) return;
            if (removeNodeFromTree(state.schemas.footer, id)) return;
            if (removeNodeFromTree(state.schemas.whatsAppButton, id)) return;
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
            snapshotHistory(state);
            const { parentId, section, node } = action.payload;

            if (parentId) {
                if (parentId === "announcement") {
                    state.schemas.announcement.push(node);
                    return;
                }
                if (parentId === "navbar") {
                    state.schemas.navbar.push(node);
                    return;
                }
                if (parentId === "footer") {
                    state.schemas.footer.push(node);
                    return;
                }
                if (parentId === "whatsAppButton") {
                    state.schemas.whatsAppButton.push(node);
                    return;
                }

                if (addChildToNodeInTree(state.schemas.announcement, parentId, node)) return;
                if (addChildToNodeInTree(state.schemas.navbar, parentId, node)) return;
                if (addChildToNodeInTree(state.schemas.footer, parentId, node)) return;
                if (addChildToNodeInTree(state.schemas.whatsAppButton, parentId, node)) return;
                addChildToNodeInTree(state.schemas.main, parentId, node);
            } else {
                if (section === "main") {
                    state.schemas.main.push(node);
                } else if (section === "header") {
                    state.schemas.navbar.push(node);
                } else if (section === "footer") {
                    state.schemas.footer.push(node);
                } else if (section === "global") {
                    state.schemas.whatsAppButton.push(node);
                }
            }
        },
        moveNode: (
            state,
            action: PayloadAction<{ id: string; direction: "up" | "down" }>
        ) => {
            snapshotHistory(state);
            const { id, direction } = action.payload;
            const searchRoots = [
                ...state.schemas.announcement,
                ...state.schemas.navbar,
                ...state.schemas.footer,
                ...state.schemas.whatsAppButton,
                ...state.schemas.main,
            ];

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
        duplicateNode: (state, action: PayloadAction<{ id: string }>) => {
            snapshotHistory(state);
            const id = action.payload.id;
            
            // Helper function to deep clone node with new IDs
            const cloneNodeWithNewIds = (node: ComponentSchema): ComponentSchema => {
                const newId = `${node.type}_${Math.random().toString(36).substr(2, 6)}`;
                return {
                    ...node,
                    id: newId,
                    children: node.children ? node.children.map(cloneNodeWithNewIds) : undefined,
                    settings: node.settings ? JSON.parse(JSON.stringify(node.settings)) : undefined,
                };
            };

            const searchAndDuplicate = (roots: ComponentSchema[]): boolean => {
                const result = findParentAndSiblings(roots, id);
                if (result) {
                    const { siblings, index } = result;
                    const cloned = cloneNodeWithNewIds(siblings[index]);
                    siblings.splice(index + 1, 0, cloned);
                    return true;
                }
                return false;
            };

            if (searchAndDuplicate(state.schemas.announcement)) return;
            if (searchAndDuplicate(state.schemas.navbar)) return;
            if (searchAndDuplicate(state.schemas.footer)) return;
            if (searchAndDuplicate(state.schemas.whatsAppButton)) return;
            searchAndDuplicate(state.schemas.main);
        },
        moveNodeToTarget: (
            state,
            action: PayloadAction<{ dragId: string; dropId: string; position: "before" | "after" | "inside" }>
        ) => {
            snapshotHistory(state);
            const { dragId, dropId, position } = action.payload;
            if (dragId === dropId) return;

            // 1. Find the dragged node and remove it from its current position
            let draggedNode: ComponentSchema | null = null;
            
            const removeNode = (nodes: ComponentSchema[]): boolean => {
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].id === dragId) {
                        draggedNode = nodes[i];
                        nodes.splice(i, 1);
                        return true;
                    }
                    if (nodes[i].children && nodes[i].children!.length > 0) {
                        if (removeNode(nodes[i].children!)) return true;
                    }
                }
                return false;
            };

            removeNode(state.schemas.announcement);
            removeNode(state.schemas.navbar);
            removeNode(state.schemas.footer);
            removeNode(state.schemas.whatsAppButton);
            removeNode(state.schemas.main);

            if (!draggedNode) return;

            // 2. Insert the draggedNode into the new position relative to dropId
            const insertNode = (nodes: ComponentSchema[]): boolean => {
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].id === dropId) {
                        if (position === "before") {
                            nodes.splice(i, 0, draggedNode!);
                        } else if (position === "after") {
                            nodes.splice(i + 1, 0, draggedNode!);
                        } else if (position === "inside") {
                            if (!nodes[i].children) nodes[i].children = [];
                            nodes[i].children!.push(draggedNode!);
                        }
                        return true;
                    }
                    if (nodes[i].children && nodes[i].children!.length > 0) {
                        if (insertNode(nodes[i].children!)) return true;
                    }
                }
                return false;
            };

            if (insertNode(state.schemas.announcement)) return;
            if (insertNode(state.schemas.navbar)) return;
            if (insertNode(state.schemas.footer)) return;
            if (insertNode(state.schemas.whatsAppButton)) return;
            insertNode(state.schemas.main);
        },
        moveNodeToSlot: (
            state,
            action: PayloadAction<{ dragId: string; parentId: string; slotId: string }>
        ) => {
            snapshotHistory(state);
            const { dragId, parentId, slotId } = action.payload;

            // 1. Remove dragged node
            let draggedNode: ComponentSchema | null = null;
            const removeNode = (nodes: ComponentSchema[]): boolean => {
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].id === dragId) {
                        draggedNode = nodes[i];
                        nodes.splice(i, 1);
                        return true;
                    }
                    if (nodes[i].children && nodes[i].children!.length > 0) {
                        if (removeNode(nodes[i].children!)) return true;
                    }
                }
                return false;
            };
            removeNode(state.schemas.announcement);
            removeNode(state.schemas.navbar);
            removeNode(state.schemas.footer);
            removeNode(state.schemas.whatsAppButton);
            removeNode(state.schemas.main);

            if (!draggedNode) return;

            // 2. Update slot setting
            if (!draggedNode.settings) draggedNode.settings = {};
            if (slotId === "center") {
                delete draggedNode.settings.slot;
            } else {
                draggedNode.settings.slot = slotId;
            }

            // 3. Add to parent's children
            const addToParent = (nodes: ComponentSchema[]): boolean => {
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].id === parentId) {
                        if (!nodes[i].children) nodes[i].children = [];
                        nodes[i].children!.push(draggedNode!);
                        return true;
                    }
                    if (nodes[i].children && nodes[i].children!.length > 0) {
                        if (addToParent(nodes[i].children!)) return true;
                    }
                }
                return false;
            };

            if (addToParent(state.schemas.announcement)) return;
            if (addToParent(state.schemas.navbar)) return;
            if (addToParent(state.schemas.footer)) return;
            if (addToParent(state.schemas.whatsAppButton)) return;
            addToParent(state.schemas.main);
        },
        moveNodeToSectionRoot: (
            state,
            action: PayloadAction<{ dragId: string; section: "announcement" | "navbar" | "footer" | "main" }>
        ) => {
            snapshotHistory(state);
            const { dragId, section } = action.payload;

            // 1. Remove dragged node
            let draggedNode: ComponentSchema | null = null;
            const removeNode = (nodes: ComponentSchema[]): boolean => {
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].id === dragId) {
                        draggedNode = nodes[i];
                        nodes.splice(i, 1);
                        return true;
                    }
                    if (nodes[i].children && nodes[i].children!.length > 0) {
                        if (removeNode(nodes[i].children!)) return true;
                    }
                }
                return false;
            };
            removeNode(state.schemas.announcement);
            removeNode(state.schemas.navbar);
            removeNode(state.schemas.footer);
            removeNode(state.schemas.whatsAppButton);
            removeNode(state.schemas.main);

            if (!draggedNode) return;

            // Clear any slot settings
            if (draggedNode.settings) {
                delete draggedNode.settings.slot;
            }

            // 2. Add to section root
            state.schemas[section].push(draggedNode);
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
        setTenantInfo: (
            state,
            action: PayloadAction<EditorState["tenantInfo"]>
        ) => {
            state.tenantInfo = action.payload;
        },
    },
});

export const {
    setSchemas,
    undo,
    redo,
    snapshotSchemas,
    updateNodeSettingsLive,
    selectNode,
    hoverNode,
    updateNodeSettings,
    updateNodeAction,
    updateNodeLabel,
    deleteNode,
    addNode,
    moveNode,
    duplicateNode,
    moveNodeToTarget,
    moveNodeToSlot,
    moveNodeToSectionRoot,
    setTheme,
    setStatus,
    setError,
    setTenantInfo,
} = editorSlice.actions;

export default editorSlice.reducer;
