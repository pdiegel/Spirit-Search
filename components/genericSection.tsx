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
      className={`grid grid-cols-1 sm:grid-cols-2 gap-[20px] sm:gap-[30px] lg:gap-[40px] items-center ${
        darkBgColor ? "bg-primaryDark/50" : ""
      } ${
        containsImg ? "sm:flex-row sm:gap-[70px] lg:gap-[90px]" : ""
      } py-[50px] px-[20px] sm:px-[50px] lg:px-[240px]`}
    >
      {children}
    </section>
  );
}
