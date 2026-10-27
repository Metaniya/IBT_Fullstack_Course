import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { safeNext } from "@/lib/safeNext";
import SignInForm from "./SignInForm";

export const metadata = { title: "Sign in", robots: { index: false } };

export default async function SignInPage({ searchParams }) {
  const sp = await searchParams;
  const next = safeNext(sp.next);

  const user = await getSession();
  if (user) redirect(next);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <SignInForm next={next} />

      <div className="mt-8 text-sm text-gray-600">
        <p className="font-semibold">Demo accounts</p>
        <p>Customer: 0911111111 / abel-pass-1</p>
        <p>Customer: 0922222222 / sara-pass-2</p>
        <p>Staff: 0933333333 / kitchen-pass-3</p>
      </div>
    </main>
  );
}