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

export function SelectCountry({
  items,
}: {
  items: { countryCode: string; countryName: string }[];
}) {
  const form = useFormContext();
  const countryName = form.watch("countryName");

  const countryItems = items.map((item) => ({
    label: item.countryName,
    value: item.countryName,
  }));

  return (
    <Select
      value={countryName}
      onValueChange={(value) =>
        form.setValue("countryName", value, { shouldValidate: true })
      }
    >
      <SelectTrigger className="w-full bg-white rounded-sm text-black cursor-pointer dark:hover:bg-white">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Countries</SelectLabel>
          {countryItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
