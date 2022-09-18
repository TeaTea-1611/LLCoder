import { Form, Formik, FormikHelpers } from "formik";
import { mapFieldError } from "../../utils/helpers/mapFieldError";
import { validateEmail } from "../../utils/helpers/validate";
import { Button, InputField } from "../UI";
import { ModalHeeaderProps } from "./LoginModal";

interface FormValues {
  email: string;
}

function ForgotPasswordModal({ changeModal }: ModalHeeaderProps) {
  const handleSubmit = async (
    values: FormValues,
    { setErrors }: FormikHelpers<FormValues>
  ) => {
    const errors = validateEmail(values.email);
    if (errors.length) {
      setErrors(mapFieldError(errors));
      return;
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="space-y-6 mt-8 w-100">
          <InputField label="Email" name="email" />
          <div className="flex">
            <button
              type="button"
              onClick={() => {
                changeModal("login");
              }}
              className="hover:underline"
            >
              Back
            </button>
            <Button type="submit" className="ml-auto">
              Send
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ForgotPasswordModal;
