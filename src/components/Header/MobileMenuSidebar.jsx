import SearchBox from "./SearchBox";

export default function MobileMenuSidebar({ mobileMenu, setMobileMenu }) {
  return (
    <div className="md:hidden">
      <button
        onClick={() => setMobileMenu(false)}
        className={`overlay ${mobileMenu && "overlay_show"}`}
      ></button>
      <div className={`menu_wrap ${mobileMenu && "menu_wrap_show"}`}>
        <div className="m-2">
          <SearchBox />
        </div>
      </div>
    </div>
  );
}
