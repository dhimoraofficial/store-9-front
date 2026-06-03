import "./globals.css";

export function NoSuchStore({ type, host }: {
    type: "DOMAIN_NOT_REGISTERED" | "STORE_NOT_FOUND" | string,
    host: string
}) {
    const getContent = () => {
        if (type === "DOMAIN_NOT_REGISTERED") {
            return {
                code: "424",
                title: "Domain Not Connected",
                cause: "Store exists but domain is not configured",
                description: "The store has been created, but this domain hasn’t been connected yet. Access will be available once the domain is properly linked by the store owner."
            };
        }

        if (type === "PAGE_NOT_SETUP") {
            return {
                code: "404",
                title: "Page Not Setup",
                cause: "No pages have been published yet",
                description: "This store has been successfully created, but no pages or layouts have been published. If you are the store owner, please visit the admin editor to design and save your homepage."
            };
        }

        return {
            code: "404",
            title: "Store Not Found",
            cause: "No store is connected to this domain",
            description: "We couldn’t find a store associated with this domain. It may not exist or hasn’t been configured for public access yet."
        };
    };

    const content = getContent();

    return <>
        <html>
            <head>
                <title>{content.title} - dhimora</title>
            </head>
            <body>
                <div className="flex flex-col items-center justify-center px-6 py-12">
                    <div className="max-w-[600px] w-full">
                        <div className="rounded-md p-4 mt-10 bg-surface shadow-sm border">
                            <div className="space-y-2">
                                <div className="flex item-centreitems-baseline gap-2">
                                    <h1 className="font-bold text-gray-900 text-md">{content.code}</h1>
                                    :
                                    <p className="text-gray-800 font-medium">{content.title.toUpperCase()}</p>
                                </div>

                                <div className="space-y-4 pt-2">
                                    <div className="bg border-l-4 border-gray-900 p-4 rounded-md-r">
                                        <div className="text-xs text-gray-900 font-semibold flex item-centregap-2.5">
                                            <p>{content.cause}</p>
                                            <code className="text-xs">({host})</code>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 leading-relaxed">{content.description}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t flex item-centre justify-center">
                                <img src="/powered-by-dhimora.png" alt="dhimora softwares pvt ltd" className="h-8 opacity-80" />
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    </>
}

export function ServiceUnavailable() {
    return (
        <html>
            <head>
                <title>Service Unavailable - dhimora</title>
            </head>
            <body>
                <div className="flex flex-col items-center justify-center px-6 py-12">
                    <div className="max-w-[600px] w-full">
                        <div className="rounded-md mt-10 p-8 bg-surface shadow-sm border">
                            <div className="space-y-5">
                                <div className="flex item-centreitems-baseline gap-2">
                                    <h1 className="font-bold text-gray-900 text-sm">503</h1>
                                    <p className="text-gray-800 text-sm font-medium">: SERVICE UNAVAILABLE</p>
                                </div>

                                <div className="space-y-4 pt-2">
                                    <div className="bg border-l-4 border-gray-900 p-4 rounded-md-r">
                                        <div className="text-xs text-gray-900 font-semibold flex item-centregap-2.5">
                                            <p>Unable to establish user session</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            We're unable to verify your authentication session. This could be due to a temporary service
                                            interruption or network connectivity issue. Please try refreshing the page or logging in again.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}



