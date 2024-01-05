import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { slug, images, title, sellingPrice, discount, variants } = product;

  return (
    <div className="mt-4 hover:shadow-lg rounded overflow-hidden product-card duration-300">
      <Link to={`/product/${slug}`}>
        <div className="overflow-hidden relative">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/products/${images[0]}`}
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
          <h1 className="font-medium mb-1 text-[15px]">
            {title.length > 35 ? `${title.slice(0, 35)}...` : title}
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-primary text-lg">
              ৳
              {variants?.length > 0
                ? parseInt(
                    variants[0]?.sellingPrice -
                      (variants[0]?.sellingPrice * discount) / 100
                  )
                : parseInt(sellingPrice - (sellingPrice * discount) / 100)}
            </p>
            {discount > 0 && (
              <del className="text-neutral/70 text-sm ">
                ৳
                {variants?.length > 0
                  ? parseInt((variants[0]?.sellingPrice * discount) / 100)
                  : parseInt((sellingPrice * discount) / 100)}
              </del>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
