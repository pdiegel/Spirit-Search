import { ReactNode } from "react";

export default function GenericSection({
  children,
  darkBgColor = false,
  containsImg = false,
}: {
  children: ReactNode;
  darkBgColor?: boolean;
  containsImg?: boolean;
}) {
  return (
    <section
      className={`w-full py-[50px] px-[20px] sm:px-[50px] lg:px-0 ${
        darkBgColor ? "bg-primaryDark/50" : ""
      }`}
    >
      <div
        className={`grid grid-cols-1 mx-auto max-w-[1100px] lg:px-12 ${
          containsImg ? "sm:grid-cols-2" : ""
        } gap-8 items-center ${
          containsImg ? "sm:flex-row sm:gap-[70px] lg:gap-[90px]" : ""
        }  `}
      >
        {children}
      </div>
    </section>
  );
}
