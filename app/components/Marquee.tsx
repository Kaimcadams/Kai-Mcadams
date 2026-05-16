type Props = {
  items?: string[];
  tone?: "bone" | "cinema";
  slow?: boolean;
  className?: string;
};

const DEFAULT_ITEMS = ["Filmmaker", "Editor", "Critic", "New York"];

export default function Marquee({
  items = DEFAULT_ITEMS,
  tone = "bone",
  slow = false,
  className = "",
}: Props) {
  const loop = Array.from({ length: 8 }).flatMap(() => items);
  const color =
    tone === "cinema" ? "text-[var(--bone)]" : "text-[var(--bone-dim)]";
  const bg = tone === "cinema" ? "bg-[var(--cinema)]" : "bg-transparent";
  const border =
    tone === "cinema"
      ? "border-y border-[var(--cinema-deep)]"
      : "border-y border-[var(--rule)]";

  return (
    <div
      className={`relative overflow-hidden ${bg} ${border} py-4 ${className}`}
      aria-hidden
    >
      <div
        className={`marquee-track ${slow ? "marquee-track-slow" : ""} flex w-max whitespace-nowrap`}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0">
            {loop.map((item, i) => (
              <span
                key={`${dup}-${i}`}
                className={`font-mono uppercase ${color} text-[11px] tracking-[0.32em] px-6 flex items-center`}
              >
                {item}
                <span
                  className={`mx-6 ${tone === "cinema" ? "text-[var(--bone)]" : "text-[var(--cinema)]"}`}
                >
                  ★
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
