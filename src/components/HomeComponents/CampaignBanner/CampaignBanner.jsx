import { Link } from "react-router-dom";
import { useGetCampaignBannersQuery } from "../../../Redux/campaignBanner/campaignBannerApi";

export default function CampaignBanner() {
  const { data, isLoading } = useGetCampaignBannersQuery();

  let content = null;
  if (isLoading) {
    content = (
      <>
        <div className="w-full h-40 sm:h-52 rounded bg-base-100 shadow"></div>{" "}
        <div className="w-full h-40 sm:h-52 rounded bg-base-100 shadow"></div>
      </>
    );
  }

  if (!isLoading && data?.data?.length > 0) {
    content = data?.data?.map((banner) => (
      <Link key={banner?._id} to={`/${banner?.link}`}>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/campaignBanner/${
            banner?.image
          }`}
          alt="Campaign Banner"
          className="w-full h-40 sm:h-52 rounded"
        />
      </Link>
    ));
  }

  return (
    <section className="pt-5">
      <div className="container">
        <div className="grid sm:grid-cols-2 gap-4">{content}</div>
      </div>
    </section>
  );
}
