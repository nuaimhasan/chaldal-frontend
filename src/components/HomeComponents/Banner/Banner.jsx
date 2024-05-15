import SearchBox from "../../Header/SearchBox";

export default function Banner() {
  return (
    <section className="bg-yellow-300">
      <div className="w-[90%] mx-auto">
        <div className="h-60 sm:h-96 grid sm:grid-cols-2 items-center gap-10">
          <div>
            <h2 className="text-4xl font-bold">
              Grocery Delivered at your Doorstep
            </h2>
            <div className="mt-3">
              <SearchBox />
            </div>
          </div>

          <div className="hidden sm:block">
            <img
              src="/images/banner/banner_man.png"
              alt=""
              className="w-[70%] mx-auto h-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
