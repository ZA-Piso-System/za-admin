import RegisterForm from "@/app/(auth)/register/_components/register-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register",
}

export default function Register() {
  return (
    <main className="container mx-auto p-4">
      <RegisterForm />
    </main>
  )
}
