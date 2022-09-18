import { useState } from "react";
import { ModalForm } from "../Modal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function Login() {
  const [openModal, setOpenModal] = useState({
    login: false,
    register: false,
    forgotPassword: false,
  });

  const changeModal = (modal: string) => {
    switch (modal) {
      case "login":
        setOpenModal({
          login: true,
          register: false,
          forgotPassword: false,
        });
        break;
      case "register":
        setOpenModal({
          login: false,
          register: true,
          forgotPassword: false,
        });
        break;
      case "forgotPassword":
        setOpenModal({
          login: false,
          register: false,
          forgotPassword: true,
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <button
        className="hover:underline"
        onClick={() => {
          setOpenModal({
            ...openModal,
            login: true,
          });
        }}
      >
        Login
      </button>
      <button
        className="hover:underline"
        onClick={() => {
          setOpenModal({
            ...openModal,
            register: true,
          });
        }}
      >
        Register
      </button>
      <ModalForm
        isOpen={
          openModal.login || openModal.register || openModal.forgotPassword
        }
        onClose={() =>
          setOpenModal({ login: false, register: false, forgotPassword: false })
        }
        title={
          (openModal.login && "Login") ||
          (openModal.register && "Register") ||
          (openModal.forgotPassword && "Quên mật khẩu") ||
          ""
        }
      >
        {openModal.login && <LoginModal changeModal={changeModal} />}
        {openModal.register && <RegisterModal changeModal={changeModal} />}
        {openModal.forgotPassword && (
          <ForgotPasswordModal changeModal={changeModal} />
        )}
      </ModalForm>
    </>
  );
}

export default Login;
