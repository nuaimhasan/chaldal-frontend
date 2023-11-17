import { useEffect } from "react";
import {
  useGetContactQuery,
  useUpdateContactMutation,
} from "../../../Redux/contact/contactApi";
import Spinner from "../../../components/Spinner/Spinner";
import Swal from "sweetalert2";

export default function Contact() {
  const { data, isLoading, isError, error } = useGetContactQuery();
  const [
    updateContact,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
    },
  ] = useUpdateContactMutation();

  const handleUpdateContact = (e) => {
    e.preventDefault();
    const form = e.target;
    const phone = form.phone.value;
    const email = form.email.value;
    const address = form.address.value;
    const facebookLink = form.facebook.value;
    const instagramLink = form.instagram.value;
    const youtubeLink = form.youtube.value;
    const linkedinLink = form.linkedin.value;

    const contactInfo = {
      phone,
      email,
      address,
      facebookLink,
      instagramLink,
      youtubeLink,
      linkedinLink,
    };
    let id = data?.data?.id;
    updateContact({ id, contactInfo });
  };

  useEffect(() => {
    if (updateSuccess) {
      Swal.fire("", "Update Success", "success");
    }
    if (updateError) {
      Swal.fire("", "Somethin Wrong, please try again", "error");
    }
  }, [updateSuccess, updateError]);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return (
      <p>
        {error?.data?.message ? error?.data?.message : "something went wrong"}
      </p>
    );
  }

  return (
    <section className="bg-base-100 shadow rounded pb-4 min-h-[86vh]">
      <div className="p-4 border-b text-neutral font-medium">
        <h3>Contact Info</h3>
      </div>
      <form
        onSubmit={handleUpdateContact}
        className="p-4 form_group flex flex-col gap-3 md:mx-48 border rounded mt-3 text-sm"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-neutral-content">Phone</p>
            <input type="text" name="phone" defaultValue={data?.data?.phone} />
          </div>

          <div>
            <p className="text-neutral-content">Email</p>
            <input type="email" name="email" defaultValue={data?.data?.email} />
          </div>
        </div>

        <div>
          <p className="text-neutral-content">Address</p>
          <textarea
            name="address"
            rows="5"
            defaultValue={data?.data?.address}
          ></textarea>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-neutral-content">Facebook Link</p>
            <input
              type="text"
              name="facebook"
              defaultValue={data?.data?.facebookLink}
            />
          </div>

          <div>
            <p className="text-neutral-content">Instagram Link</p>
            <input
              type="text"
              name="instagram"
              defaultValue={data?.data?.instagramLink}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-neutral-content">Youtube Link</p>
            <input
              type="text"
              name="youtube"
              defaultValue={data?.data?.youtubeLink}
            />
          </div>

          <div>
            <p className="text-neutral-content">Linkedin Link</p>
            <input
              type="text"
              name="linkedin"
              defaultValue={data?.data?.linkedinLink}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            disabled={updateLoading && "disabled"}
            className="primary_btn"
          >
            {updateLoading ? "Loading" : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
