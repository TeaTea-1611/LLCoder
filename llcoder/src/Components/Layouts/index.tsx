import Header from "./Header";
import { Sidebar } from "./Sidebar";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <div className="overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-2 md:px-1">
          <Sidebar />
          <div className="lg:pl-[19.5rem]">
            <div className="max-w-3xl mx-auto relative z-20 pt-10 xl:max-w-none">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DefaultLayout;
