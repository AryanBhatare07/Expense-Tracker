import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import Login from "../src/pages/Auth/Login";
import SignUp from "../src/pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

const App = () => {
  const [aiOpen, setAiOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! 👋 I'm your AI Financial Assistant. How can I help you?",
    },
  ]);
  return (
    <UserProvider>
      <div className="text-3xl">
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <Home
                  aiOpen={aiOpen}
                  setAiOpen={setAiOpen}
                  messages={messages}
                  setMessages={setMessages}
                />
              }
            />

            <Route
              path="/income"
              element={
                <Income
                  aiOpen={aiOpen}
                  setAiOpen={setAiOpen}
                  messages={messages}
                  setMessages={setMessages}
                />
              }
            />

            <Route
              path="/expense"
              element={
                <Expense
                  aiOpen={aiOpen}
                  setAiOpen={setAiOpen}
                  messages={messages}
                  setMessages={setMessages}
                />
              }
            />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
