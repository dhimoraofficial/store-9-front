import { CSSProperties } from "react"

export type ContainerBaseType = {
    children: React.ReactNode
    className?: string
    style?: CSSProperties

}

function Wrapper({ children, className, style }: ContainerBaseType) {
    return <div className={`__container w-[95%] mx-auto px-4${className ? (" " + className) : ""}`} style={style || {}}>
        {children}
    </div>
}

function W1000({ children, className, style }: ContainerBaseType) {
    return <Wrapper children={children} className={`max-w-[1000px] ${className || ""}`} style={style} />
}

function W1200({ children, className, style }: ContainerBaseType) {
    return <Wrapper children={children} className={`max-w-[1200px] ${className || ""}`} style={style} />
};

function W1400({ children, className, style }: ContainerBaseType) {
    return <Wrapper children={children} className={`max-w-[1400px] ${className || ""}`} style={style} />
};

const Container = {
    W1000,
    W1200,
    W1400
}

export default Container;