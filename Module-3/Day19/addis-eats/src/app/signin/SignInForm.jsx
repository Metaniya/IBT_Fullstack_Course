"use client";

import { useActionState } from "react";
import { signIn } from "../auth-actions";

export default function SignInForm({ next }) {
  const [state, formAction, pending] = useActionState(signIn, null);

  return (
    <form action={formAction} className="mt-4 max-w-sm space-y-3">
      <input type="hidden" name="next" value={next} />
      <label className="block text-sm">
        Phone
        <input name="phone" className="mt-1 block w-full border p-2" />
      </label>
      <label className="block text-sm">
        Password
        <input name="password" type="password" className="mt-1 block w-full border p-2" />
      </label>
      <button
        disabled={pending}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
      {state?.error && <p className="text-red-600">{state.error}</p>}
    </form>
  );
}