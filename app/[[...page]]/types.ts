export type ApplicationIndexParams = {
    params: Promise<{
        page: string[]
    }>
    searchParams: Promise<Record<string, string>>
}