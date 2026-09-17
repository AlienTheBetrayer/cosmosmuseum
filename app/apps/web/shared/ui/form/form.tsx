"use client";

import { FormProvider, type FieldValues, type SubmitHandler, type UseFormReturn } from "react-hook-form";
import fieldCheckbox from "./fieldCheckbox";
import fieldInput from "./fieldInput";
import fieldSubmit from "./fieldSubmit";

export { useZodForm } from "./hooks/useZodForm";

export type FormProps<TFieldValues extends FieldValues> = Omit<React.ComponentProps<"form">, "onSubmit"> & {
  form: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
};

function Form<TFieldValues extends FieldValues>({ form, onSubmit, children, ...props }: FormProps<TFieldValues>) {
  return (
    <FormProvider {...form}>
      <form
        {...props}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
}

Form.Input = fieldInput;
Form.Checkbox = fieldCheckbox;
Form.Submit = fieldSubmit;

export default Form;
