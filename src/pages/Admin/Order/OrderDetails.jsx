import { useParams } from "react-router-dom";
import { useGetOrderQuery } from "../../../Redux/order/orderApi";

export default function OrderDetails() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading, isError, error } = useGetOrderQuery(id);
  console.log(data?.data);
  return (
    <div>
      <div className="border p-4 rounded-md">
        <p className="text-lg">Order Details:</p>
        <p>Order Id: {data?.data?._id}</p>
      </div>

      <div className="mt-4 border p-4 rounded-md">
        <p className="text-lg">Shipping Details:</p>
        <p>
          Address: {data?.data?.sippingAddress?.street},{" "}
          {data?.data?.sippingAddress?.district},{" "}
          {data?.data?.sippingAddress?.city}
        </p>
      </div>

      <div className="mt-4 border p-4 rounded-md">
        <p className="text-lg">Product Details:</p>
        <p>
          {data?.data?.products?.map((product) => (
            <div>
              <p>{product?.title}</p>
            </div>
          ))}
        </p>
      </div>
    </div>
  );
}
