export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export type LoginData = Pick<SignupData, "email" | "password">;

export type UserType = Promise<
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
