interface SignupData {
  name: string;
  email: string;
  password: string;
}

type LoginData = Pick<SignupData, "email" | "password">;

type UserType = Promise<
  | {
      status: number;
      message: string;
      data?: {
        name: string;
        email: string;
        role: "admin" | "user";
      } | null;
    }
  | undefined
>;
