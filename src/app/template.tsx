// Re-mounts on every navigation, so these CSS animations replay as a page transition.
// Pure CSS keeps the first paint visible even before hydration.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden className="page-curtain pointer-events-none fixed inset-0 z-[55] bg-gradient-to-b from-signal to-signal-deep" />
      <div className="page-enter">{children}</div>
    </>
  );
}
