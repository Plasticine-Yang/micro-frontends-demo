import createRenderer from './renderer'
import './style'

const $app = document.querySelector<HTMLDivElement>('#app')!

const setupApp = ($app: App) => {
  const { run } = createRenderer($app)

  run()
}

setupApp($app)
