import GenericSection from "@/components/genericSection";
import HeaderWithText from "@/components/headerWithText";
import HeroSection from "@/components/heroSection";
import TextCard from "@/components/textCard";
import AboutImg from "@/public/heroImages/about.jpg";
import Image from "next/image";
import CocktailImg from "@/public/flavorImages/cocktail.png";

export default function Page() {
  const textCardContents = [
    {
      heading: "Smart Filtering",
      pText: [
        "Narrow down your search with filters for glass type, alcohol content, and drink category.",
      ],
    },
    {
      heading: "Discover New Cocktails",
      pText: [
        "Whether you prefer alcoholic or non-alcoholic drinks, there`s something for everyone.",
      ],
    },
    {
      heading: "Save Your Favorites",
      pText: [
        "Bookmark cocktails you love for quick access anytime. Build your personal collection of go-to recipes.",
      ],
    },
  ];
  return (
    <main className="flex flex-col min-h-screen items-center">
      <HeroSection
        heading="About SpiritSearch: Mixology Made Easy"
        pText={[
          "Welcome to SpiritSearch. We make finding cocktail recipes simple.",
          "Whether you're a cocktail lover or just starting out, our app guides you through an extensive list of over 500 cocktails, helping you make great drinks with what you have at home.",
        ]}
        bgImage={AboutImg}
      />
      <GenericSection>
        <div className="flex flex-col justify-center gap-8">
          <h2 className="text-3xl text-center">Our Features</h2>
          <div className="flex flex-col lg:flex-row gap-8">
            {textCardContents.map((content, index) => (
              <TextCard
                key={index}
                heading={content.heading}
                pText={content.pText}
              />
            ))}
          </div>
        </div>
      </GenericSection>
      <GenericSection darkBgColor containsImg>
        <Image
          src={CocktailImg}
          alt="Cocktail"
          placeholder="blur"
          className="largeImg"
        />
        <HeaderWithText
          header="Why SpiritSearch?"
          textContents={[
            "SpiritSearch blends sleek design with powerful functionality.",
            "Created using React, Next.js, and API integration, our app is more than just a project; It`s a doorway to the vast, vibrant world of mixology.",
            "We`re on a mission to make cocktail exploration straightforward and enjoyable for everyone.",
          ]}
        />
      </GenericSection>
    </main>
  );
}
