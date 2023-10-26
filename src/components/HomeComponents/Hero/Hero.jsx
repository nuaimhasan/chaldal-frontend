import HeroCategories from "./HeroCategories/HeroCategories";

export default function Hero() {
  return (
    <section>
      <div className="container">
        <div className="lg:flex items-start gap-4">
          <div className="hidden lg:block w-[285px] border rounded-b">
            <HeroCategories />
          </div>

          <div className="hero_slider md:h-[392px] mt-2 lg:mt-0">
            <img
              src="/images/hero/hero1.jpg"
              alt=""
              className="w-full h-full rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
