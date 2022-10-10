import setupJuejinStore from './apps/juejin-store'
import './style'

const $app = document.querySelector<HTMLDivElement>('#app')!

const setupApp = ($app: App) => {
  setupJuejinStore($app)
}

setupApp($app)
