import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext' // <-- importe AuthProvider

createRoot(document.getElementById("root")!).render(
  <AuthProvider>     {/* <-- ajoute ce wrapper */}
    <App />
  </AuthProvider>
)
