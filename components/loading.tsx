import Image from "next/image";
import LoadingGif from "@/public/loading.gif";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-60">
      <Image src={LoadingGif} alt="Loading" height={200} width={200} />
    </div>
  );
}
