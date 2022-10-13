# 前言

现在微前端的架构十分流行，为了跟上前端高速发展的步伐，通过本篇文章初探一下微前端架构到底是怎么一回事，以及为什么要使用这种架构模式

# 微前端是什么？

首先通过[micro-frontends.org](https://micro-frontends.org/)这个网站能够了解到一些关于微前端概念的起源，让我们更好地了解微前端的意义

> The idea behind Micro Frontends is to think about a website or web app as **a composition of features** which are owned by **independent teams**.
>
> Each team has a **distinct area of business** or **mission** it cares about and specialises in.
>
> A team is **cross functional** and develops its features **end-to-end**, from database to user interface.
>
> 微前端背后的思想是认为：现代复杂的 web app 或者网站，通常由很多  **相对独立的功能模块组合而成**，而对这些模块负责的应该是  **相互独立的多个团队**。
>
> 这些独立的团队由于专业分工不同，会负责着  **特定的业务领域**，以及完成  **特定的开发任务**。
>
> 这样的团队，通常在人员组成方面囊括了从前端开发到服务端开发，从 UI 实现到数据库设计这样  **端到端**  的  **跨职能人员**  构成。

通过该网站中对微前端概念的解释，我们可以了解到，微前端是后端中微服务的思想在前端领域的应用，它强调的是将一个项目拆分成多个`相对独立`的功能模块，并且每个模块也有着`相互独立`的团队去负责

可以看到，十分强调模块化与团队之间的独立性，每个团队只负责专攻自己擅长的部分，将自己负责的模块功能做到最好，最后将各个模块整合在一起变成最终的产品交付出去，这是微前端的基本概念

微前端概念的提出，将微服务这个被广泛应用于后端的技术范式扩展到了前端领域

# 微前端架构背后的核心思想

网站中总结了几点微前端架构背后的核心思想，分别为

1. `Be Technology Agnostic` -- 团队之间屏蔽技术细节，各团队使用各自擅长的技术栈，无需与其他团队的技术栈保持一致
2. `Isolate Team Code` -- 各模块之间不应当使用同一个运行时，不要依赖共享的状态和全局变量
3. `Establish Team Prefixes` -- 各团队要有自己的命名空间，比如 css、自定义事件、localStorage 和 cookie 等有可能涉及到冲突的部分都需要在命名上加上团队自己的命名空间避免冲突
4. `Favor Native Browser Features over Custom APIs` -- 尽量使用浏览器原生的 api
5. `Build a Resilient Site` -- 让网站尽可能保持高可用，也就是说在`js`出现异常的时候也应当尽可能保证网站功能的正常运行，以及使用同构渲染和渐进增强来提高性能和用户体验

以上这五点就是微前端的核心思想，可以看出来都是在围绕其基本概念去实施的，都是旨在保证各模块之间的独立性

下面我们会通过一个简单的案例来体验一下微前端的架构思想，看看和传统的开发思路有何不同

# 简易掘金商城案例 -- 传统方案

首先我们用传统的开发思路去实现一个简易的掘金商城，先看看它的最终效果：

![掘金商城演示.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/998347d57a134480ade59faeceb608fe~tplv-k3u1fbpfcp-watermark.image?)

并且还做了深浅模式的识别，上面的是深色模式下的显式效果，再看看浅色模式下的效果:

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ebacfd44048497eb686704d2870db71~tplv-k3u1fbpfcp-watermark.image?)

还做了响应式布局，可以在移动端浏览:

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ccda28e373ea439ea15fd68f8be0b431~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/479ccdb318854a50a5cadd72ca482c73~tplv-k3u1fbpfcp-watermark.image?)

它的功能包括:

1. 切换商品时，商品详情和关联商品也会相应切换
2. 切换商品时，购买商品按钮的价格也会相应切换
3. 购买商品时，会将商品加入到购物车中，购物车数量状态会改变

就实现这么三个简单的功能，通过这个简单的案例来感受下传统开发思路和微前端架构的差异

## 目录结构

先看看用传统的原生开发的方式实现这样的一个简单案例的目录结构:

```plain
.
├── apps                                                  // 存放所有应用
│   └── juejin-store                                      // 掘金商城应用
│       ├── event-listeners.ts
│       ├── images                                        // 图片资源
│       │   ├── juejin-bytedance-coffee-vaccum-cup.png
│       │   ├── juejin-canvas-bag.jpg
│       │   ├── juejin-coffee-cup.jpg
│       │   ├── juejin-dupont-bag-1.jpg
│       │   ├── juejin-dupont-bag-2.jpg
│       │   ├── juejin-mug.jpg
│       │   ├── juejin-phone-holder-boss-talk.jpg
│       │   ├── juejin-phone-holder-bug-clearing.jpg
│       │   ├── juejin-phone-holder-get-off-work.jpg
│       │   ├── juejin-phone-holder-happy-working.jpg
│       │   ├── juejin-vaccum-cup.jpg
│       │   ├── juejin-woven-bag.jpg
│       │   └── no-data.png
│       ├── index.ts                                      // 掘金商城应用入口
│       ├── model.ts                                      // 用到的数据模型和相关查询函数
│       ├── renderer.ts                                   // 渲染器实现核心渲染逻辑
│       ├── styles                                        // 掘金商城样式
│       │   ├── index.ts                                  // 统一导入样式文件
│       │   └── main.scss                                 // 主样式入口
│       ├── types                                         // 类型声明文件目录
│       │   ├── app.d.ts                                  // 应用相关的类型声明
│       │   ├── product.d.ts                              // 商品相关的类型声明
│       │   └── renderer.d.ts                             // 渲染器相关的类型声明
│       └── utils                                         // 工具函数
│           └── index.ts
├── main.ts                                               // vite 项目入口
├── style                                                 // 项目整体的样式
│   ├── index.ts
│   ├── main.scss
│   ├── variables-dark.scss                               // 深色模式下的 scss 变量
│   └── variables-light.scss                              // 浅色模式下的 scss 变量
└── vite-env.d.ts
```

这个目录结构将掘金商城这个应用放到了单独的目录中管理，将每个系统视为一个`app`(虽然只有一个 app)，项目需要使用哪个`app`就直接调用`app`提供的`setup`函数即可(后面代码讲解可以看到)

## 入口代码分析

### setupApp

首先我们来看看整个`vite`项目的入口`src/main.ts`

```ts
import setupJuejinStore from './apps/juejin-store'
import './style'

const $app = document.querySelector<HTMLDivElement>('#app')!

const setupApp = ($app: App) => {
  setupJuejinStore($app)
}

setupApp($app)
```

我的设计理念是每个应用都提供自己的`setup`函数，即便是项目主入口也不例外，在项目主入口中我们有一个`setupApp`的函数，将容器元素传入后就能够将应用挂载到这个容器元素中，完成渲染

可以看到`setupApp`里面调用了`setupJuejinStore`，那么我们来看看`setupJuejinStore`要做哪些事情吧

### setupJuejinStore

`src/apps/juejin-store/index.ts`

```ts
import createRenderer from './renderer'
import './styles'

function setupJuejinStore($app: App) {
  const { run } = createRenderer($app)

  run()
}

export default setupJuejinStore
```

可以看到，核心就在于`createRenderer`，调用后拿到它的`run`方法即可启动我们的掘金商城应用，所以每个应用的核心就在于它的渲染器的实现

所以接下来我们的重心就放在渲染器的部分

## 渲染器实现

渲染器的核心就在于渲染函数`render`的实现，我们在`render`函数中将应用的`html`框架写入到容器元素`$app`中

首先我们的渲染逻辑会涉及到两个状态，一个是当前展示的商品的`id`，一个是购物车中商品的数量

```ts
interface IState {
  // 当前展示的商品 id
  productId: number
  // 购物车中商品数量
  basketCount: number
}

const state: IState = {
  productId: 1,
  basketCount: 0,
}
```

然后就是渲染函数的实现

```ts
function render() {
  // 获取当前展示的商品
  const product = getProductById(state.productId)

  $app.innerHTML = `
    <section class="juejin-store">
      <!-- 标题 -->
      <h1 class="title">掘金商城</h1>

      <!-- 购物车 -->
      <section class="basket">购物车：${state.basketCount} 件</section>

      <!-- 商品图片预览 -->
      <section class="previewer">
        <img src="${loadImage(product?.cover ?? 'no-data.png')}" alt="${
    product?.name ?? '未知商品'
  }" />
      </section>

      <!-- 商品名 -->
      <h3 class="product-name">${product?.name ?? '未知商品'}</h3>

      <!-- 商品列表 -->
      <section class="product-list">${renderProductList()}</section>

      <!-- 购买按钮 -->
      <button class="purchase-btn">购买: ${product?.price ?? 66666} ￥</button>

      <!-- 关联商品 -->
      <section class="related-products">
        <h3>关联商品</h3>

        <!-- 关联商品列表 -->
        <section class="related-product-list">${
          product && renderRelatedProductList(product)
        }</section>
      </section>
    </section>
    `
}
```

我们使用`ES6`的模板字符串特性能够很好的让我们在`html`中插入数据

而商品列表和关联商品列表这种需要循环渲染数据的场景，我们最好是将它们的逻辑抽离到单独的渲染函数中去完成

## 渲染商品列表和关联商品列表

`renderProductList`的实现如下

```ts
/**
 * @description 渲染商品列表
 * @param displayProductList 展示在商品列表中的商品
 */
function renderProductList(): string {
  const displayProductList = getDisplayProductList()
  const renderProductItem = (product: IProduct): string => {
    const active = product.id === state.productId
    return `
        <div class="product-list-item ${active ? 'active' : ''}" >
          <img src="${loadImage(product.cover)}" alt="${
      product.name
    }" data-product-id="${product.id}" />
        </div>
      `
  }

  return displayProductList.map(renderProductItem).join('')
}
```

`renderRelatedProductList`的实现如下:

```ts
/**
 * @description 渲染商品的关联商品
 * @param product 商品
 */
function renderRelatedProductList(product: IProduct): string {
  const renderRelatedProductItem = (relatedProduct: IProduct): string => {
    return `
        <div class="related-product-list-item">
          <img src="${loadImage(relatedProduct.cover)}" alt="${
      relatedProduct.name
    }" data-product-id="${relatedProduct.id}" />
        </div>
      `
  }

  return getRelatedProducts(product.id)
    .map(relatedProduct =>
      relatedProduct ? renderRelatedProductItem(relatedProduct) : '',
    )
    .join('')
}
```

并不复杂，就是将列表项的渲染逻辑抽离出来，一次性返回数组的渲染结果，这样在主渲染函数中阅读起来会更加清晰，提高代码可读性

## 工具函数

对于图片的渲染，需要先加载出它的`url`，再将其赋值到`<img>`的`src`属性上，所以我们要有一个工具函数来将图片资源加载成`url`，也就是上面的渲染函数中的`loadImage`，只要传入`src/apps/juejin-store/images`目录下的图片文件名即可获得它的`url`

```ts
/**
 * @description 加载 images/ 目录下的图片名为 url
 * @param imageName images/ 目录下的图片名
 */
function loadImage(imageName: string) {
  const imagePath = `../images/${imageName}`
  const url = new URL(imagePath, import.meta.url).href

  return url
}

export { loadImage }
```

## 商品数据模型以及相关查询函数

上面`render`函数中的数据都来自于`model.ts`中，这里为了方便，并没有接入后端，而是自己模拟了一些固定数据，`model.ts`的代码如下:

```ts
const products: IProduct[] = [
  // ============ 杯子品类 ============
  {
    id: 1,
    name: 'JUEJIN FRIENDS 「码赛克」码克杯',
    price: 69,
    cover: 'juejin-mug.jpg',
    displayInList: true,
    relatedProducts: [2, 3, 4],
  },
  {
    id: 2,
    name: '稀土掘金—Who Cares系列「我真的不困」咖啡杯',
    price: 119,
    cover: 'juejin-coffee-cup.jpg',
    displayInList: false,
    relatedProducts: [1, 3, 4],
  },
  {
    id: 3,
    name: '虎虎生金系列-保温杯',
    price: 129,
    cover: 'juejin-vaccum-cup.jpg',
    displayInList: false,
    relatedProducts: [1, 2, 4],
  },
  {
    id: 4,
    name: '字节咖啡保温杯',
    price: 129,
    cover: 'juejin-bytedance-coffee-vaccum-cup.png',
    displayInList: false,
    relatedProducts: [1, 2, 3],
  },

  // ============ 手机支架品类 ============
  {
    id: 5,
    name: '稀土掘金—Who Cares系列「挺你」手机支架/桌面状态栏 -- 开心打工中',
    price: 39.9,
    cover: 'juejin-phone-holder-happy-working.jpg',
    displayInList: true,
    relatedProducts: [6, 7, 8],
  },
  {
    id: 6,
    name: '稀土掘金—Who Cares系列「挺你」手机支架/桌面状态栏 -- Boss Talk',
    price: 39.9,
    cover: 'juejin-phone-holder-boss-talk.jpg',
    displayInList: false,
    relatedProducts: [5, 7, 8],
  },
  {
    id: 7,
    name: '稀土掘金—Who Cares系列「挺你」手机支架/桌面状态栏 -- Bug 清除中',
    price: 39.9,
    cover: 'juejin-phone-holder-bug-clearing.jpg',
    displayInList: false,
    relatedProducts: [5, 6, 8],
  },
  {
    id: 8,
    name: '稀土掘金—Who Cares系列「挺你」手机支架/桌面状态栏 -- 已下班勿 Cue',
    price: 39.9,
    cover: 'juejin-phone-holder-get-off-work.jpg',
    displayInList: false,
    relatedProducts: [5, 6, 7],
  },

  // ============ 包品类 ============
  {
    id: 9,
    name: '稀土掘金—Who Cares系列「丢掉包袱」杜邦特包',
    price: 119,
    cover: 'juejin-dupont-bag-1.jpg',
    displayInList: true,
    relatedProducts: [10, 11, 12],
  },
  {
    id: 10,
    name: '稀土掘金—Who Cares系列「丢掉包袱」杜邦特包',
    price: 119,
    cover: 'juejin-dupont-bag-2.jpg',
    displayInList: false,
    relatedProducts: [9, 11, 12],
  },
  {
    id: 11,
    name: '稀土掘金「睡眠日系列」编织袋',
    price: 69,
    cover: 'juejin-woven-bag.jpg',
    displayInList: false,
    relatedProducts: [9, 10, 12],
  },
  {
    id: 12,
    name: '稀土掘金-「解码系列」皮革帆布袋',
    price: 99,
    cover: 'juejin-canvas-bag.jpg',
    displayInList: false,
    relatedProducts: [9, 10, 11],
  },
]

/**
 * @description 根据商品 id 获取商品对象
 * @param id 商品 id
 * @returns IProduct
 */
const getProductById = (id: ProductId) => {
  return products.find(product => product.id === id)
}

/**
 * @description 获取商品的关联商品
 * @param id 商品 id
 */
const getRelatedProducts = (id: ProductId): (IProduct | undefined)[] => {
  const product = getProductById(id)

  if (product) {
    return product.relatedProducts.map(getProductById)
  }

  return []
}

/**
 * @description 获取展示在商品列表中的商品 -- 即 displayInList 属性为 true 的商品
 */
const getDisplayProductList = () => {
  return products.filter(product => product.displayInList)
}

export { products, getProductById, getRelatedProducts, getDisplayProductList }
```

## 事件处理

以上代码完成后仅仅是实现了`ui`部分，我们还有重要的事件逻辑要完成，为了方便维护，我将事件相关的逻辑抽离成单独的`event-listeners.ts`文件中去维护

回忆一下前面的需求分析，我们需要实现的事件逻辑一共有三个:

1. 点击商品列表的商品，会切换当前展示商品的`id`，也就是涉及到修改渲染器中的`state`
2. 点击关联商品列表中的商品，也会切换当前展示商品的`id`
3. 点击购买按钮，会增加渲染器`state`中购物车商品数量

通过以上分析，我们可以首先写出以下三个事件处理函数

```ts
/**
 * @description 点击商品列表项切换商品
 */
function handleChangeProduct(e: MouseEvent) {
  const productId = Number((e.target as HTMLImageElement).dataset.productId!)

  // 修改 state.productId 为触发事件的商品元素的 id
}

/**
 * @description 购买商品
 */
function handlePurchaseProduct() {
  // 修改 state.basketCount 让其 +1
}

/**
 * @description 点击关联商品时切换至关联商品的详情 -- 逻辑与商品列表中的商品切换一致
 */
const handleRelatedProductClick = handleChangeProduct
```

### 事件处理函数的问题

这里有两个问题:

1. 事件处理函数中需要修改渲染器中的`state`
2. `state`被修改后，视图应当更新，也就是要重新执行渲染函数

但是目前我们的事件处理函数中是无法和渲染器结合的，也就无法获取到渲染器的`state`以及`render`

那怎么办呢？我们可以将事件处理函数全都封装到一个`createEventListeners`函数中，并且让这个函数接收渲染器的`state`和`render`

```ts
interface Options {
  state: IState
  render: Function
}

function createEventListeners({ state, render }: Options) {
  /**
   * @description 点击商品列表项切换商品
   */
  function handleChangeProduct(e: MouseEvent) {
    const productId = Number((e.target as HTMLImageElement).dataset.productId!)

    state.productId = productId
    render()
  }

  /**
   * @description 购买商品
   */
  function handlePurchaseProduct() {
    state.basketCount++
    render()
  }

  /**
   * @description 点击关联商品时切换至关联商品的详情 -- 逻辑与商品列表中的商品切换一致
   */
  const handleRelatedProductClick = handleChangeProduct
}

export default createEventListeners
```

这样就将事件处理函数和渲染器关联起来了，接下来我们就要把事件处理函数绑定到相关元素上

### 绑定事件处理函数

```ts
function createEventListeners({ state, render }: Options) {
  function addEventListeners() {
    const $productList = document.querySelector<HTMLElement>('.product-list')!
    const $purchaseBtn =
      document.querySelector<HTMLButtonElement>('.purchase-btn')!
    const $relatedProductList = document.querySelector<HTMLElement>(
      '.related-product-list',
    )!

    $productList.addEventListener('click', handleChangeProduct)
    $purchaseBtn.addEventListener('click', handlePurchaseProduct)
    $relatedProductList.addEventListener('click', handleRelatedProductClick)
  }

  /**
   * @description 点击商品列表项切换商品
   */
  function handleChangeProduct(e: MouseEvent) {
    const productId = Number((e.target as HTMLImageElement).dataset.productId!)

    state.productId = productId
    render()
  }

  /**
   * @description 购买商品
   */
  function handlePurchaseProduct() {
    state.basketCount++
    render()
  }

  /**
   * @description 点击关联商品时切换至关联商品的详情 -- 逻辑与商品列表中的商品切换一致
   */
  const handleRelatedProductClick = handleChangeProduct
}
```

绑定是绑定上了，但是这里的`addEventListeners`没被调用啊，该在哪里被调用呢？

应当将其放到渲染器中的`run`方法中调用，所以我们要将`addEventListeners`函数暴露出去，从而能够在渲染器中通过调用`createEventListeners`后获取到

```ts
function createEventListeners({ state, render }: Options) {
  function addEventListeners() {
    // ...
  }

  // ...

  return {
    addEventListeners,
  }
}

export default createEventListeners
```

修改渲染器，调用`createEventListeners`获取到`addEventListeners`函数

```ts
function createRenderer($app: App) {
  const { addEventListeners } = createEventListeners({
    state,
    render,
  })

  function run() {
    render()
    addEventListeners()
  }

  return {
    run,
  }

}

export defalut createRenderer
```

### 进一步优化

在每一次重新渲染的时候，由于我们的渲染函数是直接修改`$app`容器元素的`innerHTML`的，这样简单粗暴的实现会导致已注册的事件处理函数失效，所以我们需要在每次重新渲染之前移除已注册的事件处理函数，并在渲染后再次注册事件处理函数

也就是说我们的渲染器还需要提供一个`rerender`方法，其内容如下

```ts
function rerender() {
  removeEventListeners()
  render()
  addEventListeners()
}
```

但是我们目前只能获取到`addEventListeners`，所以我们还需要实现`removeEventListeners`，它的逻辑和`addEventListeners`一样，只是变成了移除事件处理函数而已

```ts
function removeEventListeners() {
  const $productList = document.querySelector<HTMLElement>('.product-list')!
  const $purchaseBtn =
    document.querySelector<HTMLButtonElement>('.purchase-btn')!
  const $relatedProductList = document.querySelector<HTMLElement>(
    '.related-product-list',
  )!

  $productList.removeEventListener('click', handleChangeProduct)
  $purchaseBtn.removeEventListener('click', handlePurchaseProduct)
  $relatedProductList.removeEventListener('click', handleRelatedProductClick)
}
```

`addEventListeners`的代码和`removeEventListener`有大量重复，我们可以考虑重构一下

```ts
// 添加或者移除事件监听函数
function manageEventListeners(mode: 'add' | 'remove') {
  const $productList = document.querySelector<HTMLElement>('.product-list')!
  const $purchaseBtn =
    document.querySelector<HTMLButtonElement>('.purchase-btn')!
  const $relatedProductList = document.querySelector<HTMLElement>(
    '.related-product-list',
  )!

  const manage = mode === 'add' ? 'addEventListener' : 'removeEventListener'

  $productList[manage]('click', handleChangeProduct as any)
  $purchaseBtn[manage]('click', handlePurchaseProduct)
  $relatedProductList[manage]('click', handleRelatedProductClick as any)
}

function addEventListeners() {
  manageEventListeners('add')
}

function removeEventListeners() {
  manageEventListeners('remove')
}
```

### 让开发体验更像 react

为了让体验更像`react`，我们还可以将对`state`的修改变成`setState`，也就是在渲染器中提供一个`setState`方法

```ts
/**
 * @description 更新 state
 * @param cb 更新 state 的回调
 */
const setState: SetState = cb => {
  cb(state)
}
```

它的类型定义如下:

```ts
type SetStateCallback = (state: IState) => void
type SetState = (cb: SetStateCallback) => void
```

抽离这个类型定义是为了在`event-listeners.ts`的`Options`接口中声明，毕竟它们是在不同的文件中

```ts
interface Options {
  setState: SetState
  rerender: () => void
}
```

现在事件处理函数就变成了这样:

```ts
/**
 * @description 点击商品列表项切换商品
 */
function handleChangeProduct(e: MouseEvent) {
  const productId = Number((e.target as HTMLImageElement).dataset.productId!)

  setState(state => {
    state.productId = productId
  })

  rerender()
}

/**
 * @description 购买商品
 */
function handlePurchaseProduct() {
  setState(state => state.basketCount++)

  rerender()
}

/**
 * @description 点击关联商品时切换至关联商品的详情 -- 逻辑与商品列表中的商品切换一致
 */
const handleRelatedProductClick = handleChangeProduct
```

至此这个小案例就完成啦，样式部分的代码就不展示了，感兴趣的可以到我的仓库中查看源码，如果觉得不错的话欢迎点个 star~

> 源码: https://github.com/Plasticine-Yang/micro-frontends-demo/tree/main/0-juejin-store

# 简易掘金商城案例 -- 微前端方案

## 思考微前端架构需要解决的问题

前面我们用传统方案开发的掘金商城中，存在以下几个问题:

1. 所有的`html`都是由客户端的`js`动态生成的，也就是纯客户端渲染，这不利于`SEO`并且可能存在首屏白屏时间过长的问题(本项目中逻辑简单，不存在白屏很长的情况，但放到规模大一些的项目中来看就不一样了)
2. 只要`state`数据发生改变就会导致整个页面重新渲染，没有任何的`diff`算法优化进行局部更新，比如点击购买的时候只需要修改购物车状态对应的视图即可，没必要修改商品列表和关联商品中的内容，但传统方案实现中是简单粗暴地直接调用`rerender`进行全部内容的重新渲染的
3. 所有代码都是在一个项目中维护的，没有拆分成不同模块并交由不同团队去负责

为了解决以上几个问题，我们需要通过微前端的架构思想来进行优化，关于第一个问题可以由服务端渲染来解决，但这个不是重点，我们先仍然使用客户端渲染的方式进行开发

### 项目模块拆分

为了能够让不同团队来负责不同模块，我们首先需要将整个掘金商城拆分成不同的模块，拆分结果如下:

![模块拆分.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae0551fa0b95466b822c186a6eead379~tplv-k3u1fbpfcp-watermark.image?)

红色框圈住的是整个主应用，主应用决定了整个项目有哪些功能以及应用的整体布局，主应用负责展示商品的封面图片，商品名和商品列表，而商品的购买和关联商品则拆分成两个独立的模块应用，模块应用有独立的团队去负责实现

模块应用之间相互独立，模块提供的产物是`WebComponent`，这样就能够在模块应用加载完毕后直接在主应用中组合使用各个模块，模块之间的部署可以是独立的，只要保证能够在主应用中获取到模块应用的部署产物即可

每个模块都由独立的团队负责，为了区分不同团队，我们约定一下关联商品模块的团队名为`foo`，购买商品模块的团队名为`bar`

### 其他问题

微前端架构最重要的是思考如何解决下面的几个问题:

1. 模块之间`js`隔离机制
2. 避免`css`样式冲突
3. 按需加载资源
4. 在团队之间共享公共资源
5. 处理异步数据的获取以及为用户考虑良好的加载状态

明白了大致思路后，就需要考虑下如何将项目进行拆分，拆分成可以独立存在的多个模块应用

## 主应用

首先我们来实现主应用，核心在于渲染器的实现，直接参考传统方案中的渲染器实现，并把购买相关的渲染和关联商品相关的渲染移除，然后改为引用相应模块提供的`WebComponent Custom Elements`的方式，核心代码如下:

```ts
function render() {
  // 获取当前展示的商品
  const product = getProductById(state.productId)

  $app.innerHTML = `
    <section class="juejin-store">
      <!-- 标题 -->
      <h1 class="title">掘金商城</h1>

      <!-- 购物车 -->
      <bar-basket class="basket"></bar-basket>

      <!-- 商品图片预览 -->
      <section class="previewer">
        <img src="${loadImage(product?.cover ?? 'no-data.png')}" alt="${
    product?.name ?? '未知商品'
  }" />
      </section>

      <!-- 商品名 -->
      <h3 class="product-name">${product?.name ?? '未知商品'}</h3>

      <!-- 商品列表 -->
      <section class="product-list">${renderProductList()}</section>

      <!-- 购买按钮 -->
      <bar-purchase-btn class="purchase-btn"></bar-purchase-btn>

      <!-- 关联商品 -->
      <foo-related-products class="related-products"></foo-related-products>
    </section>
    `
}
```

注意，为了防止团队之间自定义元素的命名冲突，我们要遵守前面提到的微前端架构背后的核心思想，注册和使用自定义元素时都需要加上团队名前缀以示区分

现在我们的主应用就将商品的购买逻辑和关联商品的逻辑独立出去了，只需要等相应团队开发完成后将他们提供的`WebComponent`注册到主应用中即可

完整代码可以到我的仓库中查看，这里更多的是代码结构上的调整，代码内容大致上是一样的，就不贴出来了

> 源码: https://github.com/Plasticine-Yang/micro-frontends-demo/tree/main/1-composition-client-only/main-app

## foo 团队 -- 关联商品模块应用

`foo`团队的主要任务就是完成关联商品模块，我们以`CustomElements`的方式去实现，最终注册到全局即可

```ts
import { getProductById, getRelatedProducts } from './model'
import { loadImage } from './utils'

class FooRelatedProducts extends HTMLElement {
  // 被观察的数据在更新时会触发 attributeChangedCallback 回调
  static get observedAttributes() {
    return ['product-id']
  }

  // 元素被注册时会调用该钩子
  connectedCallback() {
    const product = this.getProduct()
    this.log(`connected! product: ${product}`)
    this.render()
  }

  // product-id 更新时重新渲染对应的关联商品
  attributeChangedCallback(
    attrName: string,
    oldValue: string,
    newValue: string,
  ) {
    this.log(`attr changed: ${attrName} -- from ${oldValue} to ${newValue}`)

    switch (attrName) {
      case 'product-id':
        this.render()
        break
    }
  }

  // 根据调用者传入的 prop: 商品 id 来获取商品对象
  getProduct() {
    const productId = this.getAttribute('product-id')

    if (productId) {
      const product = getProductById(Number(productId))
      return product
    }

    return null
  }

  // html 模板
  template() {
    const product = this.getProduct()

    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        .related-product-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 20px;
        }

        .related-product-list-item {
          cursor: pointer;

          img {
            width: 100%;
            border-radius: 20px;
          }
        }
      </style>

      <section>
        <h3>关联商品</h3>

        <!-- 关联商品列表 -->
        <section class="related-product-list">${
          product && this.renderRelatedProductList(product)
        }</section>
      </section>
      `

    return template.content.cloneNode(true)
  }

  /**
   * @description 渲染商品的关联商品
   * @param product 商品
   */
  renderRelatedProductList(product: IProduct): string {
    const renderRelatedProductItem = (relatedProduct: IProduct): string => {
      return `
        <div class="related-product-list-item">
          <img src="${loadImage(relatedProduct.cover)}" alt="${
        relatedProduct.name
      }" data-product-id="${relatedProduct.id}" />
        </div>
      `
    }

    return getRelatedProducts(product.id)
      .map(relatedProduct =>
        relatedProduct ? renderRelatedProductItem(relatedProduct) : '',
      )
      .join('')
  }

  render() {
    const clonedTemplateNode = this.template()

    this.attachShadow({ mode: 'closed' })
    this.shadowRoot!.appendChild(clonedTemplateNode)
  }

  log(...args: any[]) {
    console.log('team-foo', ...args)
  }
}

// 将自定义元素注册到全局
window.customElements.define('foo-related-products', FooRelatedProducts)

export default FooRelatedProducts
```

关于`CustomElements`的使用可以看我之前的这篇文章，里面有详细的介绍

> [👉 Custom Elements -- 原生 JS 实现组件化 WebComponent 的基石](https://juejin.cn/post/7151788510691721224)

## bar 团队 -- 商品购买模块应用

至于 `bar` 团队，则负责购买商品的按钮以及购物车功能，为此，要提供两个自定义元素

`购买商品按钮`

```ts
import { getProductById } from '../model'
import { state } from '../state'

class PurchaseBtn extends HTMLElement {
  private attachedShadowRoot: ShadowRoot | null = null

  // 被观察的数据在更新时会触发 attributeChangedCallback 回调
  static get observedAttributes() {
    return ['product-id']
  }

  // 元素被注册时会调用该钩子
  connectedCallback() {
    const product = this.getProduct()
    this.log(`connected! product: ${product}`)
    this.render()
    this.attachedShadowRoot?.addEventListener('click', this.addToBasket)
  }

  disconnectedCallback() {
    this.attachedShadowRoot?.removeEventListener('click', this.addToBasket)
  }

  // product-id 更新时重新渲染对应的关联商品
  attributeChangedCallback(
    attrName: string,
    oldValue: string,
    newValue: string,
  ) {
    this.log(`attr changed: ${attrName} -- from ${oldValue} to ${newValue}`)

    switch (attrName) {
      case 'product-id':
        this.render()
        break
    }
  }

  // 根据调用者传入的 prop: 商品 id 来获取商品对象
  getProduct() {
    const productId = this.getAttribute('product-id')

    if (productId) {
      const product = getProductById(Number(productId))
      return product
    }

    return null
  }

  /**
   * @description 添加商品到购物车 -- 自增 state.basketCount 并派发自定义事件 bar:basket:changed
   */
  addToBasket() {
    state.basketCount++
    this.log('派发自定义事件: bar:basket:changed')
    this.dispatchEvent(
      new CustomEvent('bar:basket:changed', {
        bubbles: true,
      }),
    )
  }

  // html 模板
  template() {
    const product = this.getProduct()

    const template = document.createElement('template')
    template.innerHTML = `
      <button>购买: ${product?.price ?? 66666} ￥</button>
      `

    return template.content.cloneNode(true)
  }

  render() {
    const clonedTemplateNode = this.template()

    this.attachedShadowRoot = this.attachShadow({ mode: 'closed' })
    this.attachedShadowRoot.appendChild(clonedTemplateNode)
  }

  log(...args: any[]) {
    console.log('team-bar', ...args)
  }
}

export default PurchaseBtn
```

`购物车`

```ts
import { state } from '../state'

class Basket extends HTMLElement {
  // 元素被注册时会调用该钩子
  connectedCallback() {
    // this.refresh 作为事件处理函数被调用时 this 会丢失 所以需要显式绑定一下 this
    this.refresh = this.refresh.bind(this)
    this.render()
    window.addEventListener('bar:basket:changed', this.refresh)
  }

  disconnectedCallback() {
    window.removeEventListener('bar:basket:changed', this.refresh)
  }

  // html 模板
  template() {
    const template = document.createElement('template')
    template.innerHTML = `
      <section>购物车：${state.basketCount} 件</section>
    `

    return template.content.cloneNode(true)
  }

  render() {
    const clonedTemplateNode = this.template()

    this.attachShadow({ mode: 'closed' }).appendChild(clonedTemplateNode)
  }

  refresh() {
    this.log('接收到自定义事件: bar:basket:changed')
    this.render()
  }

  log(...args: any[]) {
    console.log('team-bar', ...args)
  }
}

export default Basket
```

最后还要记得注册自定义元素

```ts
window.customElements.define('bar-purchase-btn', PurchaseBtn)
window.customElements.define('bar-basket', Basket)
```

这样我们就算是体验了一下微前端架构下的一个开发方式啦，当然这只是一个初步地探索，更深入的内容还是需要大家去[micro-frontends.org](https://micro-frontends.org/)中研究一下~
