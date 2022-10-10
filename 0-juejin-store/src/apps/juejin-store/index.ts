import createRenderer from './renderer'
import './styles'

function setupJuejinStore($app: App) {
  const { run } = createRenderer($app)

  run()
}

export default setupJuejinStore
