import CartItem from "./CartItem";

export default function CartItems({ carts }) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left">
        <thead className="uppercase border-b">
          <tr>
            <th className="px-6 py-2 text-sm font-semibold">Product</th>
            <th className="px-6 py-2 text-sm font-semibold">Price</th>
            <th className="px-6 py-2 text-sm font-semibold">QUANTITY</th>
            <th className="px-6 py-2 text-sm font-semibold">Total</th>
            <th className="px-6 py-2 text-sm font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {carts?.length > 0 ? (
            carts?.map((product, i) => <CartItem key={i} product={product} />)
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-10 font-medium">
                No Product
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
