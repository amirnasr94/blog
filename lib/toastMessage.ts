import { toast, ToasterProps } from "sonner";
import { CircleCheck, Info, TriangleAlert, CircleX } from "lucide-react";
import { createElement } from "react";

const defaultOptions: ToasterProps = {
  position: "bottom-right",
  duration: 1500,
  closeButton: true,
  style: { gap: 10 },
} as const;

export default class ToastMessage {
  constructor() {}

  success(message: string, description: string) {
    toast(message, {
      description,
      icon: createElement(CircleCheck, {
        color: "green",
      }),
      ...defaultOptions,
    });
  }

  warning(message: string, description: string) {
    toast(message, {
      description,
      icon: createElement(TriangleAlert, {
        color: "yellow",
      }),

      ...defaultOptions,
    });
  }

  info(message: string, description: string) {
    toast(message, {
      description,
      icon: createElement(Info, {
        color: "blue",
      }),
      ...defaultOptions,
    });
  }

  error(message: string, description: string) {
    toast(message, {
      description,
      icon: createElement(CircleX, {
        color: "red",
      }),
      ...defaultOptions,
    });
  }
}
