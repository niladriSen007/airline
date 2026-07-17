import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectCountryCode({
  items,
}: {
  items: { countryCode: string; countryName: string }[];
}) {
  const form = useFormContext();
  const countryCode = form.watch("countryCode");

  const countryItems = items.map((item) => ({
    label: item.countryCode,
    value: item.countryCode,
  }));

  return (
    <Select
      value={countryCode}
      onValueChange={(value) =>
        form.setValue("countryCode", value, { shouldValidate: true })
      }
    >
      <SelectTrigger className="w-full bg-white rounded-sm text-black cursor-pointer dark:hover:bg-white">
        <SelectValue placeholder="Select country code" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Country Code</SelectLabel>
          {countryItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
