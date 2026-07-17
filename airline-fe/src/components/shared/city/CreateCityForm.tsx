import { CreateCityRequest } from "@/store/city/city-types";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../../ui/field";
import { Input } from "../../ui/input";
import { SelectCountry } from "./SelectCountry";
import { SelectCountryCode } from "./SelectCountryCode";

const CreateCityForm = ({
  form,
  onSubmit,
  countries,
}: {
  form: ReturnType<typeof useForm<CreateCityRequest>>;
  onSubmit: (data: CreateCityRequest) => void;
  countries: { countryCode: string; countryName: string }[];
}) => {
  return (
    <Card className="bg-white dark:bg-zinc-950 text-white w-full max-w-2xl rounded-sm shadow-md ">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-black dark:text-white">
          Create City
        </CardTitle>
        <CardDescription>
          Enter the details to create a new city.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="sm:flex gap-4 ">
              <Field>
                <FieldLabel className="text-black dark:text-white">
                  City Name
                </FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="John"
                    {...form.register("name")}
                    className="focus-visible:ring-primary/20 focus-visible:border-primary/50 bg-white text-black rounded-sm shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] transition-all focus:scale-[1.01] dark:shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]"
                  />
                </FieldContent>
                <FieldDescription>Enter the name of the city.</FieldDescription>
                <FieldError>{form.formState.errors.name?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel className="text-black dark:text-white">
                  City Code
                </FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="Doe"
                    {...form.register("cityCode")}
                    className="focus-visible:ring-primary/20 focus-visible:border-primary/50 bg-white text-black rounded-sm shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] transition-all focus:scale-[1.01] dark:shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]"
                  />
                </FieldContent>
                <FieldDescription>Enter the city code.</FieldDescription>
                <FieldError>
                  {form.formState.errors.cityCode?.message}
                </FieldError>
              </Field>
            </div>

            <div className="sm:flex gap-4">
              <Field>
                <FieldLabel className="text-black dark:text-white">
                  Country Code
                </FieldLabel>
                <FieldContent>
                  <SelectCountryCode items={countries} />
                </FieldContent>
                <FieldDescription>Enter the country code.</FieldDescription>
                <FieldError>
                  {form.formState.errors.countryCode?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel className="text-black dark:text-white">
                  Country Name
                </FieldLabel>
                <FieldContent>
                  <SelectCountry items={countries} />
                </FieldContent>
                <FieldDescription>Enter the country name.</FieldDescription>
                <FieldError>
                  {form.formState.errors.countryName?.message}
                </FieldError>
              </Field>
            </div>

            <Field>
              <FieldLabel className="text-black dark:text-white">
                Region Code
              </FieldLabel>
              <FieldContent>
                <Input
                  placeholder="US-CA-123"
                  {...form.register("regionCode")}
                  className="focus-visible:ring-primary/20 focus-visible:border-primary/50 bg-white text-black rounded-sm shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] transition-all focus:scale-[1.01] dark:shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]"
                />
              </FieldContent>
              <FieldDescription>Enter the region code.</FieldDescription>
              <FieldError>
                {form.formState.errors.regionCode?.message}
              </FieldError>
            </Field>

            <Field>
              <FieldLabel className="text-black dark:text-white">
                Time Zone Offset
              </FieldLabel>
              <FieldContent>
                <Input
                  placeholder="+05:30"
                  {...form.register("timeZoneOffset")}
                  className="focus-visible:ring-primary/20 focus-visible:border-primary/50 bg-white text-black rounded-sm shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] transition-all focus:scale-[1.01] dark:shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]"
                />
              </FieldContent>
              <FieldDescription>Enter the time zone offset.</FieldDescription>
              <FieldError>
                {form.formState.errors.timeZoneOffset?.message}
              </FieldError>
            </Field>

            <Button
              type="submit"
              className="flex w-full items-center justify-center gap-2 text-black cursor-pointer rounded-sm transition-all hover:scale-[1.02] active:scale-95"
            >
              Create City
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default CreateCityForm;
