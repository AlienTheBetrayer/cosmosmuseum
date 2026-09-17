import { FieldValues, useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "../checkbox";
import { Field, FieldError, FieldLabel } from "../field";
import { WrapperControllerProps } from "@/shared/ui/form/types/props";

export default function FormCheckbox<T extends FieldValues>({
  name,
  label,
  id,
  ...props
}: WrapperControllerProps<T, typeof Checkbox>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field orientation="horizontal">
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
            aria-invalid={fieldState.invalid}
            id={id}
            {...props}
          />

          <FieldLabel htmlFor={id}>{label}</FieldLabel>

          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
