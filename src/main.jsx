import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CityPage from './pages/CityPage.jsx'
import ArticlePage from './pages/ArticlePage.jsx'
import ArticleEntretienPage from './pages/ArticleEntretienPage.jsx'
import ArticleEpoxyPolyureeePage from './pages/ArticleEpoxyPolyureeePage.jsx'
import ArticlePrixPage from './pages/ArticlePrixPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/poseur-epoxy/:citySlug" element={<CityPage />} />
        <Route path="/articles/5-erreurs-plancher-epoxy" element={<ArticlePage />} />
        <Route path="/articles/guide-entretien-plancher-epoxy" element={<ArticleEntretienPage />} />
        <Route path="/articles/epoxy-vs-polyuree" element={<ArticleEpoxyPolyureeePage />} />
        <Route path="/articles/prix-plancher-epoxy-quebec-2026" element={<ArticlePrixPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
