"use client";

import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
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
import { CaretSortIcon, CheckIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import CreateTag from "./create-tag";

interface SelectProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  data: any[];
}
const MultiSelect = <T extends FieldValues>({
  form,
  name,
  label,
  data,
}: SelectProps<T>) => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
                      "w-[275px] justify-between h-fit",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value && field.value.length > 0 ? (
                      <div className="flex flex-wrap max-w-[100%] gap-1">
                        {field.value.map((id: any) => {
                          const label = data.find(
                            (item) => item.id === id
                          )?.label;
                          return (
                            <div
                              key={id}
                              className="px-2 py-1 mr-1 rounded-sm bg-gray-100 text-xs"
                            >
                              {label}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      "Select"
                    )}

                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <FormMessage />

              <PopoverContent className="w-[275px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search category..."
                    className="h-9"
                  />
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup className="h-60 overflow-auto">
                    {data.map((item) => (
                      <CommandItem
                        value={item.label}
                        key={item.id}
                        onSelect={() => {
                          const selectedIds = form.getValues(name) as Path<T>[];
                          const updatedIds = selectedIds.includes(item.id)
                            ? selectedIds.filter((id) => id !== item.id)
                            : [...selectedIds, item.id];
                          form.setValue(name, updatedIds as any, {
                            shouldValidate: true,
                          });
                          setOpen(false);
                        }}
                      >
                        {item.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            field.value?.includes(item.id)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                      "w-[275px] bg-slate-200 justify-between h-fit text-slate-800 rounded-none"
                    )}
                  >
                    <PlusIcon className="h-4 w-4" />
                    Add new...
                  </Button>
                  {isOpen && (
                    <CreateTag
                      open={isOpen}
                      onClose={() => setIsOpen(!isOpen)}
                    />
                  )}
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
    </>
  );
};
export default MultiSelect;
