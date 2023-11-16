import { useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import { MdOutlineClose } from "react-icons/md";

export default function AddProduct() {
  const { data: categories } = useGetCategoriesQuery();
  const editor = useRef(null);
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleAddSizes = (e) => {
    if (e.key === "Enter") {
      setSizes([...sizes, e.target.value]);
      e.target.value = "";
    }
  };

  console.log(sizes);

  const handleDeleteSize = (size) => {
    setSizes(sizes?.length > 0 && sizes?.filter((s) => s !== size));
  };

  console.log(sizes);

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
    // const size = form.size.value;
    const color = form.color.value;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("discount", discount);
    formData.append("stock", stock);
    formData.append("brand", brand);
    formData.append("description", description);
    // formData.append("size", size);
    formData.append("color", color);

    setLoading(true);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/product/add-product`, {
      method: "POST",
      headers: {
        authorization: `bearer ${localStorage.getItem("aesthetic_jwt")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          form.reset();
          setImage("");
          Swal.fire("", "Product add sccess", "success");
          setLoading(false);
          setInterval(() => {
            location.reload();
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="add_product  bg-base-100 rounded shadow p-4">
      <h3 className="text-lg text-neutral font-medium mb-4">Add Product</h3>
      <div className="text-neutral-content grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
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

              {image && (
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
              )}
            </div>
          </div>

          <div className="mt-4 border rounded p-4 flex flex-col gap-3 form_group">
            <div>
              <p className="text-sm">Sizes</p>
              <input
                type="text"
                onKeyDown={(e) => handleAddSizes(e)}
                className="placeholder:font-light"
                placeholder="Enter choice size"
              />

              <div>
                {sizes?.length > 0 &&
                  sizes?.map((size) => (
                    <span className="whitespace-nowrap mr-1 w-max bg-gray-700 px-1 py-[2px] rounded text-sm text-base-100">
                      {size}
                      <button
                        onClick={() => handleDeleteSize(size)}
                        className="hover:text-red-500 ml-1"
                      >
                        <MdOutlineClose className="mt-2 pt-1" />
                      </button>
                    </span>
                  ))}
              </div>
            </div>

            <div>
              <p className="text-sm">Colors</p>
              <input type="text" />
            </div>
          </div>
        </div>

        <form onSubmit={handleAddProduct} className="md:col-span-2">
          <div className="border rounded p-4 form_group flex flex-col gap-3">
            <div>
              <p className="text-sm">Product Title</p>
              <input type="text" name="title" required />
            </div>

            <div>
              <p className="text-sm">Category</p>
              <select name="category">
                {categories?.data?.map((category) => (
                  <option key={category?.uuid} value={category?.slug}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm">Price</p>
                <input type="number" name="price" required />
              </div>

              <div>
                <p className="text-sm">Discount(%)</p>
                <input type="number" name="discount" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm">Stock</p>
                <input type="number" name="stock" required />
              </div>

              <div>
                <p className="text-sm">Brand</p>
                <input type="text" name="brand" />
              </div>
            </div>

            <div>
              <p className="text-sm">Description</p>

              <div className="mt-2">
                <JoditEditor
                  ref={editor}
                  value={details}
                  onBlur={(text) => setDetails(text)}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              disabled={loading && "disabled"}
              className="bg-primary text-base-100 px-10 py-2 rounded"
            >
              {loading ? "loading..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
