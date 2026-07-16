import { useForm } from "react-hook-form";

import { LoginRequest } from "@/store/auth/auth-types";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";

const LoginForm = ({
  form,
  onSubmit,
}: {
  form: ReturnType<typeof useForm<LoginRequest>>;
  onSubmit: (data: LoginRequest) => void;
}) => {
  return (
    <Card className="bg-zinc-950 text-white w-full max-w-sm rounded-sm shadow-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <Input
                placeholder="you@company.com"
                {...form.register("email")}
                className="focus-visible:ring-primary/20 focus-visible:border-primary/50 bg-white rounded-sm shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] transition-all focus:scale-[1.01] dark:shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]"
              />
            </FieldContent>
            <FieldDescription>
              We &apos;ll use this to identify your account.
            </FieldDescription>
            <FieldError className="bg-destructive/10 border-destructive/50 rounded-sm border p-1 text-xs shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.15),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]">
              {form.formState.errors.email?.message}
            </FieldError>
          </Field>

          <Field>
            <FieldLabel>Password</FieldLabel>
            <FieldContent>
              <Input
                type="password"
                placeholder="********"
                {...form.register("password")}
                className="focus-visible:ring-primary/20 focus-visible:border-primary/50 bg-white rounded-sm shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] transition-all focus:scale-[1.01] dark:shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]"
              />
            </FieldContent>
            <FieldDescription>
              Make sure it&apos;s at least 6 characters long.
            </FieldDescription>
            <FieldError className="bg-destructive/10 border-destructive/50 rounded-sm border p-1 text-xs shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),inset_0px_-1px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.15),inset_0px_-1px_0px_0px_rgba(0,0,0,0.7)]">
              {form.formState.errors.password?.message}
            </FieldError>
          </Field>

          <Button
            type="submit"
            className="flex w-full items-center justify-center gap-2 text-black cursor-pointer rounded-sm transition-all hover:scale-[1.02] active:scale-95"
          >
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
