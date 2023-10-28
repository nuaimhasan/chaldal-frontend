import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = (loginInfo) => {
    setLoading(true);

    fetch("https://eshop-server-api.vercel.app/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data?.success) {
          setLoginError(data.message);
        }
        if (data?.success) {
          toast.success("Login Success");
          localStorage.setItem("eshop_jwt", data?.data?.token);
          fetch("https://eshop-server-api.vercel.app/v1/user/me", {
            headers: {
              authorization: `bearer ${localStorage.getItem("eshop_jwt")}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data?.success) {
                setLoggedUser(data);
              }
            });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Get Logged user
  useEffect(() => {
    fetch("https://eshop-server-api.vercel.app/v1/user/me", {
      headers: {
        authorization: `bearer ${localStorage.getItem("eshop_jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setLoggedUser(data);
        }
      });
  }, []);

  //------- Handel cart
  const localStorageCart = JSON.parse(localStorage.getItem("eshop_cart"));
  const [carts, setCarts] = useState([]);

  // Set Local Cart
  useEffect(() => {
    localStorage.setItem("eshop_cart", JSON.stringify(carts));
  }, [carts]);

  // // Add Cart
  const handelAddToCart = ({
    product,
    quantity,
    selectedSize,
    selectedColor,
  }) => {
    if (product.size.length > 0 && !selectedSize) {
      return Swal.fire("Please Select Size", "", "warning");
    }

    if (product.color.length > 0 && !selectedColor) {
      return Swal.fire("Please Select Color", "", "warning");
    }

    const existed = carts?.find(
      (item) =>
        item._id === product._id &&
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
      _id: product._id,
      title: product.title,
      slug: product.slug,
      thumbnail: product.thumbnail,
      discountPercentage: product.discountPercentage,
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
          item._id === product._id &&
          (product.color === ""
            ? item.color === product.color
            : item.color !== product.color) &&
          (product.size === ""
            ? item.size === product.size
            : item.size !== product.size)
      );

      setCarts(newCart);
    }
  };

  const contextInfo = {
    loggedUser,
    setLoggedUser,
    login,
    loginError,
    loading,
    carts,
    handelAddToCart,
    handelIncreaseCart,
    handelDecreaseCart,
    handelDeleteCart,
  };
  return <Context.Provider value={contextInfo}>{children}</Context.Provider>;
};

export const UseContext = () => {
  const context = useContext(Context);
  return context;
};

export default ContextProvider;
