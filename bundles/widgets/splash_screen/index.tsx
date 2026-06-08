import { Spinner } from "../loader";

export default function SplashScreen({ __full_screen_splash = true, __data_loading_effect = false, __loading_message = "Loading...", __loading = true }) {
    return <>
        <div style={{ background: "white" }} className={`__splash__ fixed bg-background ${(__full_screen_splash && !__data_loading_effect) ? "" : "backdrop-blur-[3px]"} z-50 w-full h-full top-0 right-0`}>
            <div className="pt-[8vh] pb-8 h-full w-full flex items-center justify-between flex-col">
                <img src="/icon.png" alt="Application ICON" style={{border: "1px solid #0000000a", borderRadius: "10px"}} className="border rounded-lg p-3 w-[70%] mx-auto max-w-[230px] bg" />
                {__loading && <div className="flex items-center justify-center">
                    <Spinner height={"20px"} />
                    {__loading_message && <p className="ml-3">{__loading_message}</p>}
                </div>}
            </div>
        </div>
    </>
};