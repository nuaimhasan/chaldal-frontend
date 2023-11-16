export default function Contact() {
  return (
    <section className="bg-base-100 shadow rounded pb-4 min-h-[86vh]">
      <div className="p-4 border-b text-neutral font-medium">
        <h3>Contact Info</h3>
      </div>
      <form className="p-4 form_group flex flex-col gap-3 md:mx-48 border rounded mt-3 text-sm">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-neutral-content">Phone</p>
            <input type="text" name="phone" />
          </div>

          <div>
            <p className="text-neutral-content">Email</p>
            <input type="email" name="email" />
          </div>
        </div>

        <div>
          <p className="text-neutral-content">Address</p>
          <textarea name="address" rows="5"></textarea>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-neutral-content">Facebook Link</p>
            <input type="text" name="facebook" />
          </div>

          <div>
            <p className="text-neutral-content">Instagram Link</p>
            <input type="text" name="instagram" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-neutral-content">Youtube Link</p>
            <input type="text" name="youtube" />
          </div>

          <div>
            <p className="text-neutral-content">Linkedin Link</p>
            <input type="text" name="linkedin" />
          </div>
        </div>

        <div className="flex justify-end">
          <button className="primary_btn">Save</button>
        </div>
      </form>
    </section>
  );
}
