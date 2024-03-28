import { Link } from "react-router-dom";

export default function TopCampaignBanner() {
  return (
    <section className="py-4">
      <div className="container">
        <div className="sm:w-3/4 mx-auto">
          <div className="w-full h-28 sm:h-40 lg:h-60 relative">
            <img
              src="/images/banner/banner.jpg"
              alt=""
              className="w-full h-full rounded"
            />

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <Link
                to="/shops"
                className="block bg-green-700 text-base-100 px-6 py-2 rounded-full text-xs sm:text-sm animate_btn"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
