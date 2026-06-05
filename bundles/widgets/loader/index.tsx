export function Spinner({ color, height }: {
    color?: string,
    height?: string | number,
}) {
    return <svg className="animate-spin" style={{
        height: height || "90%",
    }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke={color || "currentColor"} strokeWidth="2" strokeDasharray="15" strokeLinecap="round" fill="none" />
    </svg>
}

export function DotSpinner({ height }: {
    height?: string | number
}) {
    return <div className="__dot_loader bg" style={{ height: `${height || "90px"}` }}>
        <style>{`.loader {
  width: 60px;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side,#000 90%,#0000);
  background: 
    var(--_g) 0%   50%,
    var(--_g) 50%  50%,
    var(--_g) 100% 50%;
  background-size: calc(100%/3) 50%;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
    20%{background-position:0%   0%, 50%  50%,100%  50%}
    40%{background-position:0% 100%, 50%   0%,100%  50%}
    60%{background-position:0%  50%, 50% 100%,100%   0%}
    80%{background-position:0%  50%, 50%  50%,100% 100%}
}`}</style>
    </div>
}

export default function Loader({ color, height, loading, className }: {
    color?: string,
    height?: string | number,
    loading?: boolean,
    className?: string | undefined,
}) {
    return <div className={`absolute bg-inherit text-inherit top-0 gap-2 right-0 h-full w-full fcc p-1 cursor-wait rounded-md ${className || ""}`}>
        <Spinner color={color} height={height} />

        {loading}
    </div>
};