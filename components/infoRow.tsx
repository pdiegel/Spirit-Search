export default function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-wrap md:flex-col gap-2 md:gap-0 bg-primaryDark/50 p-4 rounded-lg items-center">
      <p className="text-xl font-semibold">
        {label} <span className="md:hidden"> - </span>
      </p>
      <p>{value}</p>
    </div>
  );
}
