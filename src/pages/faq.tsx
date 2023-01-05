import React from "react";
import type { NextPage } from "next";
import WrappedLayout from "@/components/layouts/WrappedLayout";

const FAQ: NextPage = () => {
  return (
    <WrappedLayout>
      <h2 className="mb-6 text-3xl font-bold tracking-widest md:mb-12 md:text-4xl">
        FAQ
      </h2>
      <div className="mb-10 md:mb-16">
        <h3 className="mb-1 text-2xl font-bold">
          Vad där Battleground och hur använder jag det?
        </h3>
        <p className="text-text-dimmed">
          Techover Battleground är en platform där du kan öva på dina javascript
          kunskaper genom att lösa problem
        </p>
      </div>
      <div className="mb-10">
        <h3 className="mb-1 text-2xl font-bold">
          Hur är <b>score</b> beräknade?
        </h3>
        <p className="text-text-dimmed">
          Score:en du får på en uppgift beror på två saker, vilken
          svårighetsgrad uppgift du löst är samt hur få karaktärer du använde
          för att lösa den uppgiften. Svårighetsgraden är en fast siffra och är{" "}
          <b>50</b> för en <b className="text-green-600">enkel</b>, <b>300</b>{" "}
          för en <b className="text-amber-600">medel</b> och sist <b>500</b> för
          en <b className="text-red-600">svår</b> uppgift. Ytligare får du extra
          poäng med hänsyn till hur lite karaktärer du har, desto mindre, desto
          bättre.
        </p>
      </div>
    </WrappedLayout>
  );
};

export default FAQ;
