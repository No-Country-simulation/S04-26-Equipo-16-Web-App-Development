"use state";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";
import { useState } from "react";

type DatePickerProps = {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  invalid?: boolean;
  placeholder?: string;
};

export default function DatePicker({
  value,
  onChange,
  invalid,
  placeholder = "Pick a date",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button
          id="personal-data-form-birth"
          variant="outline"
          className="justify-between"
          aria-invalid={invalid}
          onClick={() => setOpen(true)}
        >
          <span className={cn("font-light", !value && "text-muted-foreground")}>
            {value ? format(value, "PPP") : placeholder}
          </span>
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={value}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
