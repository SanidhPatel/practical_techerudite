import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RegisterAdmin from "./pages/Register";
import LoginAdmin from "./Pages/Login";
import SnackbarNotification from "./ui-component/alert";
import { SnackbarProvider } from "./context/AlertContext";
import Dashboard from "./Pages/Dashboard";
function App() {
  return (
    <SnackbarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterAdmin />} />
          <Route path="/customer-registration" element={<RegisterAdmin />} />
          <Route path="/login" element={<LoginAdmin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <SnackbarNotification />
      </Router>
    </SnackbarProvider>
  );
}

export default App;
