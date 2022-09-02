import { useMeQuery } from "../../../generated/graphql";
import {} from "@apollo/client";
import Login from "./Login";
import MenuProfile from "./MenuProfile";
import { BsFillBellFill } from "react-icons/bs";
import { LoadingSpinner } from "../../Loading";

function HeaderRight() {
  const { data, loading } = useMeQuery();

  return (
    <div className="ml-auto flex">
      <div className="flex items-center space-x-4">
        {loading ? (
          <LoadingSpinner />
        ) : !data?.me ? (
          <Login />
        ) : (
          <div className="flex items-center">
            <div className="relative mr-4 before:content-[''] before:w-[1px] before:h-6 before:bg-slate-500/50 before:absolute before:top-1/2 before:-translate-y-1/2 before:-right-4">
              <div className="p-2 rounded-full dark:bg-slate-800 dark:hover:bg-slate-700 cursor-pointer">
                <BsFillBellFill size={16} />
              </div>
            </div>
            <div className="pl-4">
              <MenuProfile />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderRight;
