import GuestSidebar from "@/components/guest/GuestSidebar";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        flex
        h-[100dvh]
        overflow-hidden
        bg-[var(--bg)]
      "
    >
      <GuestSidebar />
<main
  className="
    flex-1
    overflow-y-auto
    overflow-x-hidden
    custom-scrollbar

    pt-16
    md:pt-0

    md:ml-60
  "
>
  {children}
</main>
    </div>
  );
}