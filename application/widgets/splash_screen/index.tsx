"use client";

import { Spinner } from "../loader";

export default function SplashScreen({ __full_screen_splash = true, __data_loading_effect = false, __loading_message = "Loading...", __loading = true }) {
    return <>
        <div className={`__drk_splash fixed ${(__full_screen_splash && !__data_loading_effect) ? "bg" : "bg-[#ffffff59] backdrop-blur-[3px]"} z-50 w-full h-full top-0 right-0`}>
            <div className="pt-[8vh] pb-8 h-full w-full fc justify-between flex-col">
                <img src="/application.gif" alt="Application ICON" className="rounded-lg p-3 w-[70%] mx-auto max-w-[230px] bg" />
                {__loading && <div className="fcb">
                    <Spinner height={"20px"} />
                    {__loading_message && <p className="ml-3">{__loading_message}</p>}
                </div>}
            </div>
        </div>
    </>
};