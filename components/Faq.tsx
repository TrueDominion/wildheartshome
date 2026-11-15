import { faq } from "@/content/faq";

export function Faq() {
  const answered = faq.filter((f) => f.answer !== null);
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-pad">
      <div className="wrap lg:grid lg:grid-cols-12 lg:gap-10">
        <h2 id="faq-title" className="t-h2 lg:col-span-4">
          Questions
        </h2>
        <div className="mt-8 border-t-2 border-ink lg:col-span-7 lg:col-start-6 lg:mt-0">
          {answered.map((f) => (
            <details key={f.question} className="group border-b border-ink/15">
              <summary className="flex items-center justify-between gap-6 py-4">
                <span className="t-h3">{f.question}</span>
                <span aria-hidden="true" className="faq-plus font-serif text-3xl leading-none text-coral-ink">
                  +
                </span>
              </summary>
              <p className="t-body max-w-[60ch] pb-6 text-ink-2">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
