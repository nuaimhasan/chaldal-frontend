import { AiFillUnlock } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";

export default function Login() {
  return (
    <div className="py-6 bg-gray-50">
      <div className="container">
        <div className="w-[420px] mx-auto bg-base-100 shadow-lg rounded-lg p-6">
          <img src="/images/logo/logo.png" alt="" className="w-28 mx-auto" />
          <h6 className="text-xl font-medium mt-2 text-center text-neutral/80">
            Log In
          </h6>

          <form>
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

              <div className="mb-2 relative">
                <span className="absolute bottom-2 text-neutral/80">
                  <AiFillUnlock className="text-lg" />
                </span>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full border-b focus:border-b-primary outline-none pl-8 pb-1 placeholder:font-light"
                  required
                />
              </div>

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
                  Log In
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
