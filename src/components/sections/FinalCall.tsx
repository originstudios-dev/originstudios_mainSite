export function FinalCall() {
  return (
    <section id="contact" className="py-32 md:py-40 px-8 md:px-16 max-w-7xl mx-auto">
      <span className="font-satoshi text-xs text-label tracking-[0.2em] uppercase">
        Let&apos;s build
      </span>

      <h2 className="font-clash text-4xl md:text-6xl font-bold uppercase tracking-tight mt-6 leading-[1.1]">
        Your Competitors Are Building Websites.
        <br />
        You Could Be Building the System That Beats Them.
      </h2>

      <p className="font-satoshi text-base text-body mt-6 max-w-xl">
        Discovery calls are free. A generic digital presence is expensive.
      </p>

      <div className="mt-12 flex flex-col items-start gap-4">
        <a
          href="#"
          data-cursor="expand"
          className="font-satoshi text-sm font-medium bg-primary text-bg px-8 py-3.5 hover:bg-white/90 transition-colors"
        >
          Book a Free Discovery Call →
        </a>

        <p className="font-satoshi text-xs text-muted">
          Or email us directly:{" "}
          <a
            href="mailto:hello@originstudios.dev"
            className="text-label hover:text-primary transition-colors"
          >
            hello@originstudios.dev
          </a>
        </p>
      </div>
    </section>
  );
}
