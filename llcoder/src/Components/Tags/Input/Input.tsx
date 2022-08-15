import { useField } from "formik";
import { useId, useState } from "react";
import { BsEye, BsEyeSlash, BsSearch } from "react-icons/bs";

export interface InputFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  name: string;
  isPassword?: boolean;
}

export function InputField({
  value,
  label,
  onChange,
  isPassword,
  ...props
}: InputFieldProps) {
  const id = useId();
  const [field, { error }] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="relative z-0 w-full my-2">
        <input
          {...field}
          id={id}
          className={`block py-2 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          type={isPassword && !showPassword ? "password" : "text"}
          {...props}
        />
        <label
          htmlFor={id}
          className={`absolute rounded-none text-slate-400 duration-300 transform ${
            field.value.length > 0 ? "-translate-y-10" : "-translate-y-1/2"
          } scale-75 top-1/2 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10`}
        >
          {label}
        </label>
        {isPassword &&
          field.value.length > 0 &&
          (!showPassword ? (
            <BsEye
              className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <BsEyeSlash
              className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ))}
      </div>
      {error && (
        <div className="text-red-500 dark:text-red-400 text-xs font-medium">
          {error}
        </div>
      )}
    </>
  );
}

interface InputSearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function InputSearch({
  onChange,
  value,
  placeholder = "Search",
}: InputSearchProps) {
  return (
    <div className="relative my-2">
      <span className="absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer">
        <BsSearch size={18} />
      </span>
      <input
        className="pl-10 py-1.5 pr-3 ring-1 ring-slate-900/10 shadow-sm rounded-md"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}
