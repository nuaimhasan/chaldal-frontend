import ChooseByCategory from "../../components/HomeComponents/ChooseByCategory/ChooseByCategory";
import FlashSale from "../../components/HomeComponents/FlashSale/FlashSale";
import Hero from "../../components/HomeComponents/Hero/Hero";
import Menu from "../../components/HomeComponents/Menu/Menu";
import PopularProducts from "../../components/HomeComponents/PopularProducts/PopularProducts";
import Services from "../../components/HomeComponents/Services/Services";

export default function Home() {
  return (
    <>
      <Menu />
      <Hero />
      <FlashSale />
      <ChooseByCategory />
      <PopularProducts />
      <Services />
    </>
  );
}
