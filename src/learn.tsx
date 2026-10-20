import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Learn } from './pages/Learn'
import './styles/theme.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Learn />
  </StrictMode>,
)
