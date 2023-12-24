import { useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { FiHeart, FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UseContext } from "../../ContextApi/ContextApi";

const ProductInfo = ({ product }) => {
  const navigate = useNavigate();
  const { wishlists, setCarts, handelAddToCart, handelAddToWishlist } =
    UseContext();
  const isWishlist = wishlists?.find((item) => item.id === product.id);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showColor, setShowColor] = useState(product?.images[0]);
  console.log(showColor);

  const {
    title,
    images,
    discount,
    brand,
    category,
    colors,
    sizes,
    stock,
    sellPrice,
    varients,
  } = product;

  // const totalQuantity = variants?.reduce(
  //   (total, item) => total + parseInt(item.quantity),
  //   0
  // );

  const handelSelectSize = (size) => {
    if (selectedSize === size) {
      setSelectedSize("");
    } else {
      setSelectedSize(size);
    }
  };

  const handelColorSelect = (clr) => {
    if (selectedColor === clr.name) {
      setSelectedColor("");
    } else {
      setSelectedColor(clr.name);
    }
  };

  const handelIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handelDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // const handleBuyNow = () => {
  //   if (variants?.length > 0 && !selectedSize) {
  //     return Swal.fire("Please Select Size", "", "warning");
  //   }

  //   if (variants?.length > 0 && !selectedColor) {
  //     return Swal.fire("Please Select Color", "", "warning");
  //   }

  //   const selectedVariant = variants?.find(
  //     (variant) =>
  //       variant.size == selectedSize && variant.colorName == selectedColor
  //   );

  //   if (!selectedVariant || selectedVariant.quantity < quantity) {
  //     return Swal.fire("", "stock not available", "error");
  //   }

  //   const cartProduct = {
  //     id: product.id,
  //     title: product.title,
  //     image: product.image,
  //     discount: product.discount,
  //     price: product.price,
  //     quantity: quantity || 1,
  //     size: selectedSize,
  //     color: selectedColor,
  //   };

  //   setCarts([cartProduct]);
  //   navigate("/checkout");
  // };

  return (
    <div className="lg:flex gap-6">
      {/* Image */}
      <div className="lg:w-[42%]">
        <div className="relative">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/products/${showColor}`}
            alt=""
            className="w-full h-[350px] rounded"
          />

          {/* Discount */}
          <div className="absolute top-1 text-base-100 right-0 bg-red-600 w-max rounded-l-full px-2 py-px">
            <p>{discount}%</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div key={index} onClick={() => setShowColor(img)}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/products/${img}`}
                alt=""
                className="h-12 rounded"
              />
            </div>
          ))}
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
              <span>{brand ? brand : "No Brand"}</span>
            </p>
            <p>
              <span className="text-neutral/80">Category:</span>{" "}
              <span>{category}</span>
            </p>
            <p>
              <span className="text-neutral/80">Available Stock:</span>{" "}
              <span>{stock}</span>
            </p>
          </div>
        </div>

        {/*  wishlist */}
        <div className="flex justify-between items-center">
          <p></p>

          <button
            onClick={() => handelAddToWishlist(product)}
            className={`shadow-lg p-3 rounded-full ${
              isWishlist && "bg-primary text-base-100"
            }`}
          >
            <FiHeart />
          </button>
        </div>

        {/* Price */}
        <div className="py-3 border-y mt-3">
          <div className="flex gap-6 items-center">
            <p className="text-neutral opacity-70">Price: </p>

            <div className="flex items-end gap-2">
              <p className="text-primary text-2xl font-medium">
                ৳{parseInt(sellPrice - (sellPrice * discount) / 100)}
              </p>
              {discount > 0 && (
                <del className="text-neutral/70">৳{sellPrice}</del>
              )}
            </div>
          </div>
        </div>

        {/* Variants */}
        {sizes?.length > 0 && (
          <div className="flex gap-4 items-center my-4">
            <p>Size :</p>

            <div className="flex gap-2 items-center">
              {sizes?.map((size) => (
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

        {colors?.length > 0 && (
          <div className="flex gap-4 items-center my-4">
            <p>Color :</p>

            <div className="flex gap-2 items-center">
              {colors?.map((clr) => (
                <button
                  key={clr._id}
                  onClick={() => handelColorSelect(clr)}
                  className={`text-sm py-1.5 px-2.5 rounded border scale-[.96] hover:scale-[1] duration-300`}
                  style={{
                    backgroundColor:
                      clr.name === selectedColor ? "#f47c20" : clr.code,
                    borderColor: clr.code,
                    color: clr.name === selectedColor ? "#FFF" : "#020617",
                  }}
                >
                  {clr.name}
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
        <div className="flex gap-3 items-center mt-6">
          <button
            // onClick={handleBuyNow}
            className="w-40 bg-primary text-base-100 px-2 py-1.5 rounded scale-[.97] hover:scale-[1] duration-300"
          >
            Buy Now
          </button>

          <button
            onClick={() =>
              handelAddToCart({
                product,
                quantity,
                selectedSize: selectedSize,
                selectedColor: selectedColor,
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
