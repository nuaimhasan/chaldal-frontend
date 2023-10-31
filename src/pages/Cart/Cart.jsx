import CartItems from "./CartItems/CartItems";
import CartDetails from "./CartDetails/CartDetails";
import { UseContext } from "../../ContextApi/ContextApi";

export default function Cart() {
  const { carts } = UseContext();
  console.log(carts);

  return (
    <div className="py-5 min-h-[60vh]">
      <div className="container">
        <p className="text-center text-xl font-medium mb-8">
          Your Cart - <span>{carts?.length ? carts.length : "0"}</span>{" "}
          {carts?.length ? (carts.length < 2 ? "Item" : "Items") : "Item"}
        </p>
        <div className="lg:flex gap-6">
          <div className="lg:w-[75%] shadow-lg border rounded-md">
            <CartItems carts={carts} />
          </div>
          <div className="lg:w-[25%]">
            <CartDetails carts={carts} />
          </div>
        </div>
      </div>
    </div>
  );
}
