const img = "https://media.istockphoto.com/id/1322677667/photo/colorful-tie-die-tshirt-on-wooden-background-fashion-summer.webp?b=1&s=170667a&w=0&k=20&c=cRcr8Xy2zQgVtQUUdZ_rfGTUcYQ3bN7QSyCY_QBsGqk=";

const OrderDetailsPage = () => {
  return (
    <div className="p-4">
      <h1 className="font-semibold text-2xl">
        Order <span className="text-primary">#600734770046582</span>
      </h1>
      <p className="text-xs text-neutral/70">Placed on 29 Jan 2019 00:35:39</p>

      {/* product */}
      <div className="flex items-center my-10 shadow-lg py-5 w-80">
        <div className="flex items-center gap-4">
          <img src={img} alt="product" className="w-32" />
          <div className="flex flex-col gap-y-1">
            <p className="text-base font-semibold">Apple Watch</p>
            <p className="text-xs">Brand: Apple</p>
            <p className="text-xs">Category: smartphones</p>
            <p className="text-sm text-primary">৳ 299</p>
            <p className="text-sm">Qty: 1</p>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mt-4">
        <div className="w-1/2">
          <h2 className="font-semibold text-lg">Delivery Address</h2>
          <p className="text-sm">Hart Hagerty</p>
          <p className="text-sm">hart@example.com</p>
          <p className="text-sm">+1 631 805 9392</p>
          <p className="text-sm">
            1st Floor, House 40, Road 7, Block C, Niketan, Gulshan
          </p>
          <p className="text-sm">Dhaka, Bangladesh</p>
        </div>
        <div className="w-1/2">
          <h2 className="font-semibold text-lg">Payment Method</h2>
          <p className="text-sm">Cash on Delivery</p>
          <p className="text-sm">Subtotal: ৳ 1,000</p>
          <p className="text-sm">Shipping Fee: ৳ 50</p>
          <p className="text-sm">Total: ৳ 1,050</p>
          <p className="text-sm">Payment Status: Paid</p>
          <p className="text-sm">Payment Method: Cash on Delivery</p>
          <p className="text-sm">Payment Date: 29 Jan 2019 00:35:39</p>
        </div>
      </div>
      <div className="flex space-x-4 mt-4">
        <div className="w-1/2">
          <h2 className="font-semibold text-lg">Delivery Method</h2>
          <p className="text-sm">Standard Delivery</p>
        </div>
        <div className="w-1/2">
          <h2 className="font-semibold text-lg">Order Status</h2>
          <p className="text-sm">Delivered</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
