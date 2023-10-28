import CartItems from "./CartItems/CartItems";
import CartDetails from "./CartDetails/CartDetails";
import { UseContext } from "@/app/context/context";

export default function Cart() {
  const { carts } = UseContext();

  return (
    <div className="py-5 min-h-[60vh]">
      <div className="w-[90%] xl:w-[1280px] mx-auto">
        <p className="text-center text-xl font-medium mb-8">
          Your Cart - <span>{carts?.length ? carts.length : "0"}</span>{" "}
          {carts?.length ? (carts.length < 2 ? "Item" : "Items") : "Item"}
        </p>
        <div className="lg:flex gap-6">
          <div className="lg:w-[75%] pt-6 shadow-lg border rounded">
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
