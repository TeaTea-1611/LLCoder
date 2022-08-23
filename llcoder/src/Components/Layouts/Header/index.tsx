import HeaderRight from "./HeaderRight";

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full h-[56px] backdrop-blur bg-white/95 duration-500 border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] dark:bg-dark-color-4/75">
      <div className="max-w-7xl mx-auto">
        <div className="lg:px-8 mx-4 lg:mx-0">
          <div className="relative h-14 flex items-center">
            <span>LLCoder</span>
            <HeaderRight />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
