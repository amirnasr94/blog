import { useMutation } from "@tanstack/react-query";
import { postUser } from "../api/mutations";
import ToastMessage from "@/lib/toastMessage";

export function useSignUpMutation() {
  const toastMessage = new ToastMessage();
  const mutation = useMutation({
    mutationFn: postUser,
    onSuccess: ({ message }) => {
      toastMessage.success("Successfull!", message);
    },
    onError(error) {
      toastMessage.error("Failed", error.message);
    },
  });

  return {
    submitSignup: mutation.mutate,
  };
}
