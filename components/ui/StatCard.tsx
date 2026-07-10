type StatCardProps = Readonly<{
  value: string;
  label: string;
}>;

export function StatCard({ value, label }: StatCardProps) {
  return (
    <article className="rounded-3xl border border-zinc-950/10 bg-white/70 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
      <strong className="block text-3xl font-semibold tracking-[-0.04em] text-zinc-950">
        {value}
      </strong>
      <span className="mt-2 block text-sm leading-5 text-zinc-600">
        {label}
      </span>
    </article>
  );
}
