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

const App = () => (
  <div className="dark">
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/select-language" element={<SelectLanguagePage />} />
            
            {/* Dashboard routes with layout */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="send-message" element={<SendMessagePage />} />
              <Route path="templates" element={<TemplatesPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="credits" element={<CreditsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="change-password" element={<ChangePasswordPage />} />
            </Route>
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </div>
);

export default App;
