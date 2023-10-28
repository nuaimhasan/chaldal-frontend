import Link from "next/link";
import Image from "next/image";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { UseContext } from '@/app/context/context';

export default function CartItem({ product }) {
  const { handelIncreaseCart,handelDecreaseCart,handelDeleteCart } = UseContext();
  const {thumbnail, title, slug, discountPercentage, price, quantity, size, color} = product;

  const discountPrice = parseInt(price - (price * discountPercentage) / 100);
  const total =
    parseInt(discountPercentage >= 1 ? discountPrice : price) *
    parseInt(quantity);

  return (
    <tr>
      <td className="p-4">
        <div className="w-max flex gap-2 items-center">
          <td className="p-4 ">
            <div className="w-max flex gap-2 items-center">
              <Image
                src={thumbnail}
                alt={title}
                className="w-14 h-14 rounded-full"
                width={500}
                height={500}
              />
              <Link href={`/products/${slug}`} className="leading-3">
                <h3 className="text-lg text-neutral">
                 {title.length > 30 ? `${title.slice(0, 30)}...` : title}{" "}
                </h3>
                {size && <small>size:{size}</small>}
                {color && <small> color:{color}</small>}
              </Link>
            </div>
          </td>
        </div>
      </td>

      <td className="px-6 py-4 font-medium">
        <p className="w-max">
          {discountPercentage >= 1 ? (
            <>
              <span>৳{discountPrice}</span>
              <del className="text-xs text-neutral/80 pl-1">
                ৳{price}
              </del>
            </>
          ) : (
            <span>৳ {price}</span>
          )}
        </p>
      </td>

      <td className="px-6 py-4">
        <div className="w-max flex items-center gap-3">
          <button onClick={()=>handelDecreaseCart(product)} className="text-2xl hover:text-neutral duration-200">
            <FiMinusCircle />
          </button>
          <div>
            <p className="w-14 border-2 border-neutral/80 text-neutral font-medium text-center rounded-lg py-px">
              {quantity}
            </p>
          </div>
          <button onClick={()=>handelIncreaseCart(product)} className="text-2xl hover:text-neutral duration-200">
            <FiPlusCircle />
          </button>
        </div>
      </td>

      <td className="px-6 py-4 font-medium">
        <p className="w-max">
          ৳<span> {total}</span>
        </p>
      </td>

      <td className="px-6 py-4">
        <button onClick={()=>handelDeleteCart(product)} className="font-medium text-sm text-red-600 hover:underline">
          Remove
        </button>
      </td>
    </tr>
  );
}
