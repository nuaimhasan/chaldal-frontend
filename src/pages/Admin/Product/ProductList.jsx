import { Link } from "react-router-dom";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

export default function ProductList() {
  return (
    <div class="relative overflow-x-auto shadow-lg">
      <table className="dashboard_table">
        <thead>
          <tr>
            <th>Product name</th>
            <th>Color</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Apple MacBook Pro 17"</td>
            <td>Silver</td>
            <td>Laptop</td>
            <td>$2999</td>
            <td>
              <div className="flex items-center gap-4">
                <Link
                  to="/admin/product/edit-product"
                  className="flex gap-1 items-center hover:text-green-700 duration-300"
                >
                  <BiSolidPencil />
                  Edit
                </Link>
                <button className="flex gap-1 items-center text-red-500">
                  <AiOutlineDelete />
                  Detele
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>Apple MacBook Pro 17"</td>
            <td>Silver</td>
            <td>Laptop</td>
            <td>$2999</td>
            <td>
              <div className="flex items-center gap-4">
                <Link
                  to="/admin/product/edit-product"
                  className="flex gap-1 items-center hover:text-green-700 duration-300"
                >
                  <BiSolidPencil />
                  Edit
                </Link>
                <button className="flex gap-1 items-center text-red-500">
                  <AiOutlineDelete />
                  Detele
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
