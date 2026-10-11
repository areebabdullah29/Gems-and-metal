"use client";

import Image from "next/image";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type FormState } from "@/app/admin/actions";

const initialState: FormState = { error: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:bg-silver-900 disabled:opacity-60"
    >
      {pending ? "Signing in..." : "Sign In"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <Image
          src="/brand/logo.png"
          alt="Gems and Metal"
          width={56}
          height={56}
          className="mx-auto h-14 w-14 object-contain"
        />
        <h1 className="mt-4 text-center font-display text-2xl text-ink">Owner Sign In</h1>

        <form action={formAction} className="mt-8 flex flex-col gap-4">
          <div>
            <label htmlFor="password" className="text-xs uppercase tracking-[0.15em] text-ink-soft">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="mt-2 w-full border border-line bg-paper-raised px-4 py-3 text-sm text-ink outline-none focus:border-ink"
            />
          </div>

          {state.error && <p className="text-sm text-red-700">{state.error}</p>}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
