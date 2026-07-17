export function TimezoneBadge({ offset }: { offset: string }) {
  const positive = !offset.startsWith("-");
  return (
    <span
      className="font-mono text-sm font-semibold dark:text-white"
      style={{ color: positive ? "#34d399" : "#f87171" }}
    >
      UTC{offset}
    </span>
  );
}
