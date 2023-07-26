"use client";

import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface SelectProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  data: any[];
}

const Select = <T extends FieldValues>({
  form,
  name,
  label,
  data,
}: SelectProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="md:grid md:grid-cols-4 gap-6 ">
            <FormLabel className="md:col-span-1 text-end pt-4">
              {label}
            </FormLabel>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl className="md:col-span-3">
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "w-[200px] justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? data.find((item) => item.id === field.value)?.label
                      : "Select"}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search category..."
                    className="h-9"
                  />
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {data.map((item) => (
                      <CommandItem
                        value={item.label}
                        key={item.id}
                        onSelect={(value) => {
                          form.setValue(name, item.id);
                          setOpen(false);
                        }}
                      >
                        {item.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            item.id === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
    </div>
  );
};
export default Select;
