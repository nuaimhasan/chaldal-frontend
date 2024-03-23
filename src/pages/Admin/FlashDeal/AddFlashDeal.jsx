import Select from "react-dropdown-select";
import { useGetAllProductsQuery } from "../../../Redux/product/productApi";
import { useState } from "react";

export default function AddFlashDeal() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { data: productData } = useGetAllProductsQuery();
  const products = productData?.data;

  const [flashProducts, setFlashProducts] = useState([]);

  return (
    <section className="bg-base-100 rounded p-3 text-neutral">
      <p>Flash Deal Information</p>

      <form className="mt-6 sm:w-2/3 mx-auto flex flex-col gap-4 text-sm">
        <div className="flex flex-col gap-1">
          <p>Title</p>
          <input
            type="text"
            className="border rounded outline-none px-4 py-1"
            name="title"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <p>Start Date</p>
            <input
              type="date"
              className="border rounded outline-none px-4 py-1"
              name="startDate"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>End Date</p>
            <input
              type="date"
              className="border rounded outline-none px-4 py-1"
              name="endDate"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p>Products</p>
          <Select
            multi
            options={products}
            labelField="title"
            valueField="title"
            onChange={(product) => setSelectedProducts(product)}
            values={selectedProducts}
          />
        </div>

        {selectedProducts?.length > 0 && (
          <div className="flex flex-col gap-1">
            <p>Discounts</p>
            <div className="relative overflow-x-auto shadow-lg">
              <table className="dashboard_table">
                <thead>
                  <tr>
                    <th className="border-r border-b bg-gray-100">Product</th>
                    <th className="border-r border-b bg-gray-100">
                      Base Price
                    </th>
                    <th className="bg-gray-100 border-b">Discount %</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts?.map((product) => (
                    <tr>
                      <td className="border-r">
                        <div className="flex items-center gap-2">
                          <img
                            src={`${
                              import.meta.env.VITE_BACKEND_URL
                            }/products/${product?.images[0]}`}
                            alt=""
                            className="w-8 h-8 rounded"
                          />
                          <p>{product?.title}</p>
                        </div>
                      </td>
                      <td className="border-r">
                        <p>
                          {product?.variants?.length > 0
                            ? product?.variants[0]?.sellingPrice
                            : product?.sellingPrice}
                        </p>
                      </td>
                      <td>
                        <input
                          type="number"
                          name=""
                          className="border rounded outline-none px-4 py-1"
                          defaultValue={0}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div>
          <button className="primary_btn">Save</button>
        </div>
      </form>
    </section>
  );
}
