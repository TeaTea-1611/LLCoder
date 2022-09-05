import { Link } from "react-router-dom";
import config from "../config";

function PageNotFound() {
  return ( <div className="flex">
    <div className="m-auto">
      <h1 className="font-bold text-sky-500">404 Page Not Found</h1>
      <div className="flex items-center justify-center mt-8">
        <Link to={config.routes.home} className="hover:underline">
          Go to home
        </Link>
      </div>
    </div>
  </div>);
}

export default PageNotFound;