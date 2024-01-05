import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { cities, districts } from "../../Data/location";
import { clearCart } from "../../Redux/cart/cartSlice";
import { useAddOrderMutation } from "../../Redux/order/orderApi";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";

export default function Checkout() {
  window.scroll(0, 0);
  const navigate = useNavigate();
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();
  const [addOrder, { isLoading }] = useAddOrderMutation();
  const { loggedUser } = useSelector((state) => state.user);
  const [cityDropdown, setCityDropdown] = useState(false);
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const [districtDropdown, setDistrictDropdown] = useState(false);
  const [district, setDistrict] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handelSetCity = (selectedCity) => {
    setCity(selectedCity);
    setCityDropdown(false);
    setSearchCity("");
  };

  const handelSetDistrict = (selectedDistrict) => {
    setDistrict(selectedDistrict);
    setDistrictDropdown(false);
    setSearchDistrict("");
  };

  // Remove City Dropdown click other side
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".city")) {
        setCityDropdown(false);
      }
    });
  }, []);

  // Remove District Dropdown click other side
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".district")) {
        setDistrictDropdown(false);
      }
    });
  }, []);

  // Subtotal - discount amount
  const subTotal = carts?.reduce(
    (price, item) =>
      price +
      item.quantity * parseInt(item.price - (item.price * item.discount) / 100),
    0
  );

  let shipping = 0;

  if (city !== "" && city === "Dhaka") {
    shipping = 80;
  } else if (city !== "" && city !== "Dhaka") {
    shipping = 150;
  } else {
    shipping = 0;
  }

  const tax = 0;
  const grandTotal = subTotal + tax + parseInt(shipping);

  const handelPlaceOrder = async (e) => {
    e.preventDefault();

    const form = e.target;

    const street = form.street.value;
    if (!city) {
      return alert("Please Provide Your City name");
    }
    if (!district) {
      return alert("Please Provide Your district name");
    }

    const products = [];
    carts.map((product) =>
      products.push({
        productId: product._id,
        quantity: product.quantity,
        size: product.size,
        color: product.color,
        variant: product?.variant,
      })
    );

    const order = {
      userId: loggedUser?.data?._id,
      shippingInfo: {
        city,
        district,
        street,
      },
      products,
      totalPrice: grandTotal,
    };

    const res = await addOrder(order);

    if (res?.data?.success) {
      Swal.fire("", "order success", "success");
      dispatch(clearCart());
      form.reset();
      setCity("");
      setDistrict("");
      navigate("/shops");
    } else {
      toast.error("Something Wrong");
    }
  };

  return (
    <div className="py-8">
      <div className="container">
        <form
          onSubmit={handelPlaceOrder}
          className="grid lg:grid-cols-3 gap-10 mt-6"
        >
          {/* Shipping Details */}
          <div className="lg:col-span-2">
            <div>
              <h3 className="text-lg font-semibold mb-4 uppercase">
                Shipping Details
              </h3>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3>Full name</h3>
                  <input
                    type="text"
                    name="name"
                    className="border-2 w-full p-2 mt-2 outline-none rounded"
                    required
                    defaultValue={loggedUser?.data?.name}
                  />
                </div>
                <div>
                  <h3>Phone</h3>
                  <input
                    type="number"
                    name="number"
                    className="border-2 w-full p-2 mt-2 outline-none rounded"
                    required
                    defaultValue={loggedUser?.data?.phone}
                  />
                </div>
              </div>

              <div className="text-sm mt-2">
                <div>
                  <h3>Email address</h3>
                  <input
                    type="email"
                    name="email"
                    className="border-2 w-full p-2 mt-2 outline-none rounded"
                    defaultValue={loggedUser?.data?.email}
                    disabled
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative city">
                  <div className="text-sm mt-2">
                    <h3>City</h3>

                    <div
                      onClick={() => setCityDropdown(!cityDropdown)}
                      className="p-2 h-9 border rounded mt-2 cursor-pointer"
                    >
                      {city}
                    </div>
                  </div>

                  {cityDropdown && (
                    <div className="absolute bg-base-100 border rounded top-full left-0 p-2 w-full max-h-60 overflow-y-auto">
                      <div>
                        <input
                          onChange={(e) => setSearchCity(e.target.value)}
                          type="text"
                          className="px-2 py-1 rounded w-full border outline-none placeholder:font-light"
                          placeholder="search city"
                        />
                      </div>
                      <ul>
                        {cities
                          .filter((city) =>
                            city
                              .toLowerCase()
                              .includes(searchCity.toLowerCase())
                          )
                          .map((city, i) => (
                            <li
                              key={i}
                              onClick={() => handelSetCity(city)}
                              className="p-1 hover:bg-gray-200 duration-200 cursor-pointer"
                            >
                              {city}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="relative district">
                  <div className="text-sm mt-2">
                    <h3>District</h3>
                    <div
                      onClick={() => setDistrictDropdown(!districtDropdown)}
                      className="p-2 h-9 border rounded mt-2 cursor-pointer"
                    >
                      {district}
                    </div>
                  </div>

                  {districtDropdown && (
                    <div className="absolute bg-base-100 border rounded top-full left-0 p-2 w-full max-h-60 overflow-y-auto">
                      <div>
                        <input
                          onChange={(e) => setSearchDistrict(e.target.value)}
                          type="text"
                          className="px-2 py-1 rounded w-full border outline-none placeholder:font-light"
                          placeholder="search District"
                        />
                      </div>
                      <ul>
                        {districts
                          .filter((district) =>
                            district
                              .toLowerCase()
                              .includes(searchDistrict.toLowerCase())
                          )
                          .map((district, i) => (
                            <li
                              key={i}
                              onClick={() => handelSetDistrict(district)}
                              className="p-1 hover:bg-gray-200 duration-200 cursor-pointer"
                            >
                              {district}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-sm mt-2">
                <h3>Street address</h3>
                <textarea
                  name="street"
                  rows="4"
                  placeholder="House number and street name"
                  className="border-2 w-full p-2 mt-2 outline-none rounded"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          {/* Order details */}
          <div>
            <div className="checkout-output bg-gray-50 relative p-6">
              <div className="border-b mb-4 pb-4">
                <h3 className="tetx-xl font-medium text-neutral">
                  Payment Method
                </h3>

                <ul className="text-sm text-neutral-content flex flex-col gap-1 pl-2 mt-2">
                  <li class="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="cod"
                        type="radio"
                        name="payment_method"
                        class="w-3 h-3"
                        checked={paymentMethod === "cod" && true}
                        onClick={() => setPaymentMethod("cod")}
                      />
                      <label for="cod" class="ms-2">
                        Cash On Delivery
                      </label>
                    </div>

                    <div>
                      <img src="" alt="" className="w-4 h-4" />
                    </div>
                  </li>

                  <li class="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="ssl"
                        type="radio"
                        name="payment_method"
                        class="w-3 h-3"
                        checked={paymentMethod === "ssl" && true}
                        onClick={() => setPaymentMethod("ssl")}
                      />
                      <label for="ssl" class="ms-2">
                        SSL
                      </label>
                    </div>

                    <div>
                      <img src="" alt="" className="w-4 h-4" />
                    </div>
                  </li>

                  <li class="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="amar_pay"
                        type="radio"
                        name="payment_method"
                        class="w-3 h-3"
                        checked={paymentMethod === "amar_pay" && true}
                        onClick={() => setPaymentMethod("amar_pay")}
                      />
                      <label for="amar_pay" class="ms-2">
                        Amar pay
                      </label>
                    </div>

                    <div>
                      <img src="" alt="" className="w-4 h-4" />
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                {/* <div className="flex justify-between border-b-2 pb-3 text-title font-semibold">
                  <h3>PRODUCT</h3>
                  <p>PRICE</p>
                </div> */}

                {/* Product lists */}
                {/* <ul>
                  {carts?.map((product, i) => (
                    <li
                      key={i}
                      className="flex justify-between border-b py-1.5 text-sm text-paragraph"
                    >
                      <div>
                        <h3>{product?.title}</h3>
                        <small className="text-neutral-content">
                          {product?.size && product?.size}{" "}
                          {product?.color && product?.color} ×{" "}
                          {product?.quantity}
                        </small>
                      </div>
                      <p>
                        {parseInt(
                          product?.discount >= 1
                            ? parseInt(
                                product?.price -
                                  (product?.price * product?.discount) / 100
                              )
                            : product?.price
                        ) * parseInt(product?.quantity)}
                      </p>
                    </li>
                  ))}
                </ul> */}

                <h3 className="tetx-xl font-medium text-neutral">
                  Order Summary
                </h3>

                <div className="flex justify-between border-b py-1.5 text-sm">
                  <h3>Subtotal</h3>
                  <p>
                    ৳<span>{subTotal}.00</span>
                  </p>
                </div>

                <div className="flex justify-between items-center border-b py-1.5 text-sm">
                  <h3>
                    Shipping{" "}
                    <small>
                      {city !== "" &&
                        (city === "Dhaka"
                          ? "(inside Dhaka)"
                          : "(outside Dhaka)")}
                    </small>
                  </h3>
                  <div className="text-end">
                    ৳<span>{shipping}.00</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-b py-1.5 text-sm">
                  <h3>Tax</h3>
                  <div className="text-end">
                    ৳<span>{tax}.00</span>
                  </div>
                </div>

                {/* <!-- Total --> */}
                <div className="flex justify-between border-b py-2 font-medium text-lg">
                  <h3 className="text-title">Total</h3>
                  <p className="text-primary">
                    ৳ <span>{grandTotal}.00 </span>
                  </p>
                </div>
              </div>

              {paymentMethod === "cod" ? (
                <button
                  type="submit"
                  className="w-full bg-primary text-base-100 py-2 rounded shadow flex justify-center"
                >
                  {isLoading ? <ButtonSpinner /> : "PLACE ORDER"}
                </button>
              ) : (
                <div
                  type="submit"
                  className="w-full bg-primary text-base-100 py-2 rounded shadow flex justify-center cursor-pointer"
                >
                  {isLoading ? <ButtonSpinner /> : "Payment"}
                </div>
              )}
            </div>
          </div>
        </form>

        <div className="flex justify-end"></div>
      </div>
    </div>
  );
}
