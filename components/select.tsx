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
  data: any[] | null;
}

const Select = <T extends FieldValues>({
  form,
  name,
  label,
  data,
}: SelectProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="grid grid-cols-9 md:gap-6 gap-3">
            <FormLabel className="col-span-2 text-end">{label}</FormLabel>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl className="col-span-7 w-full">
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "w-[275px] justify-between bn",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? data?.find((item) => item.id === field.value)?.label
                      : "Select"}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="w-[275px] p-0 bn">
                <Command>
                  <CommandInput
                    placeholder="Search category..."
                    className="h-9"
                  />
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup className="h-60 overflow-auto">
                    {data?.map((item) => (
                      <CommandItem
                        value={item.label}
                        key={item.id}
                        onSelect={(value) => {
                          const fieldValue =
                            field.value === item.id ? null : item.id;
                          form.setValue(name, fieldValue);
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
    </>
  );
};
export default Select;
