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
        <p className="mb-2 text-text-dimmed">
          Techover Battleground är som gymmet för din programmeringshjärna! Du
          väljer en uppgift, skriver koden som ska lösa den, och vi kör din kod
          mot alla våra tester automatiskt. Om du får grönt ljus för alla
          testerna har du klarat uppgiften, men om du får rött ljus får du
          feedback på vad du behöver ändra för att få alla testerna att gå
          igenom. Du kan också tävla mot resten av alla Techover elver och se
          vem som är mästare på Javascript!
        </p>
        <p className="text-text-dimmed">
          Så här löser du en uppgift: Gå vidare till nästa uppgift och fortsätt
          träna din programmeringsskills!
        </p>
        <div className="prose">
          <ul className="text-text-dimmed">
            <li>Välj en uppgift från listan</li>
            <li>
              Skriv din kod i texteditorn till höger i funktionen som du får i
              starter koden
            </li>
            <li>
              Tryck på <b>&quot;Submit&quot;</b> för att lämna in din lösning
            </li>
            <li>
              Om du får grönt ljus för alla testerna, har du löst uppgiften! Om
              inte, får du feedback på vad du behöver ändra
            </li>
            <li>
              Gå vidare till nästa uppgift och fortsätt träna din
              programmeringsskills!
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-10">
        <h3 className="mb-1 text-2xl font-bold">
          Hur är <b>poäng</b> beräknade på varje uppgift?
        </h3>
        <p className="text-text-dimmed">
          Dina totala poäng du får på en uppgift beror på två saker, vilken
          svårighetsgrad uppgiften du löst är och hur få karaktärer du använde
          för att lösa uppgiften. Svårighetsgraden är den första faktorn och
          kommer ge dig <b>600</b> poäng för en <b>enkel</b> uppgift, <b>850</b>{" "}
          för en <b>medel</b> uppgift och <b>1100</b> för en <b>svår</b>{" "}
          uppgift. Extra poäng kommer läggas till desto mindre karaktärer du har
          löst uppgiften med, här kan du få allt från <b>300</b> till <b>0</b>{" "}
          extra poäng. En viktigt grej att notera är att antalet extra poäng du
          får är inte lineart, alltså antalet extra poäng du får för att gå från
          en lösning med <b>150</b> karaktärer till <b>100</b> är inte samma som
          om du hade gå från en lösning med <b>100</b> karaktärer till <b>50</b>
          . Detta gör det lönsamt att verkligen försöka optimera sin lösning
        </p>
      </div>
      <div className="mb-10">
        <h3 className="mb-1 text-2xl font-bold">
          Vad är det där konstiga kommentarerna högst upp i min kod?
        </h3>
        <p className="text-text-dimmed">
          Det du förmodligen tänker på är en grej som kollas för <b>JSDocs</b>.
          Allt det gör är att det hjälper din editor att ge dig bra farslag{" "}
          <b>(intellisense)</b> på argumentet som din funktion tar emot. För att
          få så hög highscore som möjligt är det bra att du tar bort de
          kommentarerna när du löst uppgiften
        </p>
      </div>
    </WrappedLayout>
  );
};

export default FAQ;
