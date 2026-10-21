import "next-auth";
import "next-auth/jwt";

type AppUser = {
  name: string;
  email: string;
  role: string;
};

declare module "next-auth" {
  interface User {
    user: AppUser;
    token: string;
  }
  interface Session {
    user: AppUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: AppUser;
    token: string;
  }
}
