import React, { PropsWithChildren } from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-7xl font-extrabold">
        Writing, <span className="underline">simplified</span>.
      </h1>
      <p className="mt-3">No more complications. No more ads. Just notes.</p>
    </div>
  );
}
