import createRenderer from './renderer'
import './styles'

function setupJuejinStore($app: App) {
  const { render } = createRenderer($app)

  render()
}

export default setupJuejinStore
