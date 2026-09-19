import { ComponentPropsWithRef, ElementType } from "react";
import { Path } from "react-hook-form";

export type WrapperControllerProps<T, E extends ElementType> = {
  name: Path<T>;
  label: string;
  id: string;
} & Omit<ComponentPropsWithRef<E>, "name" | "label" | "id">;
