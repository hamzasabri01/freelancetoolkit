export type ProcessStep = {
  title: string;
  description: string;
};

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {steps.map((step, index) => (
        <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:border-blue-200 hover:shadow-card">
          <span className="font-display text-3xl font-bold text-blue-100" aria-hidden="true">
            0{index + 1}
          </span>
          <h3 className="mt-3 text-sm font-bold text-ink">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink-muted">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
