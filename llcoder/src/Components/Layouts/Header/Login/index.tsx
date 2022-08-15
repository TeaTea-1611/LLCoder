import { useState } from "react";
import ForgotPasswordModal from "./ForgotPasswordModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function Login() {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
  const [isOpenForgotPasswordModal, setIsOpenForgotPasswordModal] =
    useState(false);

  const handleChangeModal = (modal: string) => {
    switch (modal) {
      case "login":
        setIsOpenLoginModal(true);
        break;
      case "register":
        setIsOpenRegisterModal(true);
        break;
      case "forgotPassword":
        setIsOpenForgotPasswordModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <button
        className="hover:underline"
        onClick={() => setIsOpenLoginModal(true)}
      >
        Login
      </button>
      <LoginModal
        isOpen={isOpenLoginModal}
        onClose={() => setIsOpenLoginModal(false)}
        changeModal={handleChangeModal}
      />
      <button
        className="hover:underline"
        onClick={() => setIsOpenRegisterModal(true)}
      >
        Register
      </button>
      <RegisterModal
        isOpen={isOpenRegisterModal}
        onClose={() => setIsOpenRegisterModal(false)}
        changeModal={handleChangeModal}
      />
      <ForgotPasswordModal
        isOpen={isOpenForgotPasswordModal}
        onClose={() => setIsOpenForgotPasswordModal(false)}
        changeModal={handleChangeModal}
      />
    </>
  );
}

export default Login;
