import { RxCross2 } from "react-icons/rx";

export function ModelCloser({ onClose, className, corner = 2 }: {
    onClose?: Function,
    className?: string,
    corner?: number,
}) {
    return <div className={`bg w-fit rounded-lg cursor-pointer absolute ${className || ""}`} style={{
        top: corner * 4,
        right: corner * 4,
    }}>
        <RxCross2 size={25} onClick={() => (typeof onClose === "function" ? onClose() : null)} />
    </div>
};