import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import PreviewRoot from './preview/PreviewRoot'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public marketing site */}
        <Route path="/" element={<App />} />
        {/* Member-experience prototype — every phase from the PDF */}
        <Route path="/preview/*" element={<PreviewRoot />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
