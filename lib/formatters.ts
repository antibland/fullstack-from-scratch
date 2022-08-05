import formatDuration from "format-duration";

export const formatTime = (timeSeconds = 0): string => {
  return formatDuration(timeSeconds * 1000);
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
