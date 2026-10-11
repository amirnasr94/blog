"use server";

import { deleteSession } from "../lib";

type ResultAction = { success: true } | { success: false; error: string };

export async function logout(): Promise<ResultAction> {
  try {
    await deleteSession();
    return { success: true };
  } catch (error) {
    console.error("Logout action failed: ", error);
    return {
      success: false,
      error: "Failed to log out. Please try again later.",
    };
  }
}
