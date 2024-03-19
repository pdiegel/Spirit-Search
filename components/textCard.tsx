export default function TextCard({
  heading,
  pText,
  bgColor = "primaryDark/50",
}: {
  heading: string;
  pText: string[];
  bgColor?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 px-8 py-4 rounded-lg bg-${bgColor}`}>
      <h2 className="text-2xl text-center">{heading}</h2>
      {pText.map((text, index) => (
        <div key={index} className={`text-center`}>
          <p className="max-w-[50ch] mx-auto">{text}</p>
        </div>
      ))}
    </div>
  );
}
