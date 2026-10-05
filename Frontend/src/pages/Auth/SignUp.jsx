import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  User,
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
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullname, email, password } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullname.trim()) {
      setError("Full name is required");
      return;
    }

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

    //SignUp API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullname,
        email,
        password
      })

      const { token, user } = response.data
      if(token){
        localStorage.setItem('token',token)
        updateUser(user)
        navigate('/dashboard')
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
      <div className="w-full max-w-6xl h-[90vh] flex overflow-hidden rounded-3xl">
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
              Start Your Journey to
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-500 to-indigo-400">
                Financial Freedom
              </span>
            </h2>

            <p className="text-slate-400 text-sm mt-4 max-w-md leading-6">
              Create your account and start tracking your money, managing
              expenses, and building better financial habits.
            </p>

            {/* Features */}
            <div className="mt-7 space-y-4">
              <Feature
                icon={<PieChart size={21} />}
                title="Track Everything"
                text="Keep your income and expenses organized."
                iconStyle="text-violet-400 bg-violet-500/10"
              />

              <Feature
                icon={<BarChart3 size={21} />}
                title="Understand Your Spending"
                text="Visualize your finances using simple analytics."
                iconStyle="text-emerald-400 bg-emerald-500/10"
              />

              <Feature
                icon={<Shield size={21} />}
                title="Secure & Private"
                text="Your financial information stays protected."
                iconStyle="text-amber-400 bg-amber-500/10"
              />
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-[#0e192a] border border-slate-800 rounded-3xl px-8 py-6 shadow-2xl">
            {/* Heading */}
            <div className="text-center mb-5">
              <h2 className="text-2xl font-bold">Create Account 🚀</h2>

              <p className="text-slate-400 text-sm mt-2">
                Start managing your finances today
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="text"
                    name="fullname"
                    placeholder="Enter your full name"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full bg-[#0b1525] border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-sm placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-3">
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
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0b1525] border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-sm placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                  />
                </div>
              </div>

              {/* Password */}
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
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-[#0b1525] border border-slate-700 rounded-xl py-3 pl-11 pr-11 text-sm placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
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

              {/* Confirm Password
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-[#0b1525] border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-sm placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                  />
                </div>
              </div> */}

              {/* Error */}
              {error && <p className="text-rose-400 text-sm mb-3">{error}</p>}

              {/* Signup Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-sm bg-linear-to-r from-violet-600 to-indigo-500 hover:opacity-90 active:scale-[0.99] transition shadow-lg shadow-indigo-500/20"
              >
                Create Account
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-4">
                <div className="h-px bg-slate-800 flex-1"></div>

                <span className="text-slate-500 text-xs">or</span>

                <div className="h-px bg-slate-800 flex-1"></div>
              </div>

              {/* Google */}
              <button
                type="button"
                className="w-full border border-slate-700 py-3 rounded-xl text-sm font-medium hover:bg-slate-800/50 transition"
              >
                Continue with Google
              </button>

              {/* Login Link */}
              <p className="text-center text-slate-400 text-sm mt-4">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Login
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

        <p className="text-slate-400 text-xs mt-1 leading-5">{text}</p>
      </div>
    </div>
  );
};

export default Signup;
