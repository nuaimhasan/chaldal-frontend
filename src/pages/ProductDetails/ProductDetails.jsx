import parcer from "html-react-parser";
import { useParams } from "react-router-dom";
import { useGetProductBySlugQuery } from "../../Redux/product/productApi";
import Spinner from "../../components/Spinner/Spinner";
import ProductInfo from "./ProductInfo";
import RightSideInfo from "./RightSideInfo";

export default function ProductDetails() {
  window.scroll(0, 0);
  const params = useParams();
  let slug = params?.id;
  const { data, isLoading, isError, error, isSuccess } =
    useGetProductBySlugQuery(slug);

  const description = isSuccess ? data?.data?.description : "";
  const parcerDescription = parcer(description);

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError && isSuccess) {
    content = (
      <div>
        <div className="lg:flex shadow-lg mt-4 rounded overflow-hidden">
          <div className="lg:w-[75%] bg-base-100 p-4 text-neutral">
            <ProductInfo product={data?.data} />
          </div>

          <div className="lg:w-[25%] bg-stone-50 p-4 text-sm">
            <RightSideInfo service={data?.data?.service} />
          </div>
        </div>

        {/* Details */}
        <div className="bg-base-100 shadow-lg p-4 rounded mt-6">
          <h1 className="font-semibold text-lg">Product Description of</h1>

          <div className="mt-3 pl-2 text-sm text-neutral-content">
            {parcerDescription}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="pb-8">
      <div className="container">{content}</div>
    </section>
  );
}
