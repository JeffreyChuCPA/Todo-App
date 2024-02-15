import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode> //*strictmode turn off to enable react dnd draggable features due to react 18 incompatibility
    <App />
  // {/* </React.StrictMode>, */}
)
