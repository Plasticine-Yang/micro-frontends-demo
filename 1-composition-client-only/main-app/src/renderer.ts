import createEventListeners from './event-listeners'
import { getDisplayProductList, getProductById } from './model'
import { loadImage } from './utils'

function createRenderer($app: App) {
  const state: IState = {
    productId: 1,
  }

  /**
   * @description 更新 state
   * @param cb 更新 state 的回调
   */
  const setState: SetState = cb => {
    cb(state)
  }

  const { addEventListeners, removeEventListeners } = createEventListeners({
    setState,
    rerender,
  })

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
      <foo-related-products class="related-products" product-id="${
        product?.id
      }"></foo-related-products>
    </section>
    `
  }

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

  function rerender() {
    removeEventListeners()
    render()
    addEventListeners()
  }

  function run() {
    render()
    addEventListeners()
  }

  return {
    run,
  }
}

export default createRenderer
