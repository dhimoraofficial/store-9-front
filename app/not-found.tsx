import ComponentBuilder from "@/application/runtime/builder/ComponentBuilder";
import { NotFound } from "@/application/runtime/globals/NotFound";

export default function ApplicationRootNotFound() {
    return <html>
        <head>
            <title>Not Found</title>
        </head>
        <body className="min-h-screen px-4 py-20">
            <div className="mx-auto flex w-full max-w-3xl items-center justify-center">
                <ComponentBuilder schema={NotFound} />
            </div>
        </body>
    </html>
}