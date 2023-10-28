export default function AboutUs() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="w-max border-b-2 border-primary">
              <h2 className="text-5xl font-bold">Welcome</h2>
              <p className="text-neutral-content">
                Lorem ipsum dolor sit amet.
              </p>
            </div>

            <div className="mt-4 text-neutral-content text-[15px]">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
                et quam impedit voluptatibus eius architecto modi ipsum. Aliquid
                in eaque voluptate veritatis cupiditate id consequuntur, hic
                placeat tempora incidunt sed quidem deleniti possimus temporibus
                eum ducimus reiciendis iure atque quo? A quaerat ullam ad
                voluptas commodi illum id? Fugiat, odio?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
                et quam impedit voluptatibus eius architecto modi ipsum. Aliquid
                in eaque voluptate veritatis cupiditate id consequuntur.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
                et quam impedit voluptatibus eius architecto modi ipsum. Aliquid
                in eaque voluptate veritatis cupiditate id consequuntur.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
                et quam impedit voluptatibus eius architecto modi ipsum. Aliquid
                in eaque voluptate veritatis cupiditate id consequuntur.
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dignissimos adipisci aperiam harum excepturi facere
                necessitatibus quidem porro dolorum molestiae corrupti, ab
                tempora quis deserunt tenetur placeat deleniti? Veritatis eos
                repudiandae illo fugit enim facere omnis quas totam nobis ipsa
                non, quisquam aut? Laudantium consectetur itaque ducimus eveniet
                quidem autem voluptatibus.
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
