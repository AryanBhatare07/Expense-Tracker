import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowUpRight,
  PieChart,
  BarChart3,
  Shield,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");

    // Later:
    // axios.post("/api/auth/login", { email, password })
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  return (
    <div className="page-enter min-h-screen bg-[#08111f] text-white flex items-center justify-center px-4">
      {/* MAIN CONTAINER */}
      <div className="w-full max-w-7xl h-[94vh] flex overflow-hidden rounded-3xl">
        {/* ================= LEFT SIDE ================= */}

        <div className="hidden lg:flex lg:w-1/2 h-full relative overflow-hidden p-8">
          {/* Background Glow */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-600/20 blur-[120px] rounded-full"></div>

          <div className="absolute bottom-10 left-10 w-72 h-72 bg-emerald-500/10 blur-[120px] rounded-full"></div>

          <div className="relative z-10 flex flex-col justify-center w-full max-w-xl mx-auto">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <ArrowUpRight size={23} />
              </div>

              <div>
                <h1 className="text-xl font-bold">FinTrack</h1>

                <p className="text-slate-400 text-xs">Expense Tracker</p>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-bold leading-tight">
              Take Control of
              <br />
              Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-500 to-indigo-400">
                Finances
              </span>
            </h2>

            <p className="text-slate-400 text-sm mt-4 max-w-md leading-6">
              Track your income, manage expenses, and build a better financial
              future.
            </p>

            {/* Features */}
            <div className="mt-7 space-y-4">
              <Feature
                icon={<PieChart size={21} />}
                title="Smart Tracking"
                text="Track every income and expense in one place."
                iconStyle="text-violet-400 bg-violet-500/10"
              />

              <Feature
                icon={<BarChart3 size={21} />}
                title="Insightful Reports"
                text="Understand your spending through useful charts."
                iconStyle="text-emerald-400 bg-emerald-500/10"
              />

              <Feature
                icon={<Shield size={21} />}
                title="Secure & Private"
                text="Your financial data stays private and protected."
                iconStyle="text-amber-400 bg-amber-500/10"
              />
            </div>

            {/* Analytics */}
            <div className="mt-7 max-w-xl">
              {/* Balance */}
              <div className="bg-[#111c2e]/80 border border-slate-700/70 rounded-2xl p-4 backdrop-blur-md shadow-xl">
                <p className="text-slate-400 text-xs">Total Balance</p>

                <div className="flex justify-between items-end mt-2">
                  <div>
                    <h3 className="text-2xl font-semibold">₹42,500.00</h3>

                    <p className="text-emerald-400 text-xs mt-1">
                      ▲ 8.45%{" "}
                      <span className="text-slate-500">vs last month</span>
                    </p>
                  </div>

                  <div className="w-28 h-10 border-b-2 border-violet-500 rounded-full"></div>
                </div>
              </div>

              {/* Income + Expense */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3">
                  <p className="text-slate-400 text-xs">Income</p>

                  <p className="text-lg font-semibold mt-1">₹68,000</p>

                  <p className="text-emerald-400 text-xs mt-1">▲ 12.34%</p>
                </div>

                <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-3">
                  <p className="text-slate-400 text-xs">Expenses</p>

                  <p className="text-lg font-semibold mt-1">₹25,500</p>

                  <p className="text-rose-400 text-xs mt-1">▼ 3.21%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-6">
          {/* LOGIN CARD */}
          <div className="w-full max-w-md bg-[#0e192a] border border-slate-800 rounded-3xl px-8 py-8 shadow-2xl">
            {/* Heading */}
            <div className="text-center mb-7">
              <h2 className="text-2xl font-bold">Welcome Back! 👋</h2>

              <p className="text-slate-400 text-sm mt-2">
                Login to continue to your account
              </p>
            </div>

            <form onSubmit={handleLogin}>
              {/* EMAIL */}
              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className="w-full bg-[#0b1525] border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    className="w-full bg-[#0b1525] border border-slate-700 rounded-xl py-3 pl-11 pr-11 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right mb-5">
                <button
                  type="button"
                  className="text-indigo-400 hover:text-indigo-300 text-xs"
                >
                  Forgot Password?
                </button>
              </div>
              {/* ERROR */}
              {error && <p className="text-rose-400 text-sm mb-4">{error}</p>}
              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-sm bg-linear-to-r from-violet-600 to-indigo-500 hover:opacity-90 active:scale-[0.99] transition shadow-lg shadow-indigo-500/20"
              >
                Login
              </button>
              {/* DIVIDER */}
              <div className="flex items-center gap-4 my-5">
                <div className="h-px bg-slate-800 flex-1"></div>
                <span className="text-slate-500 text-xs">or</span>

                <div className="h-px bg-slate-800 flex-1"></div>
              </div>
              {/* GOOGLE */}
              <button
                type="button"
                className="w-full border border-slate-700 py-3 rounded-xl text-sm font-medium hover:bg-slate-800/50 transition"
              >
                Continue with Google
              </button>
              {/* SIGNUP LINK */}
              <p className="text-center text-slate-400 text-sm mt-5">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, title, text, iconStyle }) => {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconStyle}`}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-slate-400 text-xs mt-1 leading-5 max-w-xs">{text}</p>
      </div>
    </div>
  );
};

export default Login;
