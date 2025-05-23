
import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to home page by default
  return <Navigate to="/" replace />;
};

export default Index;
