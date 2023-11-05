import { useParams } from "react-router-dom";
import { useRef, useState } from "react";

import { BsUpload } from "react-icons/bs";
import JoditEditor from "jodit-react";
import Select from "react-dropdown-select";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner/Spinner";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import { useGetProductQuery } from "../../../Redux/product/productApi";
const sizes = [
  { id: 1, name: "36" },
  { id: 2, name: "38" },
  { id: 3, name: "40" },
  { id: 4, name: "42" },
  { id: 5, name: "44" },
  { id: 6, name: "sm" },
  { id: 7, name: "lg" },
  { id: 8, name: "xl" },
  { id: 9, name: "xxl" },
];

export default function EditProduct() {
  const editor = useRef(null);
  const { id } = useParams();
  const { data: categories } = useGetCategoriesQuery();
  const { data, isLoading, isError, error } = useGetProductQuery(id);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");
  const [size, setSize] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const price = form.price.value;
    const discount = form.discount.value;
    const stock = form.stock.value;
    const brand = form.brand.value;
    const description = details;
    const service = form.service.value;
    let sizes = [];
    size?.length > 0 ? size.map((s) => sizes.push(s?.name)) : [];

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);

    const imageRes = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/product/update-product-image/${id}`,
      {
        method: "POST",
        headers: {
          authorization: `bearer ${localStorage.getItem("eshop_jwt")}`,
        },
        body: formData,
      }
    );
    const ImageResult = await imageRes.json();

    if (ImageResult?.success) {
      const productInfo = {
        title,
        image: ImageResult?.data,
        category,
        price,
        discount,
        stock,
        brand,
        description,
        service,
        sizes,
      };

      const productRes = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/product/update-product/${id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("eshop_jwt")}`,
          },
          body: JSON.stringify(productInfo),
        }
      );
      const productResult = await productRes.json();

      if (productResult?.success) {
        Swal.fire("", "product update success", "success");
        location.reload();
        setLoading(false);
      } else {
        let image = ImageResult?.data;

        const imageDeleteRes = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/product/fail-post-product/${image}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("eshop_jwt")}`,
            },
          }
        );

        const imageDeleteResult = await imageDeleteRes.json();
        if (imageDeleteResult?.success) {
          Swal.fire("", "somethin went wrong, please try again", "error");
          setLoading(false);
        }
      }
    }

    setLoading(false);
  };

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }
  if (!isLoading && isError) {
    content = <p>{error}</p>;
  }
  if (!isLoading && !isError) {
    content = (
      <>
        <h3 className="text-lg">Edit Product</h3>
        <form
          onSubmit={handleAddProduct}
          className="mt-2 grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-start"
        >
          <div>
            <div className="border rounded p-4">
              <div>
                <p className="text-sm">Add Image</p>
                <div className="border border-dashed rounded mt-2 h-40 relative overflow-hidden">
                  <input
                    type="file"
                    name="productImage"
                    onChange={handleImageChange}
                  />

                  <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center gap-6">
                    <img src="/images/gallery.png" alt="" className="w-16" />
                    <h3 className="flex items-center gap-2">
                      <BsUpload />
                      Choose File
                    </h3>
                  </div>
                </div>

                {image ? (
                  <div className="mt-2 border rounded border-dashed p-2 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="upload image"
                        className="w-9 h-10 rounded"
                      />
                      <p className="text-sm">{image?.name}</p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 border rounded border-dashed p-2 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <img
                        src={`${
                          import.meta.env.VITE_BACKEND_URL
                        }/images/products/${data?.data?.image}`}
                        alt="upload image"
                        className="w-9 h-10 rounded"
                      />
                      <p className="text-sm">{data?.data?.image}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 border rounded p-4 flex flex-col gap-3">
              <div>
                <p className="text-sm">Size</p>
                <Select
                  options={
                    data?.data?.sizes?.length > 0 ? data?.data?.sizes : sizes
                  }
                  onChange={(e) => setSize(e)}
                  values={size}
                  labelField="name"
                  valueField="id"
                  searchBy="name"
                  closeOnSelect={true}
                  multi={true}
                />
              </div>

              <div className="form_group">
                <p className="text-sm">Service</p>
                <select name="service">
                  <option value="No Service Avaibale">
                    No Service Avaibale
                  </option>
                  <option value="7 days return">7 days return</option>
                  <option value="6 month warenty">6 month warenty</option>
                  <option value="1 year warenty">1 year warenty</option>
                  <option value="2 year warenty">2 year warenty</option>
                  <option value="3 year + warenty">3 year + warenty</option>
                </select>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 border rounded p-4 form_group flex flex-col gap-3">
            <div>
              <p className="text-sm">Product Title</p>
              <input
                type="text"
                name="title"
                defaultValue={data?.data?.title}
              />
            </div>

            <div>
              <p className="text-sm">Category</p>
              <select name="category" defaultValue={data?.data?.category}>
                {categories?.data?.map((category) => (
                  <option key={category?._id} value={category?.slug}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm">Price</p>
                <input
                  type="number"
                  name="price"
                  defaultValue={data?.data?.price}
                />
              </div>

              <div>
                <p className="text-sm">Discount(%)</p>
                <input
                  type="number"
                  name="discount"
                  defaultValue={data?.data?.discount}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm">Stock</p>
                <input
                  type="number"
                  name="stock"
                  defaultValue={data?.data?.stock}
                />
              </div>

              <div>
                <p className="text-sm">Brand</p>
                <input
                  type="text"
                  name="brand"
                  defaultValue={data?.data?.brand}
                />
              </div>
            </div>

            <div>
              <p className="text-sm">Description</p>

              <div className="mt-2">
                <JoditEditor
                  ref={editor}
                  value={
                    data?.data?.description?.length > 0
                      ? data?.data?.description
                      : details
                  }
                  onBlur={(text) => setDetails(text)}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              disabled={loading && "disabled"}
              className="bg-primary text-base-100 px-10 py-2 rounded"
            >
              {loading ? "loading..." : "Edit Product"}
            </button>
          </div>
        </form>
      </>
    );
  }

  return <div className="add_product text-neutral-content">{content}</div>;
}
