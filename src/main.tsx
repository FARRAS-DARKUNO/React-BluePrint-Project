import ReactDOM from 'react-dom/client'
import './index.css'
import Board from './Admin/board'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Board />
  </Provider>,
)
