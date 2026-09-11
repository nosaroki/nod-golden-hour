// Repère de section minimal : un label tracké, sans tiret ni filet.
export default function SectionHeader({ label }: { label: string }) {
  return <p className="section-label">{label}</p>;
}
