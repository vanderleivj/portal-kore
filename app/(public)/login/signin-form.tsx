"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FormSchema, useSignin } from "./hooks/useSignin";

export function SignInForm() {
  const { form, onSubmit } = useSignin();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({
              field,
            }: {
              field: ControllerRenderProps<z.infer<typeof FormSchema>>;
            }) => (
              <FormItem>
                <FormLabel className="text-gray-500">E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500">Senha</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-16 " type="submit">
          Entrar
        </Button>
      </form>
    </Form>
  );
}
