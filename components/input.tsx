import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input as UiInput } from "./ui/input";

interface InputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  disabled: boolean;
  placeholder?: string;
}

const Input = <T extends FieldValues>({
  form,
  name,
  disabled,
  label,
  placeholder,
}: InputProps<T>) => {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="grid grid-cols-9 md:gap-6 gap-3">
            <FormLabel className="col-span-2 text-end">{label}</FormLabel>
            <FormControl className="col-span-7">
              <UiInput
                disabled={disabled}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
export default Input;
