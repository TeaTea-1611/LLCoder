import { useMeQuery } from "../generated/graphql";

function AuthPage({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: "R0" | "R1" | "R2" | "R3" | "R4";
}) {
  const { data } = useMeQuery();

  let body: React.ReactNode = (
    <div className="ml-4">
      <h1>Vui lòng đăng nhập để truy cập</h1>
    </div>
  );

  const notAuthorities = (
    <div className="ml-4">
      <h1>Bạn không có quyền truy cập</h1>
    </div>
  );

  const role = data?.me?.role.value;

  if (data?.me) {
    switch (auth) {
      case "R4":
        body = children;
        break;
      case "R3":
        if (role === "R3" || role === "R2" || role === "R1" || role === "R0")
          body = children;
        else body = notAuthorities;
        break;
      case "R2":
        if (role === "R2" || role === "R1" || role === "R0") body = children;
        else body = notAuthorities;
        break;
      case "R1":
        if (role === "R1" || role === "R0") body = children;
        else body = notAuthorities;
        break;
      case "R0":
        if (role === "R0") body = children;
        else body = notAuthorities;
        break;
      default:
        break;
    }
  }

  return <>{body}</>;
}

export default AuthPage;
