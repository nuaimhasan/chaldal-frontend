import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
export const Context = createContext();

const ContextProvider = ({ children }) => {
  //----------------------- Handel wishtlist-----------------
  const localWishlist = JSON.parse(localStorage.getItem("aesthetic_wishlist"));
  const [wishlists, setWishlists] = useState(localWishlist || []);

  // Set Local Wishlist
  useEffect(() => {
    localStorage.setItem("aesthetic_wishlist", JSON.stringify(wishlists));
  }, [wishlists]);

  //------ Add Wishlist
  const handelAddToWishlist = (product) => {
    const existed = wishlists?.find((item) => item.id === product.id);
    if (existed) {
      return Swal.fire("", "Already Added Wishlist This Product", "warning");
    }

    if (!existed) {
      setWishlists([...wishlists, product]);
      toast.success("Add to Wishlist Success", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  // Handel Delete Wishlist
  const handelDeleteWishlist = (product) => {
    const confirm = window.confirm("Are you sure delete this item");
    if (confirm) {
      const newWishlist = wishlists?.filter((item) => item.id !== product.id);
      setWishlists(newWishlist);
    }
  };

  //------------------------Handel cart----------------------
  const localStorageCart = JSON.parse(localStorage.getItem("aesthetic_cart"));
  const [carts, setCarts] = useState(localStorageCart || []);

  // Set Local Cart
  useEffect(() => {
    localStorage.setItem("aesthetic_cart", JSON.stringify(carts));
  }, [carts]);

  // // Add Cart
  const handelAddToCart = ({
    product,
    quantity,
    selectedSize,
    selectedColor,
  }) => {
    if (product?.variants?.length > 0 && !selectedSize) {
      return Swal.fire("Please Select Size", "", "warning");
    }

    if (product?.variants?.length > 0 && !selectedColor) {
      return Swal.fire("Please Select Color", "", "warning");
    }

    const existed = carts?.find(
      (item) =>
        item.id === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );

    if (existed) {
      return Swal.fire(
        "Already Added This Product",
        "If you want to increase Product quantity, please go cart page and increase quantity.",
        "warning"
      );
    }

    const cartProduct = {
      id: product.id,
      title: product.title,
      image: product.image,
      discount: product.discount,
      price: product.price,
      quantity: quantity || 1,
      size: selectedSize,
      color: selectedColor,
    };
    if (!existed) {
      setCarts([...carts, { ...cartProduct }]);
      toast.success("Add to Cart Success", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  // Handel Increase Cart Quantity
  const handelIncreaseCart = (product) => {
    const existed = carts?.find(
      (item) =>
        item._id === product._id &&
        item.size === product.size &&
        item.color === product.color
    );

    if (existed) {
      setCarts(
        carts.map((item) =>
          item._id === product._id &&
          item.size === product.size &&
          item.color === product.color
            ? { ...existed, quantity: existed.quantity + 1 }
            : item
        )
      );
    }
  };

  // Handel Decrease Cart Quantity
  const handelDecreaseCart = (product) => {
    const existed = carts?.find(
      (item) =>
        item._id === product._id &&
        item.size === product.size &&
        item.color === product.color
    );

    if (existed && existed?.quantity > 1) {
      setCarts(
        carts.map((item) =>
          item._id === product._id &&
          item.size === product.size &&
          item.color === product.color
            ? { ...existed, quantity: existed.quantity - 1 }
            : item
        )
      );
    }
  };

  // Handel Delete Cart
  const handelDeleteCart = (product) => {
    const confirm = window.confirm("Are you sure delete this item");
    if (confirm) {
      const newCart = carts?.filter(
        (item) =>
          item.id !== product.id ||
          item.color !== product.color ||
          item.size !== product.size
      );

      setCarts(newCart);
    }
  };

  const contextInfo = {
    carts,
    setCarts,
    handelAddToCart,
    handelIncreaseCart,
    handelDecreaseCart,
    handelDeleteCart,
    handelAddToWishlist,
    handelDeleteWishlist,
    wishlists,
  };
  return <Context.Provider value={contextInfo}>{children}</Context.Provider>;
};

export const UseContext = () => {
  const context = useContext(Context);
  return context;
};

export default ContextProvider;
