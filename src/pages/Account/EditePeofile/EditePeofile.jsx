import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function EditePeofile() {
  window.scroll(0, 0);
  const { loggedUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const { uuid, name, phone, email, city, district, street } = loggedUser?.data;

  const handleEditProfile = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const city = form.city.value;
    const district = form.district.value;
    const street = form.street.value;

    const userInfo = {
      name,
      phone,
      city,
      district,
      street,
    };

    setLoading(true);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/user/update/info/${uuid}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("aesthetic_jwt")}`,
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          Swal.fire("Update success", "", "success");
          location.reload();
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleEditProfile}
        className="border rounded-md p-4 col-span-2"
      >
        <div>
          <p>Full Name</p>
          <input
            type="text"
            className="w-full border outline-none rounded px-3 py-1.5 mb-4 "
            defaultValue={name}
            name="name"
            required
          />
        </div>

        <div>
          <p>Number</p>
          <input
            type="text"
            className="w-full border outline-none rounded px-3 py-1.5 mb-4"
            defaultValue={phone}
            name="phone"
            required
          />
        </div>

        <div>
          <p>Email</p>
          <input
            type="pail"
            className="w-full border outline-none rounded px-3 py-1.5 mb-4"
            defaultValue={email}
            required
            disabled
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>City</p>
            <input
              className="w-full border outline-none rounded px-3 py-1.5 mb-4"
              defaultValue={city}
              name="city"
            />
          </div>

          <div>
            <p>District</p>
            <input
              className="w-full border outline-none rounded px-3 py-1.5 mb-4"
              defaultValue={district}
              name="district"
            />
          </div>
        </div>

        <div>
          <p>Full Address</p>
          <textarea
            className="w-full border outline-none rounded px-3 py-1.5 mb-4"
            defaultValue={street}
            name="street"
          />
        </div>

        <div>
          <button
            type="submite"
            className="w-full text-center bg-primary text-base-100 py-2 rounded scale-[1] hover:scale-[.99] duration-300"
            disabled={loading && "disabled"}
          >
            {loading ? "Loading..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
