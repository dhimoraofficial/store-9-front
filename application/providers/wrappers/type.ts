type AuthState = {
    user_exist?: boolean
    access_token?: string
    first_name?: string
    name?: string
    image?: string
    email?: string
    phone_number?: string
    role?: string
    id?: string
}

type AppState = {
    tenant: string
    store: string
}

type ToastPayload = {
    title?: string
    message?: string
    // type?: string
    icon?: string
    duration?: number
    onClick?: () => void
    onClose?: () => void
}

type ToastItem = Required<Omit<ToastPayload, "onClick" | "onClose">> & {
    id: number
    onClick: () => void
    onClose: () => void
}

type ApplicationContextValue = {
    auth: AuthState
    app: AppState
    data: Record<string, unknown>
    setData: (data: Record<string, unknown>, path?: string) => void
    setAuth: (data: AuthState, path?: string) => void
    createToast: (payload: ToastPayload) => void
}