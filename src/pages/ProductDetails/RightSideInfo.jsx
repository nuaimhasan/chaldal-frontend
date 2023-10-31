import { CiDeliveryTruck } from "react-icons/ci";
import { GiTakeMyMoney } from "react-icons/gi";
import { GrShieldSecurity } from "react-icons/gr";

const RightSideInfo = ({ service }) => {
  return (
    <>
      {/* Delivery */}
      <div className="border-b pb-3 mb-3">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-base font-medium">Delivery</h1>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <CiDeliveryTruck className="text-2xl" />
            <div>
              <h3>Standard Delivery</h3>
              <p className="text-neutral/80 text-xs">2 - 3 days (in Dhaka)</p>
            </div>
          </div>

          <p className="text-black font-semibold">৳80</p>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2">
            <CiDeliveryTruck className="text-2xl" />
            <div>
              <h3>Standard Delivery</h3>
              <p className="text-neutral/80 text-xs">
                3 - 5 days (outside Dhaka)
              </p>
            </div>
          </div>

          <p className="text-black font-semibold">৳150</p>
        </div>

        <div className="flex gap-2 items-center mt-3">
          <GiTakeMyMoney className="text-2xl" />
          <div>
            <h3>Cash on Delivery Available</h3>
          </div>
        </div>
      </div>

      {/* Service */}
      <div className="border-b pb-4 mb-3">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-base font-medium">Service</h1>
        </div>

        <div className="flex gap-2 items-center mt-3">
          <GrShieldSecurity className="text-xl opacity-70" />
          <div>
            <h2>{service}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSideInfo;
