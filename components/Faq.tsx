import { faq } from "@/content/faq";

export function Faq() {
  const answered = faq.filter((f) => f.answer !== null);
  return (
    <section id="faq" className="sec" aria-labelledby="faq-title">
      <div className="grid content-start gap-4">
        <p className="t-label">Questions</p>
        <h2 id="faq-title" className="t-h2" data-motion="lift">
          Before you order
        </h2>
      </div>
      <div className="fq__list">
        {answered.map((f) => (
          <details key={f.question} className="fq__item">
            <summary>
              <span className="rule" aria-hidden="true" data-motion="rule" />
              <span className="t-h4">{f.question}</span>
              <span className="fq__sign" aria-hidden="true" />
            </summary>
            <p>{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
