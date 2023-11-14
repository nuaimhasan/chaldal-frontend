import { Link } from "react-router-dom";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { useGetCategoriesQuery } from "../../Redux/category/categoryApi";

export default function Footer() {
  const { data } = useGetCategoriesQuery();

  return (
    <footer className="border-t pt-8 pb-4">
      <div className="container">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <Link to="/">
              <img
                src="/images/logo/logo_withoutbg.png"
                className="w-36"
                alt="Logo"
              />
            </Link>
            <p className="text-neutral-content mt-1 font-medium">
              Your trusted online shop
            </p>

            <div className="mt-2 text-sm text-neutral-content">
              <p>
                We offer a variety of fashionable & branded sportswear,polo
                shirt,t-shirt at a very reasonable price.
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-base font-bold uppercase text-neutral/90">
              Categories
            </h2>
            <ul className="text-neutral-content text-[15px]">
              {data?.data?.map((category, i) => (
                <li key={i} className="mb-2">
                  <Link
                    to={`/shops/${category?.slug}`}
                    className="hover:underline"
                  >
                    {category?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-base font-bold uppercase text-neutral/90">
              Information
            </h2>
            <ul className="text-neutral-content text-[15px]">
              <li className="mb-2">
                <Link to="/shops" className="hover:underline">
                  Shop
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about-us" className="hover:underline">
                  About Us
                </Link>
              </li>

              <li className="mb-2">
                <Link to="/" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-base font-bold uppercase text-neutral/90">
              Get in Touch
            </h2>
            <ul className="text-neutral-content text-[15px]">
              <li className="mb-1">
                <p className="italic">
                  House No# 40, Road No# 7, Block# C, Banasree, Dhaka 1219
                </p>
              </li>
              <li className="mb-1">
                <p>+8801647-534496</p>
              </li>
              <li>
                <p>aestheticfashion@gmail.com</p>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-[15px] text-neutral-content">
            © 2023{" "}
            <a
              to="https://www.facebook.com/aestheticcloth247"
              className="hover:underline"
            >
              aestheticcloth
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex items-center gap-2 text-neutral-content mt-3 sm:mt-0">
            <li>
              <Link
                to="https://www.facebook.com/aestheticcloth247"
                target="_blank"
              >
                <BsFacebook className="text-lg hover:-mt-2 duration-300" />
              </Link>
            </li>
            <li>
              <Link
                to="https://api.whatsapp.com/send?phone=8801647534496"
                target="_blank"
              >
                <IoLogoWhatsapp className="text-xl hover:-mt-2 duration-300" />
              </Link>
            </li>
            <li>
              <Link to="">
                <AiFillInstagram className="text-xl hover:-mt-2 duration-300" />
              </Link>
            </li>
            <li>
              <Link to="">
                <BsYoutube className="text-xl hover:-mt-2 duration-300" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
