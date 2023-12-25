import { useEffect, useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { FiHeart, FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addToCart } from "../../Redux/cart/cartSlice";

const ProductInfo = ({ product }) => {
  const {
    title,
    images,
    discount,
    brand,
    category,
    colors,
    sizes,
    totalStock,
    sellPrice,
    varients,
  } = product;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts);

  // const { wishlists, setCarts, handelAddToCart, handelAddToWishlist } =
  //   UseContext();
  // const isWishlist = wishlists?.find((item) => item.id === product.id);
  const [quantity, setQuantity] = useState(1);

  const [showImage, setShowImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    const selectedColorVarient = varients?.find(
      (varient) => varient.color === selectedColor
    );

    const selectedSizeVarient = selectedColorVarient?.info?.find(
      (varient) => varient.size === selectedSize
    );

    if (selectedSizeVarient?.quantity) {
      setSelectedStock(selectedSizeVarient?.quantity);
    } else {
      setSelectedStock(totalStock);
    }

    if (selectedSizeVarient?.price) {
      setSelectedPrice(selectedSizeVarient?.price);
    } else {
      setSelectedPrice(sellPrice);
    }
  }, [selectedSize, selectedColor, varients, totalStock, sellPrice]);

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
    if (selectedStock > quantity) {
      setQuantity(quantity + 1);
    }
  };

  useEffect(() => {
    if (selectedStock < quantity) {
      setQuantity(1);
    }
  }, [selectedStock, quantity]);

  const handelDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyNow = () => {
    if (varients?.length > 0 && !selectedSize) {
      return Swal.fire("", "Please Select Size", "warning");
    }

    if (varients?.length > 0 && !selectedColor) {
      return Swal.fire("", "Please Select Color", "warning");
    }

    const cartProduct = {
      _id: product._id,
      title: title,
      slug: product.slug,
      image: images[0],
      discount: discount,
      price: selectedPrice,
      quantity: quantity || 1,
      size: selectedSize,
      color: selectedColor,
    };

    dispatch(addToCart([cartProduct]));
    navigate("/checkout");
  };

  const handelAddToCart = () => {
    if (varients?.length > 0 && !selectedSize) {
      return Swal.fire("", "Please Select Size", "warning");
    }

    if (varients?.length > 0 && !selectedColor) {
      return Swal.fire("", "Please Select Color", "warning");
    }

    const cartProduct = {
      _id: product._id,
      title: title,
      slug: product.slug,
      image: images[0],
      discount: discount,
      price: selectedPrice,
      quantity: quantity || 1,
      size: selectedSize,
      color: selectedColor,
    };

    const findProduct = carts?.find(
      (product) =>
        product._id === cartProduct._id &&
        product.size === cartProduct.size &&
        product.color === cartProduct.color
    );

    if (findProduct) {
      return Swal.fire("", "Product already added to cart", "warning");
    } else {
      dispatch(addToCart([...carts, cartProduct]));
      Swal.fire("", "Item added to cart successfully", "success");
    }
  };

  return (
    <div className="lg:flex gap-6">
      {/* Image */}
      <div className="lg:w-[42%]">
        <div className="relative">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/products/${showImage}`}
            alt=""
            className="w-full h-[350px] rounded"
          />

          {/* Discount */}
          <div className="absolute top-1 text-base-100 right-0 bg-red-600 w-max rounded-l-full px-2 py-px">
            <p>{discount}%</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-5 gap-2">
          {images.map((img, index) => (
            <div key={index} onClick={() => setShowImage(img)}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/products/${img}`}
                alt=""
                className="w-full h-12 rounded"
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
              <span>{selectedStock}</span>
            </p>
          </div>
        </div>

        {/*  wishlist */}
        <div className="flex justify-between items-center">
          <p></p>

          <button
          // onClick={() => handelAddToWishlist(product)}
          // className={`shadow-lg p-3 rounded-full ${
          //   isWishlist && "bg-primary text-base-100"
          // }`}
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
                ৳ {parseInt(selectedPrice - (selectedPrice * discount) / 100)}
              </p>
              {discount > 0 && (
                <del className="text-neutral/70">৳{selectedPrice}</del>
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
                  className={`text-sm p-4 rounded-full border scale-[.96] hover:scale-[1] duration-300`}
                  style={{
                    backgroundColor: clr.code,
                    borderColor:
                      clr.name === selectedColor ? "#f47c20" : "#DDD",
                  }}
                ></button>
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
            onClick={handleBuyNow}
            className="w-40 bg-primary text-base-100 px-2 py-1.5 rounded scale-[.97] hover:scale-[1] duration-300"
          >
            Buy Now
          </button>

          <button
            onClick={handelAddToCart}
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
