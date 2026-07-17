export function CountryBadge({ code }: { code: string }) {
  return (
    <span className="inline-flex items-center rounded-[4px] border border-white/[0.12] bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] font-bold text-white/60 tracking-wider">
      {code}
    </span>
  );
}
