import { AuthForm } from "@/components/AuthForm";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function LoginPage() {
  return (
    <div className="flex min-h-[80vh] flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-md overflow-hidden rounded-3xl shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-2xl">
            Welcome Back
          </CardTitle>
        </CardHeader>

        <AuthForm type="login" />
      </Card>
    </div>
  );
}

export default LoginPage;