import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Databases, tools, and primary sources behind ReadingFrame's biotech and AI research breakdowns — curated for students and self-learners.",
  alternates: { canonical: "https://reading-frame.com/resources/" },
};

type Resource = { name: string; href: string; note: string };
type Group = { heading: string; blurb: string; items: Resource[] };

const groups: Group[] = [
  {
    heading: "Databases & primary sources",
    blurb:
      "Where the underlying data and papers live. These are the first places I check before writing about a finding.",
    items: [
      { name: "PubMed", href: "https://pubmed.ncbi.nlm.nih.gov/", note: "Biomedical literature index from the NCBI." },
      { name: "bioRxiv", href: "https://www.biorxiv.org/", note: "Preprint server for biology — where a lot of work appears first." },
      { name: "Ensembl", href: "https://www.ensembl.org/", note: "Genome browser and annotation for vertebrates and model organisms." },
      { name: "UniProt", href: "https://www.uniprot.org/", note: "Protein sequence and functional annotation database." },
      { name: "RCSB Protein Data Bank", href: "https://www.rcsb.org/", note: "3D structures of proteins, nucleic acids, and complexes." },
      { name: "AlphaFold Protein Structure DB", href: "https://alphafold.ebi.ac.uk/", note: "Predicted protein structures from DeepMind & EMBL-EBI." },
      { name: "ClinicalTrials.gov", href: "https://clinicaltrials.gov/", note: "Registry of clinical studies — useful for checking trial claims." },
    ],
  },
  {
    heading: "Tools I actually use",
    blurb:
      "The stack behind the analysis side of these breakdowns — mostly Python, mostly free.",
    items: [
      { name: "Google Colab", href: "https://colab.research.google.com/", note: "Free, browser-based notebooks with GPUs." },
      { name: "Biopython", href: "https://biopython.org/", note: "Python tools for computational molecular biology." },
      { name: "scikit-learn", href: "https://scikit-learn.org/", note: "Classic machine-learning library for Python." },
      { name: "PyTorch", href: "https://pytorch.org/", note: "Deep-learning framework used for most modern models." },
      { name: "PyTorch Geometric", href: "https://pyg.org/", note: "Graph neural networks on top of PyTorch." },
      { name: "Hugging Face", href: "https://huggingface.co/", note: "Models, datasets, and tooling for ML." },
    ],
  },
  {
    heading: "Learning & background",
    blurb:
      "Good starting points if you want to go deeper than a breakdown — no paywall required.",
    items: [
      { name: "MIT OpenCourseWare — Biology", href: "https://ocw.mit.edu/search/?d=Biology", note: "Full university courses, free." },
      { name: "StatQuest (YouTube)", href: "https://www.youtube.com/@statquest", note: "Clear explanations of statistics and ML concepts." },
      { name: "Rosalind", href: "https://rosalind.info/", note: "Learn bioinformatics by solving problems." },
      { name: "Khan Academy — Biology", href: "https://www.khanacademy.org/science/biology", note: "Fundamentals, explained from scratch." },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="rf-container py-12">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Resources", url: `${SITE_URL}/resources/` },
        ])}
      />

      <header className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--rf-accent)]">
          Reference
        </span>
        <h1 className="mt-2 text-3xl font-semibold md:text-4xl">Resources</h1>
        <p className="mt-3 text-[var(--rf-text-muted)]">
          The databases, tools, and primary sources I lean on when breaking down biotech and AI
          research. Everything here is free or openly accessible — useful whether you&apos;re a
          student, a self-learner, or just want to read the source instead of the headline.
        </p>
      </header>

      <div className="mt-10 space-y-12">
        {groups.map((group) => (
          <section key={group.heading}>
            <h2 className="text-xl font-semibold">{group.heading}</h2>
            <p className="mt-1 max-w-2xl text-sm text-[var(--rf-text-muted)]">{group.blurb}</p>
            <ul className="mt-5 grid list-none gap-4 p-0 sm:grid-cols-2">
              {group.items.map((item) => (
                <li
                  key={item.href}
                  className="rounded-[var(--rf-radius)] border border-[var(--rf-border)] bg-[var(--rf-bg-elevated)] p-4"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--rf-accent)] no-underline hover:underline"
                  >
                    {item.name} ↗
                  </a>
                  <p className="mt-1 text-sm text-[var(--rf-text-muted)]">{item.note}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="rounded-[var(--rf-radius)] border border-[var(--rf-border)] bg-[var(--rf-bg-muted)] p-6">
          <h2 className="text-lg font-semibold">Suggest a resource</h2>
          <p className="mt-2 text-sm text-[var(--rf-text-muted)]">
            Run a useful open database, tool, or course? If it fits the bio/AI audience here, send it
            over via the{" "}
            <a href="/contact/" className="text-[var(--rf-accent)] font-semibold no-underline">
              contact page
            </a>{" "}
            and I&apos;ll take a look.
          </p>
        </section>
      </div>
    </div>
  );
}
