"use server";

import { deleteSession } from "../lib";

export async function logout() {
  try {
    await deleteSession();
    return {
      success: true,
      status: 200,
      message: "Logout successfull.",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        status: 500,
        message: error.message,
      };
    }
  }
}
