export default function GenericError({ text }: { text: string }) {
  return (
    <main className="min-h-screen">
      <h1 className="text-3xl font-bold text-center my-8">
        {text}. Please try again later.
      </h1>
    </main>
  );
}
