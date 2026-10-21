import AuthFeatures from "@/components/auth/auth-features";
import AuthTestimonial from "@/components/auth/auth-testimonial";
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="py-10">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-12 p-4 lg:grid-cols-2">
        <div>
          <AuthFeatures />
          <AuthTestimonial />
        </div>

        <RegisterForm />
      </div>
    </main>
  );
}