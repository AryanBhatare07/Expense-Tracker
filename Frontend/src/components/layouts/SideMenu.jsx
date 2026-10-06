import React, { useEffect, useRef, useContext, useState } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import axiosInstance from "../../utils/axiosInstance";
import ReactMarkdown from "react-markdown";

const SideMenu = ({ activeMenu, aiOpen, setAiOpen, messages, setMessages }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "Total income?",
    "Biggest expense?",
    "Total savings?",
    "Saving tip?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  const handleClick = (item) => {
    if (item.path === "logout") {
      handleLogout();
      return;
    }

    if (item.label === "AI Assistant") {
      setAiOpen(true);
      return;
    }

    navigate(item.path);
  };

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "/api/v1/chat",
        {
          message: userMessage,
        },
        {
          timeout: 60000,
        },
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: response.data.reply,
        },
      ]);
    } catch (error) {
      console.log("Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed top-15.25 left-0 h-[calc(100vh-61px)] overflow-y-auto bg-[#0e192a] border-r border-slate-800 p-4 transition-all duration-300 flex flex-col ${
        aiOpen ? "w-100" : "w-64"
      }`}
    >
      {/* USER INFO */}
      <div className="flex items-center gap-3 px-3 py-2 mb-6 border-b border-slate-800">
        <div className="w-11 h-11 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-semibold text-lg">
          {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <h5 className="text-xl font-medium text-white">
          {user?.fullname || "User"}
        </h5>
      </div>

      {/* MENU */}
      <div>
        {SIDE_MENU_DATA.filter((item) => item.path !== "logout").map(
          (item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={`menu_${index}`}
                className={`w-full flex items-center gap-4 text-[15px] py-3 px-5 rounded-lg mb-2 transition ${
                  aiOpen && item.label === "AI Assistant"
                    ? "text-white bg-indigo-600"
                    : activeMenu === item.label
                      ? "text-white bg-indigo-600"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
                onClick={() => handleClick(item)}
              >
                <Icon className="text-xl" />
                {item.label}
              </button>
            );
          },
        )}
      </div>

      {/* AI CHAT */}
      {aiOpen && (
        <div className="mt-4 border-t border-slate-800 pt-4 flex flex-col flex-1 min-h-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-white text-base font-semibold">
                AI Financial Assistant
              </h3>

              <p className="text-xs text-slate-400">Ask about your finances</p>
            </div>

            <button
              onClick={() => setAiOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="mb-2">
            <p className="text-xs text-slate-500 mb-1">Suggested questions</p>

            <div className="flex flex-wrap gap-1.5">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(question)}
                  className="text-xs px-2.5 py-1 rounded-full
 bg-[#172235] text-slate-300
 hover:bg-indigo-600 hover:text-white
 transition"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1 custom-scrollbar pb-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-[#172235] text-slate-200"
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#172235] text-slate-400 px-3 py-2 rounded-xl text-sm">
                  FinTrack AI is thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              placeholder="Ask something..."
              className="flex-1 min-w-0 bg-[#172235] text-white text-sm rounded-lg px-3 py-2 outline-none border border-slate-700 focus:border-indigo-500"
            />

            <button
              onClick={handleSend}
              className="w-10 h-10 shrink-0 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700"
            >
              <IoSend size={17} />
            </button>
          </div>
        </div>
      )}

      {/* LOGOUT */}
      <div className="mt-auto pt-4 border-t border-slate-800">
        {SIDE_MENU_DATA.filter((item) => item.path === "logout").map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className="w-full flex items-center gap-4 text-[15px] py-3 px-5 rounded-lg text-red-500 hover:text-red-400 hover:bg-red-500/10 transition"
              onClick={() => handleClick(item)}
            >
              <Icon className="text-xl" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
