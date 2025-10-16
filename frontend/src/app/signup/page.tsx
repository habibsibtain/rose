import AuthForm from "@/components/AuthForm";

export default function SignupPage() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <AuthForm mode="signup" />
    </div>
  );
}


