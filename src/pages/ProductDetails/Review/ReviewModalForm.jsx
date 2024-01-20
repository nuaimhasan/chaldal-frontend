import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

export default function ReviewModalForm({ modal, setModal }) {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);


  return (
    <>
      <button
        onClick={() => setModal(false)}
        className={`modal_overlay ${modal && "modal_overlay_show"}`}
      ></button>
      <div
        className={`modal w-[95%] sm:w-[500px] p-4 ${modal && "modal_show"}`}
      >
        <div className="flex justify-between items-start">
          <div>
            <p>Product name</p>
            <p className="text-neutral-content text-sm">Rate this product</p>
          </div>
          <button
            onClick={() => setModal(false)}
            className="text-neutral-content hover:text-primary duration-200 text-lg"
          >
            <IoClose />
          </button>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-center">
            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={20}
                  onClick={() => setCurrentValue(index + 1)}
                  onMouseOver={() => setHoverValue(index + 1)}
                  onMouseLeave={()=>setHoverValue(undefined)}
                  color={
                    (hoverValue || currentValue) > index ? "#facc15" : "#a9a9a9"
                  }
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
          <div className="mt-5">
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
