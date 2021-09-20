import { Middleware } from 'koa'

export const inertia = (viewName: string, version = '1'): Middleware => {
    return async (ctx, next) => {
        if (ctx.method === 'GET' && ctx.headers['x-inertia'] && ctx.headers['x-inertia-version'] !== version) {
            ctx.set('X-Inertia-Location', ctx.url)
            ctx.status = 409
            ctx.body = ''
            return
        }

        const sharedValues: { [k: string]: any } = {}
        let viewData: any = {}

        ctx.inertia = {
            render: async (component, props = {}) => {
                const pageData = {
                    component,
                    props: {
                        ...sharedValues,
                        ...props,
                    },
                    version,
                    url: ctx.originalUrl || ctx.url,
                }

                if (ctx.headers['x-inertia']) {
                    ctx.body = pageData
                    return
                }

                await ctx.render(viewName, {
                    ...viewData,
                    pageData: JSON.stringify(pageData),
                })
            },
            share: (key, value) => {
                sharedValues[key] = value
            },
            setViewData: (data: any) => {
                viewData = data
            },
            location: (url: string) => {
                ctx.set('X-Inertia-Location', url)
                ctx.status = 409
                ctx.body = ''
            },
        }
        await next()
    }
}
