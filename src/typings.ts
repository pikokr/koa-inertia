export interface Inertia {
    render(component: string, props?: any): Promise<void>
    share(key: string, value: any): void
    setViewData(data: any): void
    location(url: string): void
}

declare module 'koa' {
    interface BaseContext {
        inertia: Inertia
    }
}
