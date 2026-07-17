import CreateCityForm from "@/components/shared/city/CreateCityForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useCreateCity } from "@/hooks/city/mutation/useCreateCity";
import { useSuspenseQuery } from "@tanstack/react-query";
import { countriesQueryOptions } from "@/routes/city";
import { useMemo } from "react";

const CreateCity = () => {
  const createCityMutation = useCreateCity();

  const { data: countries } = useSuspenseQuery(countriesQueryOptions);

  // Memoize the schema to prevent recreation on every render
  const formSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, "City name must be at least 2 characters"),
        cityCode: z.string().min(3, "City code must be at least 3 characters"),
        countryCode: z
          .string()
          .refine(
            (value) => countries?.some((c) => c.countryCode === value),
            "Invalid country code",
          ),
        countryName: z
          .string()
          .refine(
            (value) => countries?.some((c) => c.countryName === value),
            "Invalid country name",
          ),
        regionCode: z
          .string()
          .min(2, "Region code must be at least 2 characters"),
        timeZoneOffset: z
          .string()
          .min(3, "Time zone offset must be at least 3 characters"),
      }),
    [countries],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      cityCode: "",
      countryCode: "",
      countryName: "",
      regionCode: "",
      timeZoneOffset: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    createCityMutation.mutate({
      name: data.name,
      cityCode: data.cityCode,
      countryCode: data.countryCode,
      countryName: data.countryName,
      regionCode: data.regionCode,
      timeZoneOffset: data.timeZoneOffset,
    });

    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content:
          "flex flex-col gap-2 bg-zinc-950 text-white rounded-sm shadow-md",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  return (
    <CreateCityForm form={form} onSubmit={onSubmit} countries={countries} />
  );
};

export default CreateCity;
