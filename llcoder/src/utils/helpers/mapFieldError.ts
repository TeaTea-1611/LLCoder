interface FieldError {
  field: string;
  message: string;
}

export const mapFieldError = (
  errors: FieldError[]
): { [key: string]: string } =>
  errors.reduce((acc, error) => ({ ...acc, [error.field]: error.message }), {});
