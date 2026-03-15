import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
    <Analytics />
    <SpeedInsights />
  </StrictMode>
)

// react-snap pre-renders pages as static HTML; hydrate if content already exists,
// otherwise do a normal client-side render (development / first load without pre-rendering)
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
