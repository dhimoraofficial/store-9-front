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
    className?: string;
    style?: React.CSSProperties;
    dataTestId?: string;
}

export type ActionObject = {
    label: string;
    action: string;
};
