import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import Select from "react-dropdown-select";
import { AiFillDelete } from "react-icons/ai";
import { BsX } from "react-icons/bs";
import ImageUploading from "react-images-uploading";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useGetCategoriesQuery,
  useGetCategoryQuery,
} from "../../../Redux/category/categoryApi";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../Redux/product/productApi";
import { useGetSubCategoryQuery } from "../../../Redux/subCategory/subCategoryApi";
import Spinner from "../../../components/Spinner/Spinner";

const options = [
  {
    name: "Cornsilk",
    code: "#FFF8DC",
  },
  {
    name: "BlanchedAlmond",
    code: "#FFEBCD",
  },
  {
    name: "Bisque",
    code: "#FFE4C4",
  },
  {
    name: "NavajoWhite",
    code: "#FFDEAD",
  },
  {
    name: "Wheat",
    code: "#F5DEB3",
  },
  {
    name: "BurlyWood",
    code: "#DEB887",
  },
  {
    name: "SandyBrown",
    code: "#F4A460",
  },
  {
    name: "RosyBrown",
    code: "#BC8F8F",
  },
  {
    name: "GoldenRod",
    code: "#DAA520",
  },
  {
    name: "Chocolate",
    code: "#D2691E",
  },
  {
    name: "Olive",
    code: "#808000",
  },
  {
    name: "SaddleBrown",
    code: "#8B4513",
  },
  {
    name: "Brown",
    code: "#A52A2A",
  },
  {
    name: "Maroon",
    code: "#800000",
  },
  {
    name: "White",
    code: "#fff",
  },
  {
    name: "MistyRose",
    code: "#FFE4E1",
  },
  {
    name: "AntiqueWhite",
    code: "#FAEBD7",
  },
  {
    name: "Silver",
    code: "##C0C0C0",
  },
  {
    name: "LightGray",
    code: "#D3D3D3",
  },
  {
    name: "DarkGray",
    code: "#A9A9A9",
  },
  {
    name: "DimGray",
    code: "#696969",
  },
  {
    name: "Gray",
    code: "#808080",
  },
  {
    name: "SlateGray",
    code: "#708090",
  },
  {
    name: "DarkSlateGray",
    code: "#2F4F4F",
  },
  {
    name: "Black",
    code: "#000000",
  },
  {
    name: "Pink",
    code: "#FFC0CB",
  },
  {
    name: "LightPink",
    code: "#FFB6C1",
  },
  {
    name: "HotPink",
    code: "#FF69B4",
  },
  {
    name: "DeepPink",
    code: "#FF1493",
  },
  {
    name: "PaleVioletRed",
    code: "#DB7093",
  },
  {
    name: "MediumVioletRed",
    code: "#C71585",
  },
  {
    name: "Lavender",
    code: "#E6E6FA",
  },
  {
    name: "Plum",
    code: "#DDA0DD",
  },
  {
    name: "Violet",
    code: "#EE82EE",
  },
  {
    name: "Magenta",
    code: "#FF00FF",
  },
  {
    name: "DarkViolet",
    code: "#9400D3",
  },
  {
    name: "BlueViolet",
    code: "#8A2BE2",
  },
  {
    name: "DarkMagenta",
    code: "#8B008B",
  },
  {
    name: "Purple",
    code: "#800080",
  },
  {
    name: "Indigo",
    code: "#4B0082",
  },
  {
    name: "LightSalmon",
    code: "#FFA07A",
  },
  {
    name: "Salmon",
    code: "#FA8072",
  },
  {
    name: "DarkSalmon",
    code: "#E9967A",
  },
  {
    name: "Red",
    code: "#FF0000",
  },
  {
    name: "DarkRed",
    code: "#8B0000",
  },
  {
    name: "Orange",
    code: "#FFA500",
  },
  {
    name: "DarkOrange",
    code: "#FF8C00",
  },
  {
    name: "Coral",
    code: "#FF7F50",
  },
  {
    name: "Tomato",
    code: "#FF6347",
  },
  {
    name: "OrangeRed",
    code: "#FF4500",
  },
  {
    name: "Gold",
    code: "#FFD700",
  },
  {
    name: "Yellow",
    code: "#FFFF00",
  },
  {
    name: "LightYellow",
    code: "#FFFFE0",
  },
  {
    name: "Moccasin",
    code: "#FFE4B5",
  },
  {
    name: "GreenYellow",
    code: "#ADFF2F",
  },
  {
    name: "Lime",
    code: "#00FF00",
  },
  {
    name: "LawnGreen",
    code: "#7CFC00",
  },
  {
    name: "LightGreen",
    code: "#90EE90",
  },
  {
    name: "Green",
    code: "#008000",
  },
  {
    name: "DarkGreen",
    code: "#006400",
  },
  {
    name: "YellowGreen",
    code: "#9ACD32",
  },
  {
    name: "Teal",
    code: "#008080",
  },
  {
    name: "Cyan",
    code: "#00FFFF",
  },
  {
    name: "DarkCyan",
    code: "#008B8B",
  },
  {
    name: "LightCyan",
    code: "#E0FFFF",
  },
  {
    name: "Aqua",
    code: "#00FFFF",
  },
  {
    name: "CadetBlue",
    code: "#5F9EA0",
  },
  {
    name: "SteelBlue",
    code: "#4682B4",
  },
  {
    name: "LightBlue",
    code: "#ADD8E6",
  },
  {
    name: "SkyBlue",
    code: "#87CEEB",
  },
  {
    name: "Blue",
    code: "#0000FF",
  },
  {
    name: "RoyalBlue",
    code: "#4169E1",
  },
  {
    name: "DarkBlue",
    code: "#00008B",
  },
  {
    name: "NavyBlue",
    code: "#000080",
  },
];

export default function EditProduct() {
  const navigate = useNavigate();

  const editor = useRef(null);
  const { id } = useParams();

  const { data, isLoading, isError, error } = useGetProductByIdQuery(id);
  const product = data?.data;
  const isVariants = product?.variants?.length > 0;

  // console.log(product, isVariants);

  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const { data: categories } = useGetCategoriesQuery();
  const { data: category } = useGetCategoryQuery(categoryId);
  const { data: subCategory } = useGetSubCategoryQuery(subCategoryId);

  const subCategories = category?.data?.subCategories;
  const subSubCategories = subCategory?.data?.subSubCategories;

  const [images, setImages] = useState([]);
  const [details, setDetails] = useState("");

  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([]);

  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState([]);

  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();

  // const handleImageChange = (event) => {
  //   const files = event.target.files;
  //   const newImages = Array.from(files);
  //   setImages([...images, ...newImages]);
  // };
  // const handleRemoveImage = (index) => {
  //   const newImages = [...images];
  //   newImages.splice(index, 1);
  //   setImages(newImages);
  // };

  const handleAddSizes = () => {
    if (event.key === "Shift" && size !== "") {
      setSizes([...sizes, size]);
      setSize("");
    }
  };

  const handleRemoveSize = (index) => {
    const newSizes = [...sizes];
    newSizes.splice(index, 1);
    setSizes(newSizes);
  };

  // Function to handle changes in input fields
  const handleInputChange = (colorIndex, sizeIndex, field, value) => {
    setVariants((prevVariants) => {
      const updatedVariants = [...prevVariants];

      if (!updatedVariants[colorIndex]) {
        updatedVariants[colorIndex] = [];
      }

      // Store all information (color, size, quantity, price) in each entry
      updatedVariants[colorIndex][sizeIndex] = {
        ...updatedVariants[colorIndex][sizeIndex],
        colorName: colors[colorIndex].name,
        colorCode: colors[colorIndex].code,
        size: sizes[sizeIndex],
        [field]: value,
      };

      return updatedVariants;
    });
  };

  // arranged right array
  const variantsArray = () => {
    const result = [];

    variants.forEach((colorData, colorIndex) => {
      const color = colors[colorIndex].name;
      const colorCode = colors[colorIndex].code;

      // eslint-disable-next-line no-unused-vars
      colorData.forEach((sizeData, sizeIndex) => {
        const { size, quantity, sellingPrice, purchasePrice } = sizeData;
        result.push({
          color,
          colorCode,
          size,
          quantity,
          sellingPrice,
          purchasePrice,
        });
      });
    });

    return result;
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    // const form = e.target;
    // const title = form.title.value;
    // const category = form.category.value;
    // const subCategory = form.sub_category.value;
    // const subSubCategory = form.sub_subCategory.value;
    // const brand = form.brand.value;
    // const discount = form.discount.value;
    // // const sellingPrice = form.selling_price ? form.selling_price.value : "";
    // // const purchasePrice = form.purchase_price ? form.purchase_price.value : "";
    // // const quantity = form.quantity ? form.quantity.value : "";

    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("category", category);
    // if (subCategory) formData.append("subCategory", subCategory);
    // if (subSubCategory) formData.append("subSubCategory", subSubCategory);
    // formData.append("brand", brand);
    // formData.append("discount", discount);
    // formData.append("description", details);
    // // formData.append("sellingPrice", sellingPrice);
    // // formData.append("purchasePrice", purchasePrice);
    // // formData.append("quantity", quantity);

    // if (images && images.length > 0) {
    //   images?.map((image) => {
    //     formData.append("images", image?.file);
    //   });
    // }

    // if (variants?.length > 0)
    //   formData.append("variants", JSON.stringify(variantsArray()));

    console.log(variants);

    // const res = await updateProduct({ id, formData });
    // console.log(res);

    // if (res?.error) {
    //   Swal.fire("", "Product update Fail, please try again", "error");
    // }

    // if (res?.data?.success) {
    //   Swal.fire("", "Product update success", "success");
    //   form.reset();
    //   setImages([]);
    //   setDetails("");
    //   navigate("/admin/product/all-products");
    // }
  };

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }
  if (!isLoading && isError) {
    content = <p>{error?.data?.error}</p>;
  }

  if (!isLoading && !isError) {
    content = (
      <>
        <h3 className="text-lg text-neutral font-medium mb-4">Edit Product</h3>
        <form onSubmit={handleUpdateProduct} className="text-neutral-content">
          <div className="mb-5 border rounded p-4">
            <p className="text-sm mb-2">Add Images (max 5 images select)</p>
            <ImageUploading
              value={images}
              onChange={(img) => setImages(img)}
              dataURLKey="data_url"
              multiple={true}
              maxNumber={5}
            >
              {({ onImageUpload, onImageRemove, dragProps }) => (
                <div className="grid sm:grid-cols-2 gap-4" {...dragProps}>
                  <div className="flex flex-col items-center justify-center gap-2 border rounded border-dashed p-3">
                    <span
                      onClick={onImageUpload}
                      className="px-4 py-1.5 rounded-2xl text-base-100 bg-primary cursor-pointer text-sm"
                    >
                      Choose Image
                    </span>

                    <p className="text-neutral-content">or Drop here</p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 border rounded border-dashed p-3">
                    {images?.map((img, index) => (
                      <div key={index} className="image-item relative">
                        <img
                          src={img["data_url"]}
                          alt=""
                          className="w-full h-20"
                        />
                        <div
                          onClick={() => onImageRemove(index)}
                          className="w-7 h-7 bg-primary rounded-full flex justify-center items-center text-base-100 absolute top-0 right-0 cursor-pointer"
                        >
                          <AiFillDelete />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* {images.length < 1 &&
                    product?.images.length > 0 &&
                    product?.images?.map((img, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-y-1 relative"
                      >
                        <img
                          src={`${
                            import.meta.env.VITE_BACKEND_URL
                          }/products/${img}`}
                          alt="img"
                          className="w-full h-16 rounded"
                        />
                      </div>
                    ))} */}
                </div>
              )}
            </ImageUploading>
          </div>

          <div className="form_group">
            <div className="border rounded p-4  flex flex-col gap-3 mb-5">
              <div>
                <p className="text-sm">Product Title</p>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={product?.title}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm">Category *</p>
                  <select
                    name="category"
                    required
                    onChange={(e) => setCategoryId(e.target.value)}
                    defaultValue={product?.category?._id}
                  >
                    <option value="">
                      {product?.category?.name || "Select Category"}
                    </option>
                    {categories?.data?.map((category) => (
                      <option key={category?._id} value={category?._id}>
                        {category?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="text-sm">Sub Category</p>
                  <select
                    name="sub_category"
                    onChange={(e) => setSubCategoryId(e.target.value)}
                    defaultValue={product?.subCategory?._id}
                  >
                    <option value="">
                      {product?.subCategory?.name || "Select Sub Category"}
                    </option>
                    {subCategories?.length > 0 &&
                      subCategories?.map((subCategory) => (
                        <option key={subCategory?._id} value={subCategory?._id}>
                          {subCategory?.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <p className="text-sm">Sub SubCategory</p>
                  <select
                    name="sub_subCategory"
                    defaultValue={product?.subSubCategory?._id}
                  >
                    <option value="">
                      {product?.subSubCategory?.name ||
                        "Select Sub SubCategory"}
                    </option>
                    {subSubCategories?.length > 0 &&
                      subSubCategories?.map((subSubCategory) => (
                        <option
                          key={subSubCategory?._id}
                          value={subSubCategory?._id}
                        >
                          {subSubCategory?.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm">Brand</p>
                  <input
                    type="text"
                    name="brand"
                    defaultValue={product?.brand}
                  />
                </div>

                <div>
                  <p className="text-sm">Discount %</p>
                  <input
                    type="number"
                    name="discount"
                    defaultValue={product?.discount}
                  />
                </div>
              </div>
            </div>

            {/* Variants */}
            <div className="mt-4 border rounded p-4">
              <div className="mt-2 border rounded p-3">
                {!isVariants && (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm">Selling Price</p>
                      <input
                        type="number"
                        name="selling_price"
                        required
                        defaultValue={product?.sellingPrice}
                      />
                    </div>
                    <div>
                      <p className="text-sm">Purchase Price</p>
                      <input
                        type="number"
                        name="purchase_price"
                        required
                        defaultValue={product?.purchasePrice}
                      />
                    </div>
                    <div>
                      <p className="text-sm">Quantity</p>
                      <input
                        type="number"
                        name="quantity"
                        required
                        defaultValue={product?.quantity}
                      />
                    </div>
                  </div>
                )}

                {isVariants && (
                  <div className="border rounded p-4 mt-5">
                    <p className="mb-2 text-neutral-content text-sm">
                      Variants
                    </p>
                    <div className="relative overflow-x-auto">
                      <table className="border_table">
                        <thead>
                          <tr>
                            <th className="w-1/5">Color</th>
                            <th className="w-1/5">Size</th>
                            <th className="w-1/5">Quantity</th>
                            <th className="w-1/5">Selling Price</th>
                            <th className="w-1/5">Purchase Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {product?.variants &&
                            product?.variants?.map((variant, colorIndex) => (
                              <tr key={colorIndex}>
                                <td>{variant?.color}</td>
                                <td>
                                  <input
                                    type="number"
                                    required
                                    disabled
                                    defaultValue={variant?.size}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    required
                                    defaultValue={variant?.quantity}
                                    onChange={(e) =>
                                      handleInputChange(
                                        colorIndex,
                                        colorIndex,
                                        "quantity",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    required
                                    defaultValue={variant?.sellingPrice}
                                    onChange={(e) =>
                                      handleInputChange(
                                        colorIndex,
                                        colorIndex,
                                        "sellingPrice",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    required
                                    defaultValue={variant?.purchasePrice}
                                    onChange={(e) =>
                                      handleInputChange(
                                        colorIndex,
                                        colorIndex,
                                        "purchasePrice",
                                        e.target.value
                                      )
                                    }
                                  />
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

            {/* Details */}
            <div className="mt-6 add_product_details border rounded p-4">
              <p className="text-sm">Description</p>

              <div className="mt-2">
                <JoditEditor
                  ref={editor}
                  value={
                    details ||
                    product?.description ||
                    "Enter Product Description"
                  }
                  onBlur={(text) => setDetails(text)}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={updateLoading && "disabled"}
                className="bg-primary text-base-100 px-10 py-2 rounded"
              >
                {updateLoading ? "Loading..." : "Update Product"}
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }

  return <div className="add_product text-neutral-content">{content}</div>;
}
