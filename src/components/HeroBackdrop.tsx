export default function HeroBackdrop({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0">
      <img src={src} alt={alt} className="w-full h-full object-cover" fetchPriority="high" />
      <div className="absolute inset-0" style={{ background: 'var(--hero-overlay)' }} />
    </div>
  );
}
