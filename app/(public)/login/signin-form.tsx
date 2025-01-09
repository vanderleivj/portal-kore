"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FormData } from "./types/form";
import { ControllerRenderProps } from "react-hook-form";
import { useSignin } from "./hooks/useSignin";

export function SignInForm() {
  const { form, onSubmit } = useSignin();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({
            field,
          }: {
            field: ControllerRenderProps<FormData, "username">;
          }) => (
            <FormItem>
              <FormLabel className="text-gray-500">Usuário</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu usuário" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({
            field,
          }: {
            field: ControllerRenderProps<FormData, "password">;
          }) => (
            <FormItem>
              <FormLabel className="text-gray-500">Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <div className="text-red-500 text-sm">
            {form.formState.errors.root.message}
          </div>
        )}

        <Button
          className="w-full mt-6"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}
