import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { format, isValid, parse } from "date-fns";

interface DateInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
}

const DateInput = <T extends FieldValues>({
  form,
  name,
  label,
}: DateInputProps<T>) => {
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
              <input
                type="date"
                className="flex h-9 w-[13.8rem] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                onBlur={field.onBlur}
                onChange={(e) => {
                  const inputDate = e.target.value;
                  const parsedDate = parse(inputDate, "yyyy-MM-dd", new Date());

                  if (isValid(parsedDate)) {
                    field.onChange(parsedDate);
                  } else {
                    field.onChange("");
                  }
                }}
                placeholder="dd/mm/yyyy"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};
export default DateInput;
