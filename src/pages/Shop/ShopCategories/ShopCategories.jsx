import { Link } from "react-router-dom";

export default function ShopCategories() {
  return (
    <div className="shop_categories h-full hidden md:block">
      <h3 className="font-medium pb-1 border-b text-neutral">Categories</h3>
      <ul className="mt-2">
        <li>
          <Link to={`/shop/`}>
            <img src="" alt="" className="w-5" />
            <p>category</p>
          </Link>
        </li>

        <li className="">
          <Link to={`/shop/`}>
            <img src="" alt="" className="w-5" />
            <p>category</p>
          </Link>
        </li>
        <li className="">
          <Link to={`/shop/`}>
            <img src="" alt="" className="w-5" />
            <p>category</p>
          </Link>
        </li>
        <li className="">
          <Link to={`/shop/`}>
            <img src="" alt="" className="w-5" />
            <p>category</p>
          </Link>
        </li>
        <li className="">
          <Link to={`/shop/`}>
            <img src="" alt="" className="w-5" />
            <p>category</p>
          </Link>
        </li>
        <li className="">
          <Link to={`/shop/`}>
            <img src="" alt="" className="w-5" />
            <p>category</p>
          </Link>
        </li>
        <li className="">
          <Link to={`/shop/`}>
            <img src="" alt="" className="w-5" />
            <p>category</p>
          </Link>
        </li>
        <li className="">
          <Link to={`/shop/`}>
            <img src="" alt="" className="w-5" />
            <p>category</p>
          </Link>
        </li>
        <li className="">
          <Link to={`/shop/`}>
            <img src="" alt="" className="w-5" />
            <p>category</p>
          </Link>
        </li>
        <li className="">
          <Link to={`/shop/`}>
            <img src="" alt="" className="w-5" />
            <p>category</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
