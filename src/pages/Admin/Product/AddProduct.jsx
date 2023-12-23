import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import Select from "react-dropdown-select";
import { BsUpload, BsX } from "react-icons/bs";
import Swal from "sweetalert2";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import { useAddProductMutation } from "../../../Redux/product/productApi";

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
  const { data: categories } = useGetCategoriesQuery();
  const editor = useRef(null);
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [formData, setFormData] = useState([]);

  const [details, setDetails] = useState("");

  const [addProduct, { isSuccess, isLoading, isError, error }] =
    useAddProductMutation();

  const handleImageChange = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files);
    setImages([...images, ...newImages]);
  };
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleAddSizes = (val) => {
    if (event.key === "Enter") {
      setSizes([...sizes, val]);
      val = "";
    }
  };
  const handleRemoveSize = (index) => {
    const newSizes = [...sizes];
    newSizes.splice(index, 1);
    setSizes(newSizes);
  };

  // Function to handle changes in input fields
  const handleInputChange = (colorIndex, sizeIndex, field, value) => {
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];

      if (!updatedFormData[colorIndex]) {
        updatedFormData[colorIndex] = [];
      }

      if (!updatedFormData[colorIndex][sizeIndex]) {
        updatedFormData[colorIndex][sizeIndex] = {};
      }

      // Store all information (color, size, quantity, price) in each entry
      updatedFormData[colorIndex][sizeIndex] = {
        ...updatedFormData[colorIndex][sizeIndex],
        color: colors[colorIndex].name,
        colorCode: colors[colorIndex].code,
        size: sizes[sizeIndex],
        [field]: value,
      };

      return updatedFormData;
    });
  };

  // transform formData
  const transformData = () => {
    const result = [];

    formData.forEach((colorData, colorIndex) => {
      const colorName = colors[colorIndex].name;
      const colorCode = colors[colorIndex].code;
      const sizeInfoArray = [];

      colorData.forEach((sizeData, sizeIndex) => {
        const { size, quantity, price } = sizeData;
        sizeInfoArray.push({ size, quantity, price });
      });

      result.push({ colorName, colorCode, sizeInfoArray });
    });

    return result;
  };

  const handleGetData = () => {
    const transformedData = transformData();
    console.log(transformedData);
  };

  // const handleAddProduct = async (e) => {
  //   e.preventDefault();

  //   const form = e.target;
  //   const category = form.category.value;
  //   const title = form.title.value;
  //   const price = form.price.value;
  //   const discount = form.discount.value;
  //   const brand = form.brand.value;
  //   const description = details;

  //   const formData = new FormData();
  //   // formData.append("image", image);
  //   formData.append("title", title);
  //   formData.append("price", price);
  //   formData.append("category", category);
  //   formData.append("discount", discount);
  //   formData.append("brand", brand);
  //   formData.append("description", description);

  //   addProduct(formData);

  //   form.reset();
  //   // setImage("");
  //   setDetails("");
  // };

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
      <div className="text-neutral-content">
        <div className="mb-5">
          <div className="border rounded p-4">
            <div>
              <p className="text-sm">Add Image</p>
              <div className="grid md:grid-cols-2 gap-4">
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

                <div className="mt-2 border rounded border-dashed p-2 overflow-hidden grid md:grid-cols-3 gap-2 gap-y-2">
                  {images.map((image, index) => (
                    <div key={index} className="flex flex-col gap-y-1 relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`upload image ${index + 1}`}
                        className="w-full h-16 rounded"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="ml-2 absolute -top-1 -right-0 rounded-full bg-red-500 text-white"
                      >
                        <BsX />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="border rounded p-4 form_group flex flex-col gap-3 mb-5">
            <div className="grid md:grid-cols-2 gap-4">
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm">Brand</p>
                <input type="text" name="brand" />
              </div>

              <div>
                <p className="text-sm">Total Stock</p>
                <input
                  type="number"
                  // name="stock"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm">Sell Price</p>
                <input type="number" name="sellPrice" />
              </div>

              <div>
                <p className="text-sm">Purchase Price</p>
                <input type="number" name="purchasePrice" />
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

          <div className="border rounded p-4 form_group">
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
                  required
                  onKeyDown={(e) => handleAddSizes(e.target.value)}
                />
                <div className="mt-2">
                  {sizes?.map((sz, index) => (
                    <button
                      key={index}
                      className="mr-2 relative bg-gray-100 py-1 px-3 rounded whitespace-nowrap mb-2"
                    >
                      {sz}
                      <button
                        onClick={() => handleRemoveSize(index)}
                        className="absolute -top-1 -right-1 text-red-500 text-lg"
                      >
                        <BsX />
                      </button>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {colors?.length > 0 && sizes?.length > 0 && (
              <div className="border rounded p-4 mt-5">
                <div className="relative overflow-x-auto">
                  <table className="border_table">
                    <thead>
                      <tr>
                        <th className="w-1/4">Color</th>
                        <th className="w-1/4">Size</th>
                        <th className="w-1/4">Quantity</th>
                        <th className="w-1/4">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {colors?.map((color, colorIndex) => (
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
                            {sizes?.map((sz, sizeIndex) => (
                              <input
                                key={sizeIndex}
                                type="number"
                                onChange={(e) =>
                                  handleInputChange(
                                    colorIndex,
                                    sizeIndex,
                                    "quantity",
                                    e.target.value
                                  )
                                }
                              />
                            ))}
                          </td>
                          <td>
                            {sizes?.map((sz, sizeIndex) => (
                              <input
                                key={sizeIndex}
                                type="number"
                                onChange={(e) =>
                                  handleInputChange(
                                    colorIndex,
                                    sizeIndex,
                                    "price",
                                    e.target.value
                                  )
                                }
                              />
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            {/* <button
              disabled={isLoading && "disabled"}
              className="bg-primary text-base-100 px-10 py-2 rounded"
            >
              {isLoading ? "loading..." : "Add Product"}
            </button> */}
            <button
              onClick={handleGetData}
              className="bg-primary text-base-100 px-10 py-2 rounded"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
