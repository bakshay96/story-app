import { useEffect, useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { existingUser, login } from "../Redux/Slices/authSlice";


const Login = () => {
	const {token,user} =useSelector((state)=>state.auth)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 console.log(token,user)
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch=useDispatch();
  if(token && !user)
  {
    dispatch(existingUser(token));
    navigate("/")
  }
  if(user)
  {
    navigate("/")
  }
  
  const loginHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      
    } else {
      let userData = { email, password };
      dispatch(login(userData));
      
    }
  };

  useEffect(() => {
    
    return (()=>console.log("clearing data"))
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900">
      <div className="flex flex-col items-center mb-2">
        <div className="w-16 h-16 rounded-full bg-teal-300">
		<span className="p-3 h-16">
                  <FaUserAlt className="text-gray-400 dark:text-gray-500 w-full h-5 " />
                </span>
		</div>
        <h2 className="text-teal-400 text-3xl font-semibold dark:text-teal-300">Welcome Back</h2>
        <p className="text-gray-500 font-semibold dark:text-gray-400">Sign in to continue.</p>
        <div className="w-full max-w-md">
          <form>
            <div className="space-y-4 p-4">
              <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg gap-2">
                <span className="pl-3">
                  <FaUserAlt className="text-gray-400 dark:text-gray-500" />
                </span>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 px-4 focus:outline-none rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg gap-2">
                <span className="pl-3">
                  <FaLock className="text-gray-400 dark:text-gray-500" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 px-4 focus:outline-none rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm font-medium pr-4 dark:text-gray-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-gray-600 dark:text-gray-400">
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                onClick={loginHandler}
                className="w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors dark:bg-teal-600 dark:hover:bg-teal-700"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-4">
        New user?{" "}
        <Link to="/register" className="text-teal-500 dark:text-teal-300">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
