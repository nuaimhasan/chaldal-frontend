import { Link } from "react-router-dom";
import { UseContext } from "../../../ContextApi/ContextApi";

export default function Wishlist() {
  const { wishlists, handelDeleteWishlist } = UseContext();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="uppercase border-b text-sm text-neutral/90">
          <tr>
            <th className="px-6 py-3 font-semibold">Product</th>
            <th className="px-6 py-3 font-semibold">Price</th>
            <th className="px-6 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {wishlists?.map((product) => (
            <tr key={product?._id} className="border-b text-neutral/80">
              <td className="p-2">
                <div className="w-max flex gap-2 items-center">
                  <img src="" alt="" className="w-10 h-10 rounded-full" />
                  <Link to={`/product/${product?.slug}/${product._id}`}>
                    <h3 className="text-neutral">
                      {product?.title?.length > 40
                        ? product?.title.slice(0, 40) + "..."
                        : product?.title}
                    </h3>
                  </Link>
                </div>
              </td>

              <td className="px-6 py-2 font-medium">
                <p className="w-max">
                  ৳<span> {product?.price}</span>
                </p>
              </td>

              <td className="px-6 py-2">
                <button
                  onClick={() => handelDeleteWishlist(product)}
                  className="bg-gray-600 text-base-100 text-sm px-4 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
