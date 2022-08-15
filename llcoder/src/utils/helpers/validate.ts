interface IFieldError {
  field: string;
  message: string;
}

interface IUserRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IUserLogin {
  usernameOrEmail: string;
  password: string;
}

export const validateRegister = (data: IUserRegister) => {
  const errors: IFieldError[] = [];
  if (data.username.length < 6) {
    errors.push({
      field: "username",
      message: "Username must be at least 6 characters",
    });
  } else if (data.username.length > 20) {
    errors.push({
      field: "username",
      message: "Username must be less than 20 characters",
    });
  }
  if (
    !data.email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    errors.push({
      field: "email",
      message: "Email is invalid",
    });
  }
  if (data.password.length < 6) {
    errors.push({
      field: "password",
      message: "Password must be at least 6 characters",
    });
  }
  if (data.password !== data.confirmPassword) {
    errors.push({
      field: "confirmPassword",
      message: "Password and confirm password must match",
    });
  }
  return errors;
};

export const validateLogin = (data: IUserLogin) => {
  const errors: IFieldError[] = [];
  if (!data.usernameOrEmail) {
    errors.push({
      field: "usernameOrEmail",
      message: "Username or email is required",
    });
  }
  if (data.usernameOrEmail.includes("@")) {
    if (
      !data.usernameOrEmail.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      errors.push({
        field: "usernameOrEmail",
        message: "Email is invalid",
      });
    }
  }
  if (!data.password) {
    errors.push({
      field: "password",
      message: "Password is required",
    });
  }
  return errors;
};

export const validateEmail = (email?: string) => {
  const errors: IFieldError[] = [];
  if (!email) {
    errors.push({
      field: "email",
      message: "Email is required",
    });
  } else if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    errors.push({
      field: "email",
      message: "Email is invalid",
    });
  }
  return errors;
};
