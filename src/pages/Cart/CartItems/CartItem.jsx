import { useEffect, useState } from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { changeQuantity, removeFromCart } from "../../../Redux/cart/cartSlice";
import { useGetProductByIdQuery } from "../../../Redux/product/productApi";

export default function CartItem({ product }) {
  const dispatch = useDispatch();
  const [stock, setStock] = useState(null);

  const { _id, image, title, discount, price, quantity, size, color } = product;
  const { data } = useGetProductByIdQuery(_id);

  useEffect(() => {
    const varients = data?.data?.varients;

    const selectedColorVarient = varients?.find(
      (varient) => varient.color === color
    );

    const selectedSizeVarient = selectedColorVarient?.info?.find(
      (varient) => varient.size === size
    );

    setStock(selectedSizeVarient?.quantity);
  }, [color, data?.data?.varients, size]);

  const discountPrice = parseInt(price - (price * discount) / 100);
  const total =
    parseInt(discount >= 1 ? discountPrice : price) * parseInt(quantity);

  const handelDeleteCartItem = (data) => {
    dispatch(removeFromCart(data));
  };

  const handelIncreaseQuantity = () => {
    if (stock > quantity) {
      dispatch(changeQuantity({ ...product, quantity: quantity + 1 }));
    } else {
      Swal.fire("", "Sorry! We don't have enough stock", "warning");
    }
  };

  const handelDecreaseQuantity = () => {
    if (quantity > 1) {
      dispatch(changeQuantity({ ...product, quantity: quantity - 1 }));
    } else {
      Swal.fire(
        "",
        "Sorry! You can't decrease quantity. You can remove it from the remove button",
        "warning"
      );
    }
  };

  return (
    <tr>
      <td className="p-3">
        <div className="w-max flex gap-2 items-center">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/products/${image}`}
            alt={title}
            className="w-10 h-10 rounded-lg"
          />
          <Link to={`/product/${_id}`} className="leading-4">
            <h3 className="text-[17px] text-neutral">
              {title.length > 30 ? `${title.slice(0, 30)}...` : title}
            </h3>
            <p className="text-neutral-content">
              {size && <small>size: {size}</small>}{" "}
              {color && <small>color: {color}</small>}
            </p>
          </Link>
        </div>
      </td>

      <td className="px-6 py-2 font-medium">
        <p className="w-max">
          {discount >= 1 ? (
            <>
              <span>৳{discountPrice}</span>
              <del className="text-xs text-neutral/80 pl-1">৳{price}</del>
            </>
          ) : (
            <span>৳ {price}</span>
          )}
        </p>
      </td>

      <td className="px-6 py-3">
        <div className="w-max flex items-center gap-3">
          <button
            onClick={handelDecreaseQuantity}
            className="text-2xl hover:text-neutral duration-200"
          >
            <FiMinusCircle />
          </button>
          <div>
            <p className="w-14 border-2 border-neutral/80 text-neutral font-medium text-center rounded-lg py-px">
              {quantity}
            </p>
          </div>
          <button
            onClick={handelIncreaseQuantity}
            className="text-2xl hover:text-neutral duration-200"
          >
            <FiPlusCircle />
          </button>
        </div>
      </td>

      <td className="px-6 py-3 font-medium">
        <p className="w-max">
          ৳<span> {total}</span>
        </p>
      </td>

      <td className="px-6 py-3">
        <button
          onClick={() => handelDeleteCartItem(product)}
          className="font-medium text-sm text-red-600 hover:underline"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
