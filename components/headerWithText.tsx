export default function HeaderWithText({
  header,
  textContents,
  subHeadings = [],
  subHeadingBgColor = "bg-primaryDark/50",
  textAlignment = "left",
}: {
  header: string;
  textContents: string[];
  subHeadings?: string[];
  subHeadingBgColor?: string;
  textAlignment?: "left" | "center" | "right";
}) {
  // These are pixel values
  const gapAmounts: { [key: string]: number } = {
    small: 10,
    medium: 20,
    large: 30,
  };

  subHeadings.length > 0 &&
    Object.entries(gapAmounts).map(([key, value]) => {
      gapAmounts[key] = value * 2;
    });

  return (
    <div
      className={`text-${textAlignment} flex flex-col gap-[${gapAmounts["small"]}px] sm:gap-[${gapAmounts["medium"]}px] lg:gap-[${gapAmounts["large"]}px]`}
    >
      <h2 className="text-3xl font-semibold">{header}</h2>
      {textContents.map((text, index) => (
        <div
          key={index}
          className={`text-${textAlignment} ${
            textAlignment === "center" ? "mx-auto" : ""
          } ${
            subHeadings.length > 0
              ? `sm:${subHeadingBgColor} sm:p-[15px] sm:rounded-lg lg:p-[20px]`
              : ""
          }`}
        >
          {subHeadings.length > index && (
            <h3 className="text-2xl">{subHeadings[index]}</h3>
          )}
          <p className="text-base max-w-[50ch]">{text}</p>
        </div>
      ))}
    </div>
  );
}
