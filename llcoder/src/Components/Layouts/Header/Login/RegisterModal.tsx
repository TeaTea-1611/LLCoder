import { Form, Formik, FormikHelpers } from "formik";
import { mapFieldError } from "../../../../utils/helpers/mapFieldError";
import { validateRegister } from "../../../../utils/helpers/validate";
import { ModalForm } from "../../../Modal";
import { Button, InputField } from "../../../Tags";
import { ModalHeeaderProps } from "./LoginModal";

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegisterModal({ isOpen, onClose, changeModal }: ModalHeeaderProps) {
  const handleSubmit = async (
    values: FormValues,
    { setErrors }: FormikHelpers<FormValues>
  ) => {
    const errors = validateRegister(values);
    if (errors.length) {
      setErrors(mapFieldError(errors));
      return;
    }
  };

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      title="Register"
      className="w-88"
    >
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-6 mt-8">
            <InputField label="Username" name="username" />
            <InputField label="Email" name="email" />
            <InputField label="Password" name="password" isPassword />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              isPassword
            />
            <div className="flex">
              <div className="flex items-center space-x-1">
                <p>You have an account?</p>
                <button
                  type="button"
                  className="hover:underline"
                  onClick={() => {
                    onClose();
                    changeModal("login");
                  }}
                >
                  Login
                </button>
              </div>
              <Button type="submit" className="ml-auto">
                Register
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </ModalForm>
  );
}

export default RegisterModal;
