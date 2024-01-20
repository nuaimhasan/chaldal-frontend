import { useState } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteReviewMutation,
  useGetReviewsByProductIdQuery,
} from "../../../Redux/review/reviewApi";
import Pagination from "../../../components/Pagination/Pagination";
import Rating from "../../../components/Rating/Rating";
// import EditReviewModalForm from "./EditReviewModalForm";
import ReviewModalForm from "./ReviewModalForm";

export default function Reviews({ product }) {
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;

  const productId = product?._id;
  const query = {};
  query["limit"] = 5;
  query["page"] = currentPage;
  const { data } = useGetReviewsByProductIdQuery({ productId, ...query });
  const [deleteReview] = useDeleteReviewMutation();
  // console.log(data?.data);

  const pages = Math.ceil(
    parseInt(data?.meta?.total) / parseInt(data?.meta?.limit)
  );

  const handleReviewDelete = async (reviewId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirm) return;

    const data = {
      user: user?._id,
    };
    await deleteReview({ reviewId, data }).unwrap();
    Swal.fire("", "Review deleted successfully", "success");
  };

  return (
    <div>
      <div className="flex justify-between items-center border-b p-3">
        <div>
          <h1 className="text-2xl">{product?.rating?.toFixed(1) || 0}</h1>
          <Rating rating={product?.rating || 0} />

          <p className="mt-1 text-neutral-content text-sm">
            {(product?.rating * product?.reviewer).toFixed(0)} Ratings and{" "}
            {product?.reviewer} Reviews
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
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <button
                    // onClick={() => setModal(!modal)}
                    className="text-neutral-content text-lg hover:text-primary duration-200"
                  >
                    <MdEdit />
                  </button>

                  {/* <EditReviewModalForm
                    modal={modal}
                    setModal={setModal}
                    review={review}
                  /> */}

                  <button
                    onClick={() => handleReviewDelete(review?._id)}
                    className="text-lg text-neutral-content hover:text-primary duration-200 "
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* pagination */}
          <div className="p-3">
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pages={pages}
            />
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
