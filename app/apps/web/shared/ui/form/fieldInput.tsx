import { FieldValues, useFormContext, Controller } from "react-hook-form";
import { Input } from "../input";
import { Field, FieldError, FieldLabel } from "../field";
import { WrapperControllerProps } from "@/shared/ui/form/types/props";

export default function FormInput<T extends FieldValues>({
  name,
  label,
  id,
  ...props
}: WrapperControllerProps<T, typeof Input>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>

          <Input
            {...field}
            {...props}
            id={id}
            aria-invalid={fieldState.invalid}
          />

          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
