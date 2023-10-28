import { Link } from "react-router-dom";

export default function Wishlist() {
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
          <tr className="border-b text-neutral/80">
            <td className="p-2">
              <div className="w-max flex gap-2 items-center">
                <img src="" alt="" className="w-10 h-10 rounded-full" />
                <Link to="">
                  <h3 className="text-neutral">Product Title</h3>
                </Link>
              </div>
            </td>

            <td className="px-6 py-2 font-medium">
              <p className="w-max">
                ৳<span> 500</span>
              </p>
            </td>

            <td className="px-6 py-2">
              <div className="w-max flex items-center gap-3">
                <button className="bg-primary text-base-100 text-sm px-4 py-1 rounded">
                  Add To Cart
                </button>
                <button className="bg-gray-600 text-base-100 text-sm px-4 py-1 rounded">
                  Delete Wishlist
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
