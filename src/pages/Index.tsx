import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to landing page instead of self to avoid loops
  return <Navigate to="/" replace />;
};

export default Index;