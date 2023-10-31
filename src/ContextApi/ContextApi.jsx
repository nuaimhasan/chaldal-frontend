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

  const logout = () => {
    setLoggedUser(null);
    localStorage.removeItem("eshop_jwt");
  };

  //------- Handel cart
  const localStorageCart = JSON.parse(localStorage.getItem("eshop_cart"));
  const [carts, setCarts] = useState(localStorageCart || []);

  // Set Local Cart
  useEffect(() => {
    localStorage.setItem("eshop_cart", JSON.stringify(carts));
  }, [carts]);

  // // Add Cart
  const handelAddToCart = ({ product, quantity, selectedSize }) => {
    if (product.sizes.length > 0 && product?.sizes[0] !== "" && !selectedSize) {
      return Swal.fire("Please Select Size", "", "warning");
    }
    const existed = carts?.find(
      (item) => item._id === product._id && item.size === selectedSize
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
      image: product.image,
      discount: product.discount,
      price: product.price,
      quantity: quantity || 1,
      size: selectedSize,
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
      (item) => item._id === product._id && item.size === product.size
    );

    if (existed) {
      setCarts(
        carts.map((item) =>
          item._id === product._id && item.size === product.size
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
        (item) => item._id !== product._id || item.size !== product.size
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
    logout,
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
