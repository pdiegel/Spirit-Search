import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  heading: string;
  bgImage: StaticImageData;
  pText?: string;
  buttons?: { text: string; href?: string; onClick?: Function }[];
  fgImage?: string;
  fgImageAlt?: string;
  textAlignment?: "left" | "center";
}

export default function HeroSection({
  heading,
  bgImage,
  pText,
  buttons,
  fgImage,
  fgImageAlt,
  textAlignment = "left",
}: HeroSectionProps): JSX.Element {
  const itemAlignment = textAlignment === "center" ? "items-center" : "";

  return (
    <section
      className={`bg-cover bg-center bg-no-repeat w-full`}
      style={bgImage ? { backgroundImage: `url(${bgImage.src})` } : {}}
    >
      <div
        className={`max-w-[1100px] mx-auto flex flex-col gap-[20px] sm:gap-[30px] lg:gap-[40px]  text-${textAlignment} ${itemAlignment} px-[20px] py-[50px] sm:p-[50px] lg:px-12`}
      >
        <div className="flex flex-col gap-[10px] sm:gap-[15px] lg:gap-[20px]">
          {heading && (
            <h1 className="text-4xl lg:text-6xl sm:max-w-[400px] lg:max-w-[600px]">
              {heading}
            </h1>
          )}
          {pText && (
            <p className="text-base sm:max-w-[400px] lg:max-w-[50ch]">
              {pText}
            </p>
          )}
        </div>
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
          <nav className="flex flex-col sm:flex-row gap-[10px] sm:gap-[15px] lg:gap-[20px]">
            {buttons.map((button, index) => {
              let btnClass =
                index % 2 === 0 ? "button-primary" : "button-secondary";
              return (
                <Link
                  key={index}
                  className={`${btnClass}`}
                  href={button.href ? button.href : "#"}
                  onClick={() =>
                    button.onClick ? button.onClick() : undefined
                  }
                >
                  {button.text}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </section>
  );
}
