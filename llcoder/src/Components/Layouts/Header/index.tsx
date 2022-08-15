import Auth from "./Auth";

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full h-[56px] bg-transparent duration-500 border-b lg:border-slate-900/10 dark:border-slate-50/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="lg:px-8 mx-4 lg:mx-0">
          <div className="relative h-14 flex items-center">
            <span>LLCoder</span>
            <Auth />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
