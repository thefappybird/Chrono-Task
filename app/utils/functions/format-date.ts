const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short", // 👈 Jan, Feb, Mar
  day: "2-digit",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export function formatDateShortMonth(iso: Date) {
  return formatter.format(new Date(iso)).replace(",", "");
}

export function formatColumnDate(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
