import { IoClose } from "react-icons/io5";

export default function ReviewModalForm({modal,setModal}) {
  return (
    <>
      <button onClick={()=>setModal(false)} className={`modal_overlay ${modal && "modal_overlay_show"}`}></button>
      <div className={`modal w-[95%] sm:w-[500px] p-4 ${modal && "modal_show"}`}>
        <div className="flex justify-between items-start">
          <div>
            <p>Product name</p>
            <p className="text-neutral-content text-sm">Rate this product</p>
          </div>
          <button onClick={()=>setModal(false)} className="text-neutral-content hover:text-primary duration-200 text-lg">
            <IoClose />
          </button>
        </div>

        <div className="mt-4">
          <div>
            <input type="text" name="rating" className="border w-full rounded outline-none p-2 text-sm text-neutral" placeholder="your rating" />
          </div>
          <div className="mt-3">
            <textarea
              name=""
              rows="4"
              className="border w-full rounded outline-none p-2 text-sm text-neutral"
              placeholder="Type your comment..."
            ></textarea>
          </div>
        </div>

        <div className="mt-1 p-3">
          <button className="bg-primary text-base-100 px-4 py-1 rounded">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
