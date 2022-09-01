import { useMeQuery } from "../../../generated/graphql";
import {} from "@apollo/client";
import Login from "./Login";
import MenuProfile from "./MenuProfile";
import { BsFillBellFill } from "react-icons/bs";
import { LoadingSpinner } from "../../Loading";

function HeaderRight() {
  const { data, loading } = useMeQuery();

  return (
    <div className="ml-auto flex space-x-4">
      <div className="flex items-center space-x-3">
        {loading ? (
          <LoadingSpinner />
        ) : !data?.me ? (
          <Login />
        ) : (
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-full dark:bg-slate-800 dark:hover:bg-slate-700 cursor-pointer">
              <BsFillBellFill size={18} />
            </div>
            <div className="pl-4 border-l dark:border-l-slate-600">
              <MenuProfile />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderRight;
