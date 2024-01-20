import { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import ReviewModalForm from "./ReviewModalForm";
// import { Link } from "react-router-dom";

export default function Reviews() {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center border-b p-3">
        <div>
          <h1 className="text-2xl">4.5</h1>
          <div className="flex items-center gap-1 text-xs text-yellow-400">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
          </div>
          <p className="mt-1 text-neutral-content text-sm">
            13 Ratings and 3 Reviews
          </p>
        </div>

        {/* If there is no login */}
        {/* <div className="flex items-center gap-4">
            <p>Please login to write review</p>
            <Link to="/login" className="border rounded px-4 py-1 hover:bg-primary hover:text-base-100 duration-300">Login</Link>
          </div> */}

        <div className="flex items-center gap-4">
          <p>Rate this product</p>
          <button
            onClick={() => setModal(!modal)}
            className="border border-primary text-primary rounded px-4 py-1 hover:bg-primary hover:text-base-100 duration-300 font-light"
          >
            Write a review
          </button>

          <ReviewModalForm modal={modal} setModal={setModal}/>

        </div>
      </div>

      {/* if no any review */}
      {/* <p className="text-center py-4 text-neutral-content">There have been no reviews for this product yet.</p> */}

      <div className="flex flex-col gap-2">
        <div className="border-b p-3">
          <div className="flex items-center gap-5">
            <img src="" alt="" className="w-9 h-9 rounded-full" />
            <div>
              <div className="flex items-center gap-1">
                <p>Nasim Uddin</p>
                <p className="text-neutral-content text-sm">08 Mar 2023</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
            </div>
          </div>

          <p className="mt-2.5 text-sm text-neutral-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            doloremque.
          </p>
        </div>

        <div className="border-b p-3">
          <div className="flex items-center gap-5">
            <img src="" alt="" className="w-9 h-9 rounded-full" />
            <div>
              <div className="flex items-center gap-1">
                <p>Nasim Uddin</p>
                <p className="text-neutral-content text-sm">08 Mar 2023</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
            </div>
          </div>

          <p className="mt-2.5 text-sm text-neutral-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            doloremque.
          </p>
        </div>

        <div className="border-b p-3">
          <div className="flex items-center gap-5">
            <img src="" alt="" className="w-9 h-9 rounded-full" />
            <div>
              <div className="flex items-center gap-1">
                <p>Nasim Uddin</p>
                <p className="text-neutral-content text-sm">08 Mar 2023</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
            </div>
          </div>

          <p className="mt-2.5 text-sm text-neutral-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            doloremque.
          </p>
        </div>

        {/* pagination */}
        <div className="p-3">
          <div className="flex justify-end items-center gap-1 text-sm">
            <button className="border px-3 py-1 rounded">1</button>
            <button className="border px-3 py-1 rounded">2</button>
            <button className="border px-3 py-1 rounded">next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
