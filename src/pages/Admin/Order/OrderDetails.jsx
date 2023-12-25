import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetOrderByIdQuery } from "../../../Redux/order/orderApi";

export default function OrderDetails() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading, isError, error } = useGetOrderByIdQuery(id);

  const products = data?.data?.products;
  const subTotal = products?.reduce(
    (price, item) =>
      price +
      item.order_items.quantity *
        parseInt(item.price - (item.price * item.discount) / 100),
    0
  );

  const handleShipped = () => {
    const isConfirm = window.confirm("are you sure update order status?");
    if (isConfirm) {
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order/pendingToShipped/${id}`,
        {
          method: "PUT",
          headers: {
            authorization: `bearer ${localStorage.getItem("aesthetic_jwt")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            Swal.fire("", "status update success", "success");
            setInterval(() => {
              location.reload();
            }, 1000);
          }
        });
    }
  };

  const handleDelivered = () => {
    const isConfirm = window.confirm("are you sure update order status?");
    if (isConfirm) {
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/order/shippedToDelivered/${id}`,
        {
          method: "PUT",
          headers: {
            authorization: `bearer ${localStorage.getItem("aesthetic_jwt")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            Swal.fire("", "status update success", "success");
            setInterval(() => {
              location.reload();
            }, 1000);
          }
        });
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        {data?.data?.status === "pending" && (
          <button
            onClick={handleShipped}
            className="text-base-100 bg-gray-700 px-6 py-2 rounded mb-4 text-sm hover:bg-primary duration-300"
          >
            Process To Shipped
          </button>
        )}

        {data?.data?.status === "Shipped" && (
          <button
            onClick={handleDelivered}
            className="text-base-100 bg-gray-700 px-6 py-2 rounded mb-4 text-sm hover:bg-primary duration-300"
          >
            Complete Order
          </button>
        )}

        {data?.data?.status === "Delivered" && (
          <div className="text-base-100 px-6 py-2 rounded mb-4 text-sm bg-primary">
            Order Completed
          </div>
        )}
      </div>
      <div className="border p-4 rounded-md">
        <p className="text-lg">Order Details:</p>
        <p>Order Id: {data?.data?.id}</p>
      </div>

      <div className="mt-4 border p-4 rounded-md">
        <p className="text-lg">Shipping Details:</p>
        <div className="text-[15px] mt-1">
          <p>Name: {data?.data?.user?.name}</p>
          <p>Phone: {data?.data?.user?.phone}</p>
          <p>
            Address: {products?.length > 0 && products[0].order_items?.street},{" "}
            {products?.length > 0 && products[0].order_items?.district},{" "}
            {products?.length > 0 && products[0].order_items?.city}
          </p>
          <p></p>
        </div>
      </div>

      <div className="mt-4 border p-4 rounded-md">
        <p className="text-lg">Product Details:</p>
        <div>
          {data?.data?.products?.map((product) => (
            <div key={product?.id}>
              <div className="border rounded p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={`${
                        import.meta.env.VITE_BACKEND_URL
                      }/images/products/${product?.image}`}
                      alt=""
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <p>
                        {product?.title} * {product?.order_items?.quantity}
                      </p>
                      <p className="text-sm">
                        {product?.order_items?.size} -{" "}
                        {product?.order_items?.color}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-end gap-2">
                    <p className="text-primary font-medium">
                      ৳
                      {parseInt(
                        product?.price -
                          (product?.price * product?.discount) / 100
                      )}
                    </p>
                    {product?.discount > 0 && (
                      <del className="text-neutral/70 text-sm">
                        ৳{product?.price}
                      </del>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p>Total:</p>
                <p>
                  {product?.order_items?.city === "Dhaka"
                    ? subTotal + 80
                    : subTotal + 150}{" "}
                  tk
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
