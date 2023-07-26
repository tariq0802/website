import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";

interface TextAreaProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  disabled: boolean;
  placeholder?: string;
}

const TextArea = <T extends FieldValues>({
  form,
  name,
  disabled,
  label,
  placeholder,
}: TextAreaProps<T>) => {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="md:grid md:grid-cols-4 gap-6 ">
            <FormLabel className="md:col-span-1 text-end pt-4">
              {label}
            </FormLabel>
            <FormControl className="md:col-span-3">
              <Textarea
                disabled={disabled}
                placeholder={placeholder ? placeholder : "Description"}
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
export default TextArea;
