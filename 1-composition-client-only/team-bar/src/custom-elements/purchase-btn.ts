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
