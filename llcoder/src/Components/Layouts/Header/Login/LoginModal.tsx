import { ModalForm } from "../../../Modal";
import { Button, InputField } from "../../../UI";
import { Form, Formik, FormikHelpers } from "formik";
import { validateLogin } from "../../../../utils/helpers/validate";
import { mapFieldError } from "../../../../utils/helpers/mapFieldError";
import {
  LoginInput,
  MeDocument,
  MeQuery,
  useLoginMutation,
} from "../../../../generated/graphql";
import { toast } from "react-toastify";

export interface ModalHeeaderProps {
  isOpen: boolean;
  onClose: () => void;
  changeModal: (modal: string) => void;
}

function LoginModal({ isOpen, onClose, changeModal }: ModalHeeaderProps) {
  const [loginUser, { loading }] = useLoginMutation();

  const handleSubmit = async (
    values: LoginInput,
    { setErrors }: FormikHelpers<LoginInput>
  ) => {
    const errors = validateLogin(values);
    if (errors.length) {
      setErrors(mapFieldError(errors));
      return;
    }
    await loginUser({
      variables: {
        data: {
          usernameOrEmail: values.usernameOrEmail,
          password: values.password,
        },
      },
      update(cache, { data }) {
        console.log("data", data);
        if (data?.login.success) {
          toast("login success");
          onClose();
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: data.login.user,
            },
          });
        } else if (data?.login.errors) {
          setErrors(mapFieldError(data.login.errors));
        }
      },
    });
  };

  return (
    <ModalForm isOpen={isOpen} onClose={onClose} title="Login">
      <Formik
        initialValues={{
          usernameOrEmail: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="mt-8 w-100">
            <InputField label="Username or Email" name="usernameOrEmail" />
            <InputField label="Password" name="password" isPassword />
            <div className="flex mt-4">
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
              <Button type="submit" className="ml-auto" isLoading={loading}>
                Login
              </Button>
            </div>
            <div className="flex justify-center space-x-1 mt-4">
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
