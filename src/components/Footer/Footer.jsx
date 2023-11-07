import { Link } from "react-router-dom";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="border-t pt-8 pb-4">
      <div className="container">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <Link to="/">
              <img
                src="/images/logo/logo.png"
                className="w-20"
                alt="eshop Logo"
              />
            </Link>
            <p className="text-[15px] text-neutral-content">
              Your trusted online shop
            </p>

            <div className="mt-2 text-sm text-neutral-content">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque,
                eum molestias sed iusto sit cum cupiditate laborum accusantium
                ratione, excepturi sint voluptatibus, praesentium possimus
                asperiores.
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-base font-bold uppercase text-neutral/90">
              Categories
            </h2>
            <ul className="text-neutral-content text-[15px]">
              <li className="mb-2">
                <Link to="/" className="hover:underline">
                  Shop
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">
                  FAQ
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
              Information
            </h2>
            <ul className="text-neutral-content text-[15px]">
              <li className="mb-2">
                <Link to="/" className="hover:underline">
                  Shop
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">
                  FAQ
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
                <p className="italic">1072, Malibagh Bazar Road, Dhaka</p>
              </li>
              <li className="mb-1">
                <Link to="/" className="italic">
                  +8801647-534496
                </Link>
              </li>
              <li>
                <Link to="/" className="italic">
                  aestheticfashion@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-[15px] text-neutral-content">
            © 2023{" "}
            <a to="https://flowbite.com/" className="hover:underline">
              eshop
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex items-center gap-2 text-neutral-content mt-3 sm:mt-0">
            <li>
              <Link
                to="https://www.facebook.com/beautyqueen5962"
                target="_blank"
              >
                <BsFacebook className="text-lg hover:-mt-2 duration-300" />
              </Link>
            </li>
            <li>
              <Link
                to="https://api.whatsapp.com/send?phone=8801768765962"
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
