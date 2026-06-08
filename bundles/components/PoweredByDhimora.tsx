import { X } from "lucide-react";
import Link from "next/link";

export default function PoweredByDhimora({ dhimoraIcon, clientHref, clientIcon, dhimoraHref }: {
    dhimoraIcon?: string
    clientIcon?: string
    dhimoraHref?: string
    clientHref?: string
}) {
    return <>
        <div className="_powered_by_dhimora_ fcc bg-[#fff] opacity-30 p-1 rounded-sm mt-1">
            <Link target='_blank' href={clientHref || "#"}>
                <img src={clientIcon || "/icon.png"} alt="Visit dhimora.com" className='w-[25px] mr-2' />
            </Link>
            <X className='col' size={15} />
            <Link href={dhimoraHref || "#"} target='_blank' rel='no-follow'>
                <img src={dhimoraIcon || "/app-banner.png"} alt="Visit dhimora.com" className='w-[70px]' />
            </Link>
        </div>
    </>
}
