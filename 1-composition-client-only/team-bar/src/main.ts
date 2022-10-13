import { Basket, PurchaseBtn } from './custom-elements'

// 将自定义元素注册到全局
window.customElements.define('bar-purchase-btn', PurchaseBtn)
window.customElements.define('bar-basket', Basket)
