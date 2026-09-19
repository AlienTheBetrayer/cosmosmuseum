import { FieldValues, useFormContext, Controller } from "react-hook-form";
import { Input } from "../input";
import { Field, FieldDescription, FieldError, FieldLabel } from "../field";
import { WrapperControllerProps } from "@/shared/ui/form/types/props";

export default function FormInput<T extends FieldValues>({
  name,
  label,
  action,
  description,
  id,
  ...props
}: WrapperControllerProps<T, typeof Input> & {
  action?: React.ReactNode;
  description?: string;
}) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="w-full flex justify-between">
            <FieldLabel htmlFor={id}>{label}</FieldLabel>

            {action}
          </div>
          
          {description && <FieldDescription>{description}</FieldDescription>}

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
