import {
  getDisplayProductList,
  getProductById,
  getRelatedProducts,
} from './model'
import { loadImage } from './utils'

function createRenderer($app: App) {
  const state = {
    // 当前展示的商品 id
    productId: 1,
    // 购物车中商品数量
    basketCount: 0,
  }

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

  /**
   * @description 渲染商品列表
   * @param displayProductList 展示在商品列表中的商品
   */
  function renderProductList(): string {
    const displayProductList = getDisplayProductList()
    const renderProductItem = (product: IProduct): string => {
      const active = product.id === state.productId
      return `
        <div class="product-list-item ${active ? 'active' : ''}">
          <img src="${loadImage(product.cover)}" alt="${product.name}" />
        </div>
      `
    }

    return displayProductList.map(renderProductItem).join('')
  }

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
      }" />
        </div>
      `
    }

    return getRelatedProducts(product.id)
      .map(relatedProduct =>
        relatedProduct ? renderRelatedProductItem(relatedProduct) : '',
      )
      .join('')
  }

  return {
    render,
  }
}

export default createRenderer
