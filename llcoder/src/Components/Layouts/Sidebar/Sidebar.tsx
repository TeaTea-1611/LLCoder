import Exams from "./Exams";
import Nav from "./Nav";
import QuickSeach from "./Search";

function Sidebar() {
  return (
    <aside className="hidden lg:block fixed z-20 inset-0 top-[56px] right-auto left-[max(0px,calc(50%-40rem))] w-[19.5rem] pb-10 px-8 overflow-y-auto">
      <div className="lg:text-sm lg:leading-6 relative">
        <Exams />
        <QuickSeach />
        <Nav />
      </div>
    </aside>
  );
}

export default Sidebar;
