import { FiHeart, FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { FaOpencart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useState } from "react";
import { UseContext } from "../../ContextApi/ContextApi";

const ProductInfo = ({ product }) => {
  const { carts, handelAddToCart } = UseContext();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const { title, image, discount, brand, category, price, sizes } = product;

  const handelIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handelDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handelSelectSize = (size) => {
    if (selectedSize === size) {
      setSelectedSize("");
    } else {
      setSelectedSize(size);
    }
  };

  // Rating number to start convert
  const ratingStar = Array.from({ length: 5 }, (element, index) => {
    return (
      <span key={index}>
        {product?.rating >= index + 1 ? (
          <FaStar className="text-yellow-400" />
        ) : product?.rating >= index + 0.5 ? (
          <FaStarHalfAlt className="text-yellow-400" />
        ) : (
          <FaStar className="text-gray-300" />
        )}
      </span>
    );
  });

  return (
    <div className="lg:flex gap-6">
      {/* Image */}
      <div className="lg:w-[42%]">
        <div className="relative">
          <img
            src={`https://eshop-server-api.onrender.com/images/products/${image}`}
            alt=""
            className="w-full h-[350px] rounded"
          />

          {/* Discount */}
          <div className="absolute top-1 text-base-100 right-0 bg-red-600 w-max rounded-l-full px-2 py-px">
            <p>{discount}%</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="lg:w-[58%] mt-4 lg:mt-0">
        {/* title  */}
        <div>
          <h1 className="text-2xl font-medium text-neutral">{title}</h1>
          <div className="text-sm">
            <p>
              <span className="text-neutral/80">Brand:</span>{" "}
              <span>{brand}</span>
            </p>
            <p>
              <span className="text-neutral/80">Category:</span>{" "}
              <span>{category}</span>
            </p>
          </div>
        </div>

        {/* rating & wishlist */}
        <div className="flex justify-between items-center">
          <div className="flex gap-px text-sm">{ratingStar}</div>

          <button className={`shadow-lg p-3 rounded-full`}>
            <FiHeart />
          </button>
        </div>

        {/* Price */}
        <div className="py-3 border-y mt-3">
          <div className="flex gap-6 items-center">
            <p className="text-neutral opacity-70">Price: </p>

            <div className="flex items-end gap-2">
              <p className="text-primary text-2xl font-medium">
                ৳{parseInt(price - (price * discount) / 100)}
              </p>
              {discount > 0 && <del className="text-neutral/70">৳{price}</del>}
            </div>
          </div>
        </div>

        {/* Size */}
        {sizes?.length > 0 && sizes[0] !== "" && (
          <div className="flex gap-4 items-center my-4">
            <p>Sizes :</p>

            <div className="flex gap-2 items-center">
              {sizes[0].split(",")?.map((size) => (
                <button
                  key={size}
                  onClick={() => handelSelectSize(size)}
                  className={`${
                    size === selectedSize && "bg-primary text-base-100"
                  } text-[15px] py-1.5 px-2.5 rounded border scale-[.96] hover:scale-[1] hover:border-primary duration-300`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="py-3 flex gap-4 items-center border-y">
          <h3>Quantity: </h3>

          <div className="flex gap-2">
            <button
              onClick={handelDecrease}
              className="text-2xl hover:text-neutral duration-200"
            >
              <FiMinusCircle />
            </button>
            <div>
              <p className="w-10 font-semibold text-center">{quantity}</p>
            </div>
            <button
              onClick={handelIncrease}
              className="text-2xl hover:text-neutral duration-200"
            >
              <FiPlusCircle />
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 items-center mt-6">
          <button
            onClick={() =>
              handelAddToCart({
                product,
                selectedSize,
                quantity,
              })
            }
            className="w-40 bg-primary text-base-100 px-2 py-1.5 rounded flex items-center gap-1 justify-center scale-[.97] hover:scale-[1] duration-300"
          >
            <FaOpencart />
            Add To Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
