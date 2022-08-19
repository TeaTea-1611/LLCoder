import { FieldError } from "src/types/FieldError";
import { LoginInput, RegisterInput } from "src/types/UserResponse";

export const validateRegister = (options: RegisterInput) => {
  const { username, email, password } = options;
  const errors: FieldError[] = [];
  if (!username)
    errors.push({
      field: "username",
      message: "Username is required",
    });
  else if (username.length < 6)
    errors.push({
      field: "username",
      message: "Username must be at least 6 characters",
    });
  else if (username.length > 20)
    errors.push({
      field: "username",
      message: "Username must be at most 20 characters",
    });
  if (!email)
    errors.push({
      field: "email",
      message: "Email is required",
    });
  else if (
    !email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  )
    errors.push({
      field: "email",
      message: "Email is invalid",
    });
  if (!password)
    errors.push({
      field: "password",
      message: "Password is required",
    });
  else if (password.length < 6)
    errors.push({
      field: "password",
      message: "Password must be at least 6 characters",
    });
  else if (password.length > 20)
    errors.push({
      field: "password",
      message: "Password must be at most 20 characters",
    });
  return errors;
};

export const validateLogin = (options: LoginInput) => {
  const { usernameOrEmail, password } = options;
  const errors: FieldError[] = [];
  if (!usernameOrEmail)
    errors.push({
      field: "usernameOrEmail",
      message: "Username or email is required",
    });
  if (!password)
    errors.push({
      field: "password",
      message: "Password is required",
    });
  return errors;
};
