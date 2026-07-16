import LoginForm from "@/components/shared/LoginForm";
import { useLogin } from "@/hooks/auth/useLogin";
import { Route } from "@/routes/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(10, "Email must be at least 10 characters").email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
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

  return <LoginForm form={form} onSubmit={onSubmit} />;
};

export default Login;
