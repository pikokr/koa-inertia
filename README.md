# Koa-Inertia

Unofficial server-side adapter for [inertia.js](https://inertiajs.com)

## Install

```shell
yarn add @pikokr/koa-inertia
```

## Usage(Typescript)

views/app.pug
```pug
doctype html

html(lang='ko')
    head
        title MyApp
        script(type='text/javascript' src='/dist/js/app.js')
    body
        #root(data-page=pageData)
```

### Render

```ts
import {inertia} from '@pikokr/koa-inertia'
import views from "koa-views";

// ...

app.use(
    views(__dirname + '/views', {
        extension: 'pug',
    }),
)

app.use(inertia('app', '1' /* asset version */))

const router = new Router()

// ...

router.get('/', async ctx => {
    await ctx.inertia.render('Index', {test: 1234})
})
```

### Shared data

```ts
app.use((ctx, next) => {
    ctx.inertia.share('share', 12345)
    return next()
})
```

### Redirect

```ts
ctx.inertia.location('https://google.com')
```
