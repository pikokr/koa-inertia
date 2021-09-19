import Koa from 'koa'
import views from 'koa-views'
import { inertia } from '../src'
import Router from 'koa-router'

const app = new Koa()

app.use(
    views(__dirname + '/views', {
        extension: 'pug',
    }),
)

app.use(inertia('app'))

const router = new Router()

router.get('/', async (ctx) => {
    await ctx.inertia.render('Index', { test: 1234 })
})

app.use(router.routes())

app.use(router.allowedMethods())

app.listen(5000, () => console.log('listening.'))
