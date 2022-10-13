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

    this.attachShadow({ mode: 'closed' })
    this.shadowRoot!.appendChild(clonedTemplateNode)
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
