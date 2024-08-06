import { useEffect, useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../Redux/Slices/authSlice";
import { toast } from "react-toastify";


const Register = () => {
  const {token,user} =useSelector((state)=>state.auth)
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
console.log(user,token)
if(user)
{
   navigate("/")
}
  const handleShowClick = () => setShowPassword(!showPassword);

  const signupHandler = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
     
      toast.info("Please fill all required fields");
    } else {
      let userData = { username, email, password };
      console.log(userData)
      dispatch(register(userData))
      
      
    }
  };

  useEffect(() => {
 
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900">
    <div className="flex flex-col items-center mb-2">
      <div className="w-16 h-16 rounded-full bg-teal-300">
      <span className="p-3 h-16" >
                <FaUserAlt className="text-gray-400 dark:text-gray-500 w-full h-5" />
              </span>
      </div>
      <h2 className="text-teal-400 text-3xl font-semibold dark:text-teal-300">Welcome</h2>
      <p className="text-gray-500 font-semibold dark:text-gray-400">
        Sign up to join Bookish Journey.
      </p>
      <div className="w-full max-w-md">
        <form>
          <div className="space-y-4 p-4">
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg gap-2">
              <span className="pl-3">
                <FaUserAlt className="text-gray-400 dark:text-gray-500" />
              </span>
              <input
                type="text"
                placeholder="First Name"
                value={username}
                onChange={(e) => setuserName(e.target.value)}
                className="w-full py-2 px-4 focus:outline-none rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
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
              onClick={signupHandler}
              className="w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors dark:bg-teal-600 dark:hover:bg-teal-700"
            >
              Sign up
            </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        already have an account?{" "}
        <Link to="/login" className="text-teal-500">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Register;
