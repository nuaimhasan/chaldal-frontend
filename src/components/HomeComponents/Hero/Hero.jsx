import CategoryLists from "../../CategoryLists/CategoryLists";

export default function Hero() {
  return (
    <section>
      <div className="container">
        <div className="lg:flex items-start gap-4">
          <div className="hidden lg:block w-[270px] border rounded-b">
            <CategoryLists />
          </div>

          <div className="hero_slider md:h-[402px] mt-2 lg:mt-0">
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
