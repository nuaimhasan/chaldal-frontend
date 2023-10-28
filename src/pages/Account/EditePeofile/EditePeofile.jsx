export default function EditePeofile() {
  return (
    <div>
      <form className="border rounded-md p-4 col-span-2">
        <div>
          <em>Profile Photo</em>
          <input
            type="file"
            className="w-full border outline-none rounded px-3 py-1.5 mb-4 "
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <em>First Name</em>
            <input
              type="text"
              className="w-full border outline-none rounded px-3 py-1.5 mb-4 "
              defaultValue="Jack Ma"
              required
            />
          </div>
          <div>
            <em>Last Name</em>
            <input
              type="text"
              className="w-full border outline-none rounded px-3 py-1.5 mb-4 "
              defaultValue="Jack Ma"
              required
            />
          </div>
        </div>

        <div>
          <em>Number</em>
          <input
            type="text"
            className="w-full border outline-none rounded px-3 py-1.5 mb-4"
            defaultValue="01618004406"
            required
          />
        </div>

        <div>
          <em>Email</em>
          <input
            type="email"
            className="w-full border outline-none rounded px-3 py-1.5 mb-4"
            defaultValue="jackma@gmail.com"
            required
            disabled
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <em>State</em>
            <input
              className="w-full border outline-none rounded px-3 py-1.5 mb-4"
              placeholder=""
            />
          </div>

          <div>
            <em>City</em>
            <input
              className="w-full border outline-none rounded px-3 py-1.5 mb-4"
              placeholder=""
            />
          </div>
        </div>

        <div>
          <em>Full Address</em>
          <textarea
            className="w-full border outline-none rounded px-3 py-1.5 mb-4"
            placeholder="Type your Full address"
          />
        </div>

        <div>
          <button
            type="submite"
            className="w-full text-center bg-primary text-base-100 py-2 rounded scale-[1] hover:scale-[.99] duration-300"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
