import { getProductById, getRelatedProducts } from '../model'
import { loadImage } from '../utils'

class RelatedProducts extends HTMLElement {
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

export default RelatedProducts
