import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  size,
  label,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        bgColor="white"
        borderRadius="15px"
        id={field.name}
        {...field}
        {...props}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
