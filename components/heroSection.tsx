import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  title: string;
  description: string;
  bgImage: string;
  bgOpacity?: number;
  buttons?: { text: string; href: string }[];
  fgImage?: string;
  fgImageAlt?: string;
  textAlignment?: "left" | "center";
}

export default function HeroSection({
  title,
  description,
  bgImage,
  bgOpacity = 100,
  buttons,
  fgImage,
  fgImageAlt,
  textAlignment = "left",
}: HeroSectionProps): JSX.Element {
  const itemAlignment = textAlignment === "center" ? "items-center" : "";

  return (
    <section
      className={`flex flex-col gap-[20px] sm:gap-[30px] lg:gap-[40px] text-${textAlignment} ${itemAlignment} px-20 py-50 sm:p-50 lg:px-240 lg:py-100 bg-cover bg-center bg-no-repeat bg-opacity-${bgOpacity}`}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
    >
      {title && <h1 className="text-4xl lg:text-6xl">{title}</h1>}
      {description && <p className="text-base">{description}</p>}
      {fgImage && (
        <Image
          src={fgImage}
          alt={fgImageAlt || "Foreground Image"}
          className="sm:w-[300px] sm:h-[300px]"
          width={200}
          height={200}
        />
      )}
      {buttons && (
        <div className="flex flex-col sm:flex-row gap-[10px] sm:gap-[15px] lg:gap-[20px]">
          {buttons.map((button, index) => {
            let btnClass =
              index % 2 === 0 ? "button-primary" : "button-secondary";
            return (
              <Link
                key={index}
                className={`${btnClass} text-base`}
                href={button.href}
              >
                {button.text}
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
