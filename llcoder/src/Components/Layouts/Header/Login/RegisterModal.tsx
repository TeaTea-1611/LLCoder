import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../../../generated/graphql";
import { mapFieldError } from "../../../../utils/helpers/mapFieldError";
import { validateRegister } from "../../../../utils/helpers/validate";
import { ModalForm } from "../../../Modal";
import { Button, InputField } from "../../../UI";
import { ModalHeeaderProps } from "./LoginModal";

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegisterModal({ isOpen, onClose, changeModal }: ModalHeeaderProps) {
  const [registerUser, { loading }] = useRegisterMutation();

  const handleSubmit = async (
    values: FormValues,
    { setErrors }: FormikHelpers<FormValues>
  ) => {
    const errors = validateRegister(values);
    if (!!errors.length) {
      setErrors(mapFieldError(errors));
      return;
    }
    const response = await registerUser({
      variables: {
        data: {
          username: values.username,
          email: values.email,
          password: values.password,
        },
      },
    });
    if (!!response.data?.register.errors) {
      setErrors(mapFieldError(response.data.register.errors));
    } else {
      toast("Successfully registered!", { autoClose: 10000, type: "success" });
      onClose();
      changeModal("login");
    }
  };

  return (
    <ModalForm isOpen={isOpen} onClose={onClose} title="Register">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="mt-8 w-100">
            <InputField label="Username" name="username" />
            <InputField label="Email" name="email" />
            <InputField label="Password" name="password" isPassword />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              isPassword
            />
            <div className="flex mt-4">
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
              <Button type="submit" className="ml-auto" isLoading={loading}>
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
