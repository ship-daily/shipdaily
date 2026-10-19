import { ChalkFilters } from "@/components/marketing/chalk-filters";
import { Chalkboard } from "@/components/marketing/chalkboard";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Chalkboard />
      <ChalkFilters />
      {children}
    </>
  );
}
