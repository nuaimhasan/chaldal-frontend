import { useEffect, useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import { MdOutlineClose } from "react-icons/md";
import { useAddProductMutation } from "../../../Redux/product/productApi";

const options = [
  {
    id: 1,
    name: "white",
    code: "#fff",
  },
  {
    id: 1,
    name: "black",
    code: "#000",
  },
  {
    id: 1,
    name: "orange",
    code: "#ffa500",
  },
];

export default function AddProduct() {
  const { data: categories } = useGetCategoriesQuery();
  const editor = useRef(null);
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");

  const [colorDropdown, setColorDropdown] = useState(false);
  const [searchColor, setSearchColor] = useState("");
  // Remove Color Dropdown click other side
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".color") && !e.target.closest(".color_search")) {
        setColorDropdown(false);
        setSearchColor("");
      }
    });
  }, [setColorDropdown, setSearchColor]);

  const [color, setColor] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [variants, setVariants] = useState([]);
  const totalQuantity = variants?.reduce(
    (total, item) => total + parseInt(item.quantity),
    0
  );

  const [addProduct, { isSuccess, isLoading, isError, error }] =
    useAddProductMutation();

  const handleAddVariant = (e) => {
    e.preventDefault();
    const form = e.target;
    const size = form.size.value;
    const quantity = form.quantity.value;

    const variant = {
      size,
      colorName: color,
      colorCode,
      quantity,
    };

    if (!size || !color || !colorCode || !quantity) {
      return alert("please fill up the field");
    }

    setVariants([...variants, variant]);
    setColor("");
    form.reset();
  };

  const handleRemoveVariant = (variant) => {
    const newVariants = variants?.filter(
      (v) => v.colorName !== variant.colorName || v.size !== variant.size
    );

    setVariants(newVariants);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (variants?.length <= 0) {
      return alert("product variant is required");
    }

    const form = e.target;
    const category = form.category.value;
    const title = form.title.value;
    const price = form.price.value;
    const discount = form.discount.value;
    const brand = form.brand.value;
    const description = details;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("discount", discount);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("variants", JSON.stringify(variants));

    addProduct(formData);

    form.reset();
    setVariants([]);
    setImage("");
    setDetails("");
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "Product add success", "success");
    }
    if (isError) {
      Swal.fire(
        "",
        error?.message ? error?.message : "Product add Fail, please try again",
        "error"
      );
    }
  }, [isSuccess, isError, error]);

  return (
    <div className="add_product  bg-base-100 rounded shadow p-4">
      <h3 className="text-lg text-neutral font-medium mb-4">Add Product</h3>
      <div className="text-neutral-content grid md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
        <div className="lg:col-span-2">
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

          <div className="mt-4 border rounded p-4 form_group">
            <p className="text-sm">Variations & Stock</p>
            <form
              onSubmit={handleAddVariant}
              className="mt-1 grid grid-cols-4 gap-1 items-center"
            >
              <div className="relative">
                <div className="text-sm mt-px">
                  <div
                    onClick={() => setColorDropdown(!colorDropdown)}
                    className="color p-2 h-[37px] border rounded cursor-pointer"
                  >
                    {color ? color : "Color"}
                  </div>
                </div>

                {colorDropdown && (
                  <div className="pb-1 px-1 z-10 absolute bg-base-100 border rounded top-full left-0 w-full max-h-60 overflow-y-auto">
                    <div>
                      <input
                        onChange={(e) => setSearchColor(e.target.value)}
                        type="text"
                        className="color_search px-2 py-1 rounded w-full border outline-none placeholder:font-light"
                        placeholder="search"
                      />
                    </div>
                    <ul>
                      {options
                        ?.filter((color) =>
                          color.name
                            .toLowerCase()
                            .includes(searchColor.toLowerCase())
                        )
                        .map((color, i) => (
                          <li
                            key={i}
                            onClick={() => {
                              setColor(color.name);
                              setColorCode(color.code);
                            }}
                            className="p-1 hover:bg-gray-200 duration-200 cursor-pointer flex gap-1 items-center"
                          >
                            <p
                              className="w-3 h-3 rounded-full"
                              style={{ background: color.code }}
                            ></p>
                            {color.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>

              <input type="text" name="size" placeholder="size" />

              <input type="number" name="quantity" placeholder="quantity" />

              <button className="h-9 text-sm bg-neutral text-base-100 flex justify-center items-center rounded">
                Add
              </button>
            </form>

            {variants?.length > 0 && (
              <div className="mt-4">
                <div className="relative overflow-x-auto">
                  <table className="border_table">
                    <thead>
                      <tr>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {variants?.map((variant, i) => (
                        <tr key={i}>
                          <td>{variant.colorName}</td>
                          <td>{variant.size}</td>
                          <td>{variant.quantity}</td>
                          <td>
                            <div onClick={() => handleRemoveVariant(variant)}>
                              <MdOutlineClose />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleAddProduct} className="lg:col-span-3">
          <div className="border rounded p-4 form_group flex flex-col gap-3">
            <div>
              <p className="text-sm">Product Title</p>
              <input type="text" name="title" required />
            </div>

            <div>
              <p className="text-sm">Category</p>
              <select name="category">
                {categories?.data?.map((category) => (
                  <option key={category?.id} value={category?.slug}>
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
                <p className="text-sm">Total Stock</p>
                <input
                  type="number"
                  // name="stock"
                  value={totalQuantity}
                />
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
              disabled={isLoading && "disabled"}
              className="bg-primary text-base-100 px-10 py-2 rounded"
            >
              {isLoading ? "loading..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
