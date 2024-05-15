import Banner from "../../components/HomeComponents/Banner/Banner";
import CampaignBanner from "../../components/HomeComponents/Campaign/CampaignBanner/CampaignBanner";
import TopCampaignBanner from "../../components/HomeComponents/Campaign/TopCampaignBanner/TopCampaignBanner";
import CategoryWaysProducts from "../../components/HomeComponents/CategoryWaysProducts/CategoryWaysProducts";
import ChooseByBrand from "../../components/HomeComponents/ChooseByBrand/ChooseByBrand";
import FeaturedProducts from "../../components/HomeComponents/FeaturedProducts/FeaturedProducts";
import FlashSale from "../../components/HomeComponents/FlashSale/FlashSale";
import MobileCategories from "../../components/HomeComponents/MobileCategories/MobileCategories";
import Services from "../../components/HomeComponents/Services/Services";

export default function Home() {
  window.scroll(0, 0);
  return (
    <>
      <Banner />
      <Services />
      <MobileCategories />
      <ChooseByBrand />
      <FlashSale />
      <TopCampaignBanner />
      <FeaturedProducts />
      <CampaignBanner />
      <CategoryWaysProducts />
    </>
  );
}
