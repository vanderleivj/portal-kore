import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

export const FormSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(2, { message: "Senha é obrigatória" }),
});

export const useSignin = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    router.push("/");
  }
  return { form, onSubmit };
};
