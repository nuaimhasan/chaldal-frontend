import { AiFillEye, AiFillEyeInvisible, AiFillUnlock } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { UseContext } from "../../ContextApi/ContextApi";
import { useState } from "react";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import { toast } from "react-toastify";

export default function Login() {
  const { login, loginError, loading, loggedUser } = UseContext();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (loggedUser?.success || loggedUser !== null) {
    navigate(from, { replace: true });
  }

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const loginInfo = {
      email,
      password,
    };

    login(loginInfo);
  };

  return (
    <div className="py-6 bg-gray-50">
      <div className="container">
        <div className="w-[420px] mx-auto bg-base-100 shadow-lg rounded-lg p-6">
          <img src="/images/logo/logo.png" alt="" className="w-28 mx-auto" />
          <h6 className="text-xl font-medium mt-2 text-center text-neutral/80">
            Log In
          </h6>

          <form onSubmit={handleLogin}>
            <div className="mt-10 text-neutral">
              <div className="mb-6 relative">
                <span className="absolute bottom-2 text-neutral/80">
                  <MdEmail />
                </span>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full border-b focus:border-b-primary outline-none pl-8 pb-1 placeholder:font-light"
                  required
                />
              </div>

              <div className="mb-2">
                <div className="relative">
                  <span className="absolute bottom-2 text-neutral/80">
                    <AiFillUnlock className="text-lg" />
                  </span>

                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    name="password"
                    placeholder="Password"
                    className="w-full border-b focus:border-b-primary outline-none pl-8 pb-1 placeholder:font-light"
                    required
                  />

                  <div
                    className="absolute right-2 bottom-2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className={`${showPassword ? "block" : "hidden"}`}>
                      <AiFillEye />
                    </span>
                    <span className={`${showPassword ? "hidden" : "block"}`}>
                      <AiFillEyeInvisible />
                    </span>
                  </div>
                </div>
              </div>

              {loginError && (
                <p className="text-sm text-red-500">{loginError}</p>
              )}

              <div className="mt-2 flex justify-end">
                <Link
                  to=""
                  className="text-[13px] text-neutral/70 underline hover:text-primary duration-300"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="mt-3 flex flex-col w-full border-opacity-50">
                <button
                  type="submit"
                  className="w-full py-2 font-semibold text-base-100 bg-primary rounded hover:bg-opacity-90 duration-300 flex justify-center"
                >
                  {loading ? <ButtonSpinner /> : "Log In"}
                </button>
              </div>
            </div>
          </form>

          <div className="text-neutral/50 text-center my-4">OR</div>

          <div>
            <button className="w-full py-2 font-medium text-neutral border border-neutral/50 rounded hover:bg-opacity-90 duration-300 flex gap-4 justify-center items-center">
              <FcGoogle className="text-lg" />
              <span className="text-sm">Continue with Google</span>
            </button>
          </div>

          <div className="border-t border-neutral/20 mt-6 pt-4 text-center">
            <p className="text-sm text-neutral/70">
              Don't have an account?
              <Link
                to="/signup"
                className="text-blue-500  pl-2 hover:underline"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
