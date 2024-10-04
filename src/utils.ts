import { ApiError } from "./api/error";

export const getSwedishFormattedTime = (dateString: string) => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return new Intl.DateTimeFormat("se-sv", options).format(date);
};

export const getErrorMessages = (error: any): string => {
  let message = error.message;

  if (error instanceof ApiError && error.errors) {
    message = error.errors.map((item) => item.message).join(", ");
  }

  return message;
};
