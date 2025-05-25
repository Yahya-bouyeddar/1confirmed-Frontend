import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ClientsPage from "./pages/ClientsPage";
import SendMessagePage from "./pages/SendMessagePage";
import TemplatesPage from "./pages/TemplatesPage";
import MessagesPage from "./pages/MessagesPage";
import CreditsPage from "./pages/CreditsPage";
import ProfilePage from "./pages/ProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import SelectLanguagePage from "./pages/SelectLanguagePage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardLayout from "./components/DashboardLayout";
import { GuestRoute } from "./components/auth/GuestRoute";
import { PrivateRoute } from "./components/auth/PrivateRoute";

const App = () => (
  <div className="dark">
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
            <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute> }/>
            <Route path="/select-language" element={<PrivateRoute><SelectLanguagePage /></PrivateRoute>} />
            
            {/* Dashboard routes with layout */}
            <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>  
              <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
              <Route path="/clients" element={<PrivateRoute><ClientsPage /></PrivateRoute>} />
              <Route path="/send-message" element={<PrivateRoute><SendMessagePage /></PrivateRoute>} />
              <Route path="/templates" element={<PrivateRoute><TemplatesPage /></PrivateRoute>} />
              <Route path="/messages" element={<PrivateRoute><MessagesPage /></PrivateRoute>} />
              <Route path="/credits" element={<PrivateRoute><CreditsPage /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/change-password" element={<PrivateRoute><ChangePasswordPage /></PrivateRoute>} />

              </Route>
          
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </div>
);

export default App;
