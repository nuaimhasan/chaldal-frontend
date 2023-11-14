export default function AboutUs() {
  window.scroll(0, 0);
  return (
    <section className="py-5">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="w-max border-b-2 border-primary">
              <h2 className="text-5xl font-bold">Welcome</h2>
            </div>
            <p className="text-neutral-content mt-2 text-lg">Aesthetic cloth</p>

            <div className="mt-4 text-neutral-content text-[15px]">
              <p>
                We offer a variety of fashionable & <br /> branded
                sportswear,polo shirt,t-shirt at a very reasonable price.
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <img src="/images/about/about.avif" alt="" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
