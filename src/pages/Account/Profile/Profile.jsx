import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div>
      <div className="bg-primary/20 rounded-md lg:grid grid-cols-3 gap-6">
        <div className="bg-primary/70 rounded-md flex flex-col justify-center items-center py-4 text-base-100 font-medium">
          <img src="" alt="" className="w-24 h-24 rounded-full border" />
          <h1 className="mt-2 text-xl">Jack Ma</h1>
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-4 items-center text-center py-5">
          <div className="border-r border-neutral/50">
            <h1 className="font-medium">Total Order</h1>
            <p className="font-medium">0</p>
          </div>
          <div>
            <h1 className="font-medium">Total Wishlist</h1>
            <p className="font-medium">0</p>
          </div>
        </div>
      </div>

      <div className="mt-4 border rounded-md p-4 col-span-2">
        <h3 className="mb-2 font-medium">Personal Info</h3>
        <div>
          <div>
            <input
              type="text"
              className="w-full border outline-none rounded px-3 py-1.5 mb-4 "
              defaultValue="Jack Ma"
              disabled
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full border outline-none rounded px-3 py-1.5 mb-4 bg-gray-100"
              defaultValue="01618004406"
              disabled
            />
          </div>

          <div>
            <input
              type="email"
              className="w-full border outline-none rounded px-3 py-1.5 mb-4"
              defaultValue="jackma@gmail.com"
              disabled
            />
          </div>

          <h3 className="mb-2 font-medium">Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                className="w-full border outline-none rounded px-3 py-1.5 mb-4"
                defaultValue="State"
                disabled
              />
            </div>

            <div>
              <input
                className="w-full border outline-none rounded px-3 py-1.5 mb-4"
                defaultValue="City"
                disabled
              />
            </div>
          </div>

          <div>
            <textarea
              className="w-full border outline-none rounded px-3 py-1.5 mb-4"
              defaultValue="Full Address"
              disabled
            />
          </div>
          <div>
            <Link
              to="/account/profile/edite"
              className="block text-center bg-primary text-base-100 py-2 rounded scale-[1] hover:scale-[.99] duration-300"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
