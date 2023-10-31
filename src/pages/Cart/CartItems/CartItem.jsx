import { Link } from "react-router-dom";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { UseContext } from "../../../ContextApi/ContextApi";

export default function CartItem({ product }) {
  const { handelIncreaseCart, handelDecreaseCart, handelDeleteCart } =
    UseContext();
  const { _id, image, title, slug, discount, price, quantity, size } = product;

  const discountPrice = parseInt(price - (price * discount) / 100);
  const total =
    parseInt(discount >= 1 ? discountPrice : price) * parseInt(quantity);

  return (
    <tr>
      <td className="p-3">
        <div className="w-max flex gap-2 items-center">
          <img
            src={`https://eshop-server-api.onrender.com/images/products/${image}`}
            alt={title}
            className="w-10 h-10 rounded-lg"
          />
          <Link to={`/product/${slug}/${_id}`} className="leading-3">
            <h3 className="text-[17px] text-neutral">
              {title.length > 30 ? `${title.slice(0, 30)}...` : title}{" "}
            </h3>
            {size && <small>size:{size}</small>}
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
            onClick={() => handelDecreaseCart(product)}
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
            onClick={() => handelIncreaseCart(product)}
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
          onClick={() => handelDeleteCart(product)}
          className="font-medium text-sm text-red-600 hover:underline"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
