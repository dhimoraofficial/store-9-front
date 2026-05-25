import { ReactNode } from 'react'

export default function layout({ children }: {
    children: ReactNode
}) {
    return <html>
        <head></head>
        <body>
            {children}
        </body>
    </html>
}
