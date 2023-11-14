import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { UseContext } from "../../ContextApi/ContextApi";
import { cities, districts } from "../../Data/location";
import ButtonSpinner from "../../components/ButtonSpinner/ButtonSpinner";
import { useSelector } from "react-redux";

export default function Checkout() {
  window.scroll(0, 0);
  const { carts, setCarts } = UseContext();
  const { loggedUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const [cityDropdown, setCityDropdown] = useState(false);
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const [districtDropdown, setDistrictDropdown] = useState(false);
  const [district, setDistrict] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");

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

  const handelPlaceOrder = (e) => {
    e.preventDefault();

    setLoading(true);

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
      products.push({ productId: product.uuid, quantity: product.quantity })
    );

    const order = {
      userId: loggedUser?.data?.uuid,
      city,
      district,
      street,
      products,
    };

    fetch(`${import.meta.env.VITE_BACKEND_URL}/order/post-order`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status) {
          setCarts([]);
          form.reset();
          setCity("");
          setDistrict("");
          Swal.fire("success", data?.message, "success");
        } else {
          toast.error("Something Wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
            <div className="checkout-output bg-gray-100 relative p-6">
              <h3 className="text-xl font-semibold text-center mb-4">
                YOUR ORDER
              </h3>

              <div>
                <div className="flex justify-between border-b-2 pb-3 text-title font-semibold">
                  <h3>PRODUCT</h3>
                  <p>PRICE</p>
                </div>

                {/* Product lists */}
                <ul>
                  {carts?.map((product, i) => (
                    <li
                      key={i}
                      className="flex justify-between border-b py-1.5 text-sm text-paragraph"
                    >
                      <h3>
                        {product?.title} -{product?.size && product?.size}{" "}
                        {product?.color && product?.color} × {product?.quantity}
                      </h3>
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
                </ul>

                <div className="flex justify-between border-b py-1.5 font-semibold text-[15px]">
                  <h3>Subtotal</h3>
                  <p>
                    ৳<span>{subTotal}.00</span>
                  </p>
                </div>

                <div className="flex justify-between items-center border-b py-1.5">
                  <h3 className="text-[15px]">
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

                <div className="flex justify-between items-center border-b py-1.5">
                  <h3 className="text-[15px]">Tax</h3>
                  <div className="text-end">
                    ৳<span>{tax}.00</span>
                  </div>
                </div>

                {/* <!-- Total --> */}
                <div className="flex justify-between border-b py-3 font-semibold text-lg">
                  <h3 className="text-title">Total</h3>
                  <p className="text-primary">
                    ৳ <span>{grandTotal}.00 </span>
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-base-100 py-2 rounded shadow flex justify-center"
              >
                {loading ? <ButtonSpinner /> : "PLACE ORDER"}
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-end"></div>
      </div>
    </div>
  );
}
