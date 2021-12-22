import { FieldError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
  const map: Record<string, string> = {};
  errors.forEach(({ field, message }) => (map[field] = message));
  return map;
};
