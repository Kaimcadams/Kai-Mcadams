export default function SubscribeForm() {
  return (
    <div className="border border-[var(--rule)] bg-[var(--ink-2)] p-8 md:p-12">
      <p className="label mb-3 text-[var(--cinema)]">Subscribe</p>
      <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-6">
        New dispatches,
        <br />
        delivered after dark.
      </h3>
      <p className="text-[var(--bone-dim)] max-w-md mb-8">
        Free. No spam, occasional bloodshed. Gorehound Grindhouse arrives in
        your inbox, on a witching-hour schedule.
      </p>
      <div className="border border-[var(--rule)] bg-[var(--ink)]">
        <iframe
          src="https://kaimcadams.substack.com/embed"
          width="100%"
          height="320"
          style={{ border: "none", background: "transparent" }}
          scrolling="no"
          className="subscribe-frame block w-full"
          title="Subscribe to Gorehound Grindhouse"
        />
      </div>
    </div>
  );
}
