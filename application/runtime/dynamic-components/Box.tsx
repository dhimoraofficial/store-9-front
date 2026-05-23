import { ReactNode } from 'react';
import { BaseProps } from './type';

export interface BoxProps extends BaseProps {
    children?: ReactNode;
}

export default function ABox({
    children,
    id,
    style,
    padding,
}: any) {

    return (
        <div id={id} style={style}>
            {children}
        </div>
    );
}