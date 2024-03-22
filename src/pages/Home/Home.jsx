import CampaignBanner from "../../components/HomeComponents/CampaignBanner/CampaignBanner";
import CategoryWaysProducts from "../../components/HomeComponents/CategoryWaysProducts/CategoryWaysProducts";
import ChooseByCategory from "../../components/HomeComponents/ChooseByCategory/ChooseByCategory";
import FeaturedProducts from "../../components/HomeComponents/FeaturedProducts/FeaturedProducts";
import Hero from "../../components/HomeComponents/Hero/Hero";
import Menu from "../../components/HomeComponents/Menu/Menu";
import MobileCategories from "../../components/HomeComponents/MobileCategories/MobileCategories";
import PopularProducts from "../../components/HomeComponents/PopularProducts/PopularProducts";
import Services from "../../components/HomeComponents/Services/Services";

export default function Home() {
  window.scroll(0, 0);
  return (
    <>
      <Menu />
      <Hero />
      <MobileCategories />
      <FeaturedProducts />
      <ChooseByCategory />
      <CampaignBanner />
      <PopularProducts />
      <CategoryWaysProducts />
      <Services />
    </>
  );
}
