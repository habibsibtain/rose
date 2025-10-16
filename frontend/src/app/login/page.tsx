import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <AuthForm mode="login" />
    </div>
  );
}


