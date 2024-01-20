import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteReviewMutation,
  useGetReviewsQuery,
} from "../../../Redux/review/reviewApi";
import Rating from "../../../components/Rating/Rating";
import ReviewModalForm from "./ReviewModalForm";

export default function Reviews({ product }) {
  const [modal, setModal] = useState(false);

  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;

  const productId = product?._id;
  const { data } = useGetReviewsQuery(productId);
  const [deleteReview] = useDeleteReviewMutation();
  // console.log(data?.data);

  const handleReviewDelete = async (reviewId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirm) return;

    const data = {
      user: user?._id,
    }
    await deleteReview({reviewId, data}).unwrap();
    Swal.fire("", "Review deleted successfully", "success");
  };

  return (
    <div>
      <div className="flex justify-between items-center border-b p-3">
        <div>
          <h1 className="text-2xl">{product?.rating?.toFixed(1) || 0}</h1>
          <Rating rating={product?.rating || 0} />

          <p className="mt-1 text-neutral-content text-sm">
            13 Ratings and 3 Reviews
          </p>
        </div>

        {user && user?._id ? (
          <div className="flex items-center gap-4">
            <p>Rate this product</p>
            <button
              onClick={() => setModal(!modal)}
              className="border border-primary text-primary rounded px-4 py-1 hover:bg-primary hover:text-base-100 duration-300 font-light"
            >
              Write a review
            </button>

            <ReviewModalForm
              modal={modal}
              setModal={setModal}
              product={product}
              user={user}
            />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <p>Please login to write review</p>
            <Link
              to="/login"
              className="border rounded px-4 py-1 hover:bg-primary hover:text-base-100 duration-300"
            >
              Login
            </Link>
          </div>
        )}
      </div>

      {data?.data && data?.data?.length > 0 ? (
        <div className="flex flex-col gap-2">
          {data?.data?.map((review) => (
            <div key={review?._id} className="border-b p-3 relative">
              <div className="flex items-center gap-5">
                <img
                  src={
                    user?.image === "" || user?.image === null
                      ? "/images/demo_user.jpg"
                      : `${import.meta.env.VITE_BACKEND_URL}/user/${
                          user?.image
                        }`
                  }
                  alt=""
                  className="w-9 h-9 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <p>{review?.user?.name}</p>
                    <p className="text-neutral-content text-sm">
                      {review?.createdAt?.split("T")[0]}
                    </p>
                  </div>
                  <Rating rating={review?.rating} />
                </div>
              </div>

              <p className="mt-2.5 text-sm text-neutral-content">
                {review?.description}
              </p>

              {review?.user?._id === user?._id && (
                <button
                  onClick={() => handleReviewDelete(review?._id)}
                  className="text-sm text-neutral-content hover:text-primary duration-200 absolute top-3 right-3 cursor-pointer"
                >
                  <MdDeleteOutline className="text-lg" />
                </button>
              )}
            </div>
          ))}

          {/* pagination */}
          <div className="p-3">
            <div className="flex justify-end items-center gap-1 text-sm">
              <button className="border px-3 py-1 rounded">1</button>
              <button className="border px-3 py-1 rounded">2</button>
              <button className="border px-3 py-1 rounded">next</button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center py-4 text-neutral-content">
          There have been no reviews for this product yet.
        </p>
      )}
    </div>
  );
}
