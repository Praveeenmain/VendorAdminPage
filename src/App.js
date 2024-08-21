import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import Calendar from "./scenes/calendar/calendar";
import Login from './scenes/Login/index'
import PublicRoute from "./components/PublicRoute";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  // Check if the current path is "/login"
  const isLoginPage = location.pathname === "/login";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isLoginPage && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {!isLoginPage && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/login" element={<PublicRoute element={Login}/>} />
              <Route path="/" element={<ProtectedRoute element={Dashboard} />} />
              <Route path="/team" element={<ProtectedRoute element={Team} />} />
              <Route path="/vendors" element={<ProtectedRoute element={Contacts} />} />
              <Route path="/invoices" element={<ProtectedRoute element={Invoices} />} />
              <Route path="/form" element={<ProtectedRoute element={Form} />} />
              <Route path="/faq" element={<ProtectedRoute element={FAQ} />} />
              <Route path="/calendar" element={<ProtectedRoute element={Calendar} />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
