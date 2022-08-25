import { useMeQuery } from "../../../generated/graphql";
import { LoadingSpinner } from "../../Loading";
import {} from "@apollo/client";
import Login from "./Login";
import Options from "./Options";
import Profile from "./Profile";

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
          <Profile me={data?.me} />
        )}
      </div>
      <Options />
    </div>
  );
}

export default HeaderRight;
