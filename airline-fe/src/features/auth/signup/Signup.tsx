import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { useLogin } from "@/hooks/auth/useLogin";
import { Route } from "@/routes/auth/signup";
import SignupForm from "@/components/shared/auth/SignupForm";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().min(10, "Email must be at least 10 characters").email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
});

const Signup = () => {
  const { searchParams } = Route.useSearch();
  const { loginMutation } = useLogin(searchParams?.redirect || "/");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });

    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  return <SignupForm form={form} onSubmit={onSubmit} />;
};

export default Signup;
