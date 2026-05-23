export type BaseTypes =
    | "button"
    | "box"
    | "icon"
    | "text"
    | "image"
    | "input"
    | "link"
    | "search_query"

export interface BaseProps {
    id?: string;
    style?: React.CSSProperties;
}

export type ActionObject = {
    label: string;
    action: string;
};
