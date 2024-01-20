import { Link } from "react-router-dom";

export default function CampaignBanner() {
  return (
    <section className="pt-5">
      <div className="container">
        <div className="grid sm:grid-cols-2 gap-4">
          <Link to="">
            <img src="" alt="" className="w-full h-40 sm:h-52 rounded" />
          </Link>
          <Link to="">
            <img src="" alt="" className="w-full h-40 sm:h-52 rounded" />
          </Link>
        </div>
      </div>
    </section>
  );
}
