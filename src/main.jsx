import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Quize from './components/Quize.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Quize />
  </StrictMode>,
)
