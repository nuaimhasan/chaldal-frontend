import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { _id, image, title, slug, price, rating, discount } = product;
  const ratingStar = Array.from({ length: 5 }, (element, index) => {
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <FaStar className="text-yellow-400" />
        ) : rating >= index + 0.5 ? (
          <FaStarHalfAlt className="text-yellow-400" />
        ) : (
          <FaStar className="text-gray-300" />
        )}
      </span>
    );
  });

  return (
    <div className="mt-4 hover:shadow-lg rounded overflow-hidden product-card duration-300">
      <Link to={`/product/${slug}/${_id}`}>
        <div className="overflow-hidden relative">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/images/products/${image}`}
            alt=""
            className="w-full h-48 sm:h-56 duration-500"
          />
          {/* Discount */}
          {discount > 0 && (
            <div className="absolute top-1 text-base-100 right-0 bg-red-600 w-max rounded-l-full px-2 py-px">
              <p>{discount}%</p>
            </div>
          )}
        </div>
        <div className="p-2">
          <h1 className="font-medium mb-1">
            {title.length > 40 ? `${title.slice(0, 40)}...` : title}
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-primary text-lg">
              ৳{parseInt(price - (price * discount) / 100)}
            </p>
            {discount > 0 && (
              <del className="text-neutral/70 text-sm ">৳{price}</del>
            )}
          </div>

          <div className="flex  text-sm text-yellow-500 mt-1">{ratingStar}</div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
