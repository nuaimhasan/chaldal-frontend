import { Link } from "react-router-dom";
import ShopCategories from "./ShopCategories/ShopCategories";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Shop() {
  return (
    <section className="py-5 bg-gray-50 min-h-[70vh]">
      <div className="container">
        <ul className="flex gap-2 items-center text-neutral-content text-sm">
          <li>
            <Link to="/" className="text-primary">
              Home
            </Link>
          </li>
          <li>
            <MdKeyboardArrowRight />
          </li>
          <li>Shop</li>
        </ul>

        <div className="md:flex gap-4 mt-4">
          <ShopCategories />

          <div className="shop_products min-h-[70vh]">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {/* <ProductCard /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
