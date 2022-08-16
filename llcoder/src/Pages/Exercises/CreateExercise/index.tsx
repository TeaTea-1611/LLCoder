import { Form, Formik } from "formik";
import { EditText } from "../../../components/EditText";
import { Button, InputField } from "../../../components/Tags";

interface FormValues {
  name: string;
  description: string;
  difficulty: string;
  category: string;
  exp: number;
  source: string;
}

function CreateExercisePage() {
  const initialValues: FormValues = {
    name: "",
    description: "",
    difficulty: "",
    category: "",
    exp: 0,
    source: "",
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <>
      <header>
        <h1 className="font-medium">Create Exercise</h1>
      </header>
      <div className="my-12">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, setValues }) => (
            <Form className="flex flex-col space-y-4">
              <div className="flex flex-row items-center space-x-4">
                <InputField label="Name exercise" name="name" />
                <InputField label="Source exercise" name="source" />
              </div>
              <EditText
                value={values.description}
                onChange={(value) => {
                  setValues({ ...values, description: value });
                }}
              />
              <div className="flex">
                <Button type="submit" className="ml-auto">
                  Create
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default CreateExercisePage;
