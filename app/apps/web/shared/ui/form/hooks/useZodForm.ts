"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm, type FieldValues, type UseFormProps, type UseFormReturn } from "react-hook-form";
import { z } from "zod";

/**
 * hook that wraps react-hook-form with zod
 * @param formSchema schema to validate the form with
 * @param options additional options such as defaultValues, etc
 * @returns form object
 */
export function useZodForm<TFieldValues extends FieldValues>(
  formSchema: z.ZodType<TFieldValues>,
  options?: Omit<UseFormProps<TFieldValues>, "resolver">,
): { form: UseFormReturn<TFieldValues> } {
  // form
  const form = useForm<TFieldValues>({
    resolver: zodResolver(formSchema as never),
    ...options,
  });

  // return
  return useMemo(() => ({ form }), [form]);
}
