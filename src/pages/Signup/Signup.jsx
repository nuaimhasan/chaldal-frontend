import { Link } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { AiFillLock, AiTwotonePhone } from "react-icons/ai";

export default function Signup() {
  return (
    <div className="py-6 bg-gray-50">
      <div className="container">
        <div className="w-[420px] mx-auto bg-base-100 shadow-lg rounded-lg p-6">
          <img src="/images/logo/logo.png" alt="" className="w-28 mx-auto" />
          <h6 className="text-xl font-medium mt-2 text-center text-neutral/80">
            Welcome to eshop
          </h6>

          <form className="mt-10 text-neutral">
            <div>
              <div className="grid grid-cols-2 gap-6">
                <div className="mb-6 relative">
                  <span className="absolute bottom-2 text-neutral/80">
                    <HiUser />
                  </span>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    className="w-full border-b focus:border-b-primary outline-none pl-6 pb-1 placeholder:font-light"
                    required
                  />
                </div>

                <div className="mb-6 relative">
                  <span className="absolute bottom-2 text-neutral/80">
                    <HiUser />
                  </span>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="w-full border-b focus:border-b-primary outline-none pl-6 pb-1 placeholder:font-light"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-6 relative">
                <span className="absolute bottom-2 text-neutral/80">
                  <MdEmail />
                </span>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full border-b focus:border-b-primary outline-none pl-6 pb-1 placeholder:font-light"
                  required
                />
              </div>

              {/* Phone */}
              <div className="mb-6 relative">
                <span className="absolute bottom-2 text-neutral/80">
                  <AiTwotonePhone className="text-lg" />
                </span>
                <input
                  name="number"
                  type="text"
                  placeholder="Number"
                  className="w-full border-b focus:border-b-primary outline-none pl-6 pb-1 placeholder:font-light"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-6 relative">
                <span className="absolute bottom-2 text-neutral/80">
                  <AiFillLock />
                </span>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full border-b focus:border-b-primary outline-none pl-6 pb-1 placeholder:font-light"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col w-full border-opacity-50">
              <button
                type="submit"
                className="w-full py-2 font-semibold text-base-100 bg-primary rounded hover:bg-opacity-90 duration-300 flex justify-center"
              >
                Create my account
              </button>
            </div>
          </form>

          <div className="border-t border-neutral/20 mt-6 pt-4 text-center">
            <p className="text-sm text-neutral/70">
              Already have an account?
              <Link to="/login" className="text-blue-500  pl-2 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
