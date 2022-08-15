import { Form, Formik, FormikHelpers } from "formik";
import { mapFieldError } from "../../../../utils/helpers/mapFieldError";
import { validateEmail } from "../../../../utils/helpers/validate";
import { ModalForm } from "../../../Modal";
import { Button, InputField } from "../../../Tags";
import { ModalHeeaderProps } from "./LoginModal";

interface FormValues {
  email: string;
}

function ForgotPasswordModal({
  isOpen,
  onClose,
  changeModal,
}: ModalHeeaderProps) {
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
    <ModalForm
      isOpen={isOpen}
      onClose={onClose}
      title="Forgot Password"
      className="w-88"
    >
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-6 mt-8">
            <InputField label="Email" name="email" />
            <div className="flex">
              <button
                type="button"
                onClick={() => {
                  onClose();
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
    </ModalForm>
  );
}

export default ForgotPasswordModal;
