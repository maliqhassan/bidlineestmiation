import { BlueprintBackground } from "@/components/Blueprint";
import { Magnetic } from "@/components/ui/motion";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden bg-ink px-4 pt-24 text-center text-white">
      <BlueprintBackground intensity={0.6} />
      <div className="relative">
        <p className="font-display text-[8rem] font-bold leading-none text-gradient sm:text-[12rem]">404</p>
        <h1 className="font-display mt-2 text-2xl font-bold sm:text-3xl">This page isn&apos;t on the plans.</h1>
        <p className="mx-auto mt-3 max-w-md text-mist">The page you&apos;re looking for has moved or never existed.</p>
        <div className="mt-8">
          <Magnetic href="/">Back to Home</Magnetic>
        </div>
      </div>
    </section>
  );
}
