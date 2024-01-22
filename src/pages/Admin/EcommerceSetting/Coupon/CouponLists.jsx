import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  useDeleteCouponMutation,
  useGetCouponsQuery,
} from "../../../../Redux/coupon/couponApi";
import Spinner from "../../../../components/Spinner/Spinner";
import Swal from "sweetalert2";

export default function CouponLists() {
  const { data, isLoading } = useGetCouponsQuery();
  const [deleteCoupon] = useDeleteCouponMutation();

  const handleDeleteCoupon = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this coupon?");
    if (isConfirm) {
      const res = await deleteCoupon(id);

      console.log(res);
      Swal.fire("", "Delete success", "success");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Coupon Lists</h3>
        <Link
          to="/admin/ecommerce-setting/coupons/add-coupon"
          className="primary_btn"
        >
          Add New Coupon
        </Link>
      </div>
      <div className="p-4">
        <div className="relative overflow-x-auto shadow-lg">
          <table className="dashboard_table">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Coupon Code</th>
                <th>Discount</th>
                <th>Minimum Ammount</th>
                <th>Start Date-Time</th>
                <th>End Date-Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.length > 0 &&
                data?.data?.map((coupon, i) => (
                  <tr key={coupon?._id}>
                    <td>{i + 1}</td>
                    <td>{coupon?.code}</td>
                    <td>{coupon?.discount}</td>
                    <td>{coupon?.minimumShopping}tk</td>
                    <td>
                      {coupon?.startDate}-{coupon?.startTime}
                    </td>
                    <td>
                      {coupon?.endDate}-{coupon?.endTime}
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-lg">
                        <Link
                          to={`/admin/ecommerce-setting/coupons/edit-coupon/${coupon?._id}`}
                          className="hover:text-red-500 duration-200"
                        >
                          <MdEdit />
                        </Link>
                        <button
                          onClick={() => handleDeleteCoupon(coupon?._id)}
                          className="hover:text-red-500 duration-200"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
