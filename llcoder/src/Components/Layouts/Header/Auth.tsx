import Login from "./Login";
import Options from "./Options";

function Auth() {
  const auth = false;

  return (
    <div className="ml-auto flex space-x-4">
      <div className="lg:flex items-center space-x-3">
        {!auth ? <Login /> : <div></div>}
      </div>
      <Options />
    </div>
  );
}

export default Auth;
