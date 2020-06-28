import React from "react";
import "materialize-css";
import { AuthContext } from "./context/AuthContext";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";

const App = () => {
  const { login, logout, token, userId, ready } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  if (!ready) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isAuth }}>
      <Router forceRefresh={true}>
        {isAuth && <Navbar />}
        <div className="container mt-40">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
