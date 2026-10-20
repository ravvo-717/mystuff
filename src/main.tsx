import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Showcase } from './pages/Showcase'
import './styles/theme.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Showcase />
  </StrictMode>,
)
