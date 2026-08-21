import logoAsset from "@/assets/aki-logo.png.asset.json";

type Props = { className?: string; alt?: string };

export function BrandLogo({ className = "h-10 w-10", alt = "AKI ESG" }: Props) {
  return (
    <img
      src={logoAsset.url}
      alt={alt}
      className={`select-none object-contain ${className}`}
      draggable={false}
    />
  );
}
