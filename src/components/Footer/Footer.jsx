import { Link } from "react-router-dom";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { useGetCategoriesQuery } from "../../Redux/category/categoryApi";
import { useGetContactQuery } from "../../Redux/contact/contactApi";
import { useGetMainLogoQuery } from "../../Redux/logo/logoApi";

export default function Footer() {
  const { data } = useGetCategoriesQuery();
  const { data: contact } = useGetContactQuery();
  const { data: logo } = useGetMainLogoQuery();

  return (
    <footer className="border-t pt-8 pb-4">
      <div className="container">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="w-max">
              <Link to="/">
                <img
                  src={
                    logo?.data?.logo === ""
                      ? "/images/logo/logo.png"
                      : `${import.meta.env.VITE_BACKEND_URL}/images/logos/${
                          logo?.data?.logo
                        }`
                  }
                  className="w-36"
                  alt="Logo"
                />
              </Link>
            </div>
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
                <p className="italic">{contact?.data?.address}</p>
              </li>
              <li className="mb-1">
                <p>{contact?.data?.phone}</p>
              </li>
              <li>
                <p>{contact?.data?.email}</p>
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
