import { ModalForm } from "../../../Modal";
import { Button, InputField } from "../../../Tags";
import { Form, Formik, FormikHelpers } from "formik";
import { validateLogin } from "../../../../utils/helpers/validate";
import { mapFieldError } from "../../../../utils/helpers/mapFieldError";

export interface ModalHeeaderProps {
  isOpen: boolean;
  onClose: () => void;
  changeModal: (modal: string) => void;
}

interface FormValues {
  usernameOrEmail: string;
  password: string;
}

function LoginModal({ isOpen, onClose, changeModal }: ModalHeeaderProps) {
  const handleSubmit = async (
    values: FormValues,
    { setErrors }: FormikHelpers<FormValues>
  ) => {
    const errors = validateLogin(values);
    if (errors.length) {
      setErrors(mapFieldError(errors));
      return;
    }
  };

  return (
    <ModalForm isOpen={isOpen} onClose={onClose} title="Login" className="w-88">
      <Formik
        initialValues={{
          usernameOrEmail: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-6 mt-8">
            <InputField label="Username or Email" name="usernameOrEmail" />
            <InputField label="Password" name="password" isPassword />
            <div className="flex">
              <button
                type="button"
                className="hover:underline"
                onClick={() => {
                  onClose();
                  changeModal("forgotPassword");
                }}
              >
                Forgot Password?
              </button>
              <Button type="submit" className="ml-auto">
                Login
              </Button>
            </div>
            <div className="flex justify-center space-x-1">
              <p>Don't have an account?</p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  changeModal("register");
                }}
                className="hover:underline"
              >
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </ModalForm>
  );
}

export default LoginModal;
