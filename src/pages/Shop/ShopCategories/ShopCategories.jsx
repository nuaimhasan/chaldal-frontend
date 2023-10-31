import CategoryLists from "../../../components/CategoryLists/CategoryLists";

export default function ShopCategories() {
  return (
    <div className="shop_categories h-full hidden md:block">
      <h3 className="font-medium pb-1 border-b text-neutral">Categories</h3>
      <div className="mt-2">
        <CategoryLists />
      </div>
    </div>
  );
}
