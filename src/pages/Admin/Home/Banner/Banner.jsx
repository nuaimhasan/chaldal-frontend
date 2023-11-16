import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Banner Lists</h3>
        <Link
          to="/admin/front-end/home-page/add-banner"
          className="primary_btn"
        >
          Add Banner
        </Link>
      </div>
      <div className="p-4">
        <div className="relative overflow-x-auto shadow-lg">
          <table className="dashboard_table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Banner Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <div className="flex items-center gap-2">
                    <img src="" alt="" className="w-16 h-10" />
                  </div>
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
