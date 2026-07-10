import type { Service } from "@/types/service";

type ServiceCardProps = Readonly<{
  service: Service;
  index: number;
}>;

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <article className="group flex min-h-72 flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-2 hover:border-blue-400/50 hover:bg-white/[0.06]">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-blue-300">
          Ato 0{index + 1}
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-xs text-white/40 transition group-hover:border-blue-300/40 group-hover:bg-blue-400/10 group-hover:text-blue-200">
          +
        </span>
      </div>
      <div>
        <h3 className="text-balance text-2xl font-semibold tracking-[-0.03em] text-white">
          {service.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-zinc-400">
          {service.description}
        </p>
      </div>
    </article>
  );
}
