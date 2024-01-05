import JoditEditor from "jodit-react";
import { useRef, useState, useEffect } from "react";
import Select from "react-dropdown-select";
import { BsX } from "react-icons/bs";
import Swal from "sweetalert2";
import {
  useGetCategoriesQuery,
  useGetCategoryQuery,
} from "../../../Redux/category/categoryApi";
import { useAddProductMutation } from "../../../Redux/product/productApi";

import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { useGetSubCategoryQuery } from "../../../Redux/subCategory/subCategoryApi";
import { useNavigate } from "react-router-dom";

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

export default function AddProduct() {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const { data: categories } = useGetCategoriesQuery();
  const { data: category } = useGetCategoryQuery(categoryId);
  const { data: subCategory } = useGetSubCategoryQuery(subCategoryId);

  const subCategories = category?.data?.subCategories;
  const subSubCategories = subCategory?.data?.subSubCategories;

  const [images, setImages] = useState([]);
  const [details, setDetails] = useState("");

  const [variant, setVariant] = useState("no");

  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([]);

  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState([]);

  const [addProduct, { isLoading }] = useAddProductMutation();

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

      // if (!updatedVariants[colorIndex][sizeIndex]) {
      //   updatedVariants[colorIndex][sizeIndex] = {};
      // }

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

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (images?.length <= 0) {
      return Swal.fire("", "Image is required", "warning");
    }

    if (details === "") {
      return Swal.fire("", "Details is required", "warning");
    }

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const subCategory = form.sub_category.value;
    const subSubCategory = form.sub_subCategory.value;
    const brand = form.brand.value;
    const discount = form.discount.value;
    const sellingPrice = form.selling_price ? form.selling_price.value : "";
    const purchasePrice = form.purchase_price ? form.purchase_price.value : "";
    const quantity = form.quantity ? form.quantity.value : "";

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    if (subCategory) formData.append("subCategory", subCategory);
    if (subSubCategory) formData.append("subSubCategory", subSubCategory);
    formData.append("brand", brand);
    formData.append("discount", discount);
    formData.append("description", details);
    formData.append("sellingPrice", sellingPrice);
    formData.append("purchasePrice", purchasePrice);
    formData.append("quantity", quantity);
    images?.map((image) => {
      formData.append("images", image?.file);
    });
    if (variants?.length > 0)
      formData.append("variants", JSON.stringify(variantsArray()));

    const res = await addProduct(formData);

    if (res?.error) {
      Swal.fire("", "Product add Fail, please try again", "error");
    }

    if (res?.data?.success) {
      Swal.fire("", "Product add success", "success");
      form.reset();
      setImages([]);
      setDetails("");
      navigate("/admin/product/all-products");
    }
  };

  return (
    <div className="add_product  bg-base-100 rounded shadow p-4">
      <h3 className="text-lg text-neutral font-medium mb-4">Add Product</h3>
      <form onSubmit={handleAddProduct} className="text-neutral-content">
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
              </div>
            )}
          </ImageUploading>
        </div>

        <div className="form_group">
          <div className="border rounded p-4  flex flex-col gap-3 mb-5">
            <div>
              <p className="text-sm">Product Title</p>
              <input type="text" name="title" required />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm">Category *</p>
                <select
                  name="category"
                  required
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select Category</option>
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
                >
                  <option value="">Select Sub Category</option>
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
                <select name="sub_subCategory">
                  <option value="">Select Sub SubCategory</option>
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
                <input type="text" name="brand" />
              </div>

              <div>
                <p className="text-sm">Discount %</p>
                <input type="number" name="discount" />
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="mt-4 border rounded p-4">
            <div className="flex items-center gap-3">
              <p>Variant: </p>

              <div className="flex items-center">
                <input
                  defaultChecked={variant == "no" && true}
                  id="variant-1"
                  type="radio"
                  value="no"
                  name="variant"
                  className="cursor-pointer"
                  onClick={(e) => setVariant(e.target.value)}
                />
                <label
                  htmlFor="variant-1"
                  className="pl-1 text-sm font-medium mt-[3px] cursor-pointer"
                >
                  No
                </label>
              </div>

              <div className="flex items-center">
                <input
                  defaultChecked={variant == "yes" && true}
                  id="variant-2"
                  type="radio"
                  value="yes"
                  name="variant"
                  onClick={(e) => setVariant(e.target.value)}
                  className="cursor-pointer"
                />
                <label
                  htmlFor="variant-2"
                  className="pl-1 text-sm font-medium mt-[3px] cursor-pointer"
                >
                  Yes
                </label>
              </div>
            </div>

            <div className="mt-2 border rounded p-3">
              {variant === "no" && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm">Selling Price</p>
                    <input type="number" name="selling_price" required />
                  </div>
                  <div>
                    <p className="text-sm">Purchase Price</p>
                    <input type="number" name="purchase_price" required />
                  </div>
                  <div>
                    <p className="text-sm">Quantity</p>
                    <input type="number" name="quantity" required />
                  </div>
                </div>
              )}

              {variant === "yes" && (
                <div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm">Colors</p>
                      <Select
                        options={options}
                        labelField="name"
                        valueField="name"
                        onChange={(color) => setColors(color)}
                        values={colors}
                        multi
                      />
                    </div>

                    <div>
                      <p className="text-sm">Sizes</p>
                      <input
                        type="text"
                        name="size"
                        placeholder="Press Shift and add size"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        onKeyDown={handleAddSizes}
                      />
                      <div className="mt-2">
                        {sizes?.map((size, index) => (
                          <span
                            key={index}
                            className="mr-2 relative bg-gray-100 py-1 px-3 rounded whitespace-nowrap mb-2"
                          >
                            {size}
                            <span
                              onClick={() => handleRemoveSize(index)}
                              className="absolute -top-1 -right-1 text-red-500 text-lg cursor-pointer"
                            >
                              <BsX />
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

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
                          {colors?.length > 0 &&
                            colors?.map((color, colorIndex) => (
                              <tr key={colorIndex}>
                                <td>{color.name}</td>
                                <td>
                                  {sizes?.map((size, sizeIndex) => (
                                    <input
                                      key={sizeIndex}
                                      type="text"
                                      disabled
                                      defaultValue={size}
                                    />
                                  ))}
                                </td>
                                <td>
                                  {sizes?.length > 0 ? (
                                    sizes?.map((size, sizeIndex) => (
                                      <input
                                        key={sizeIndex}
                                        type="number"
                                        required
                                        onChange={(e) =>
                                          handleInputChange(
                                            colorIndex,
                                            sizeIndex,
                                            "quantity",
                                            e.target.value
                                          )
                                        }
                                      />
                                    ))
                                  ) : (
                                    <input
                                      type="number"
                                      required
                                      onChange={(e) =>
                                        handleInputChange(
                                          colorIndex,
                                          0,
                                          "quantity",
                                          e.target.value
                                        )
                                      }
                                    />
                                  )}
                                </td>
                                <td>
                                  {sizes?.length > 0 ? (
                                    sizes?.map((size, sizeIndex) => (
                                      <input
                                        key={sizeIndex}
                                        type="number"
                                        required
                                        onChange={(e) =>
                                          handleInputChange(
                                            colorIndex,
                                            sizeIndex,
                                            "sellingPrice",
                                            e.target.value
                                          )
                                        }
                                      />
                                    ))
                                  ) : (
                                    <input
                                      type="number"
                                      required
                                      onChange={(e) =>
                                        handleInputChange(
                                          colorIndex,
                                          0,
                                          "sellingPrice",
                                          e.target.value
                                        )
                                      }
                                    />
                                  )}
                                </td>
                                <td>
                                  {sizes?.length > 0 ? (
                                    sizes?.map((size, sizeIndex) => (
                                      <input
                                        key={sizeIndex}
                                        type="number"
                                        required
                                        onChange={(e) =>
                                          handleInputChange(
                                            colorIndex,
                                            sizeIndex,
                                            "purchasePrice",
                                            e.target.value
                                          )
                                        }
                                      />
                                    ))
                                  ) : (
                                    <input
                                      type="number"
                                      required
                                      onChange={(e) =>
                                        handleInputChange(
                                          colorIndex,
                                          0,
                                          "purchasePrice",
                                          e.target.value
                                        )
                                      }
                                    />
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
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
                value={details}
                onBlur={(text) => setDetails(text)}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isLoading && "disabled"}
              className="bg-primary text-base-100 px-10 py-2 rounded"
            >
              {isLoading ? "Loading..." : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
