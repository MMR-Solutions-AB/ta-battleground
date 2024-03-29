# Dokumentation för Battleground

I denna fil kommer du hitta all info du behöver angående battleground, allt från hur **wars, problems och factions** funkar till hur hela projektet funkar

## Overview

1. Hur startar jag projekt på min dator?
2. Tech och prerequisite
3. Vart ligger alla filer och mappar?
4. Hur lägger jag till nya **problem, factions, medlemmar i factions och wars**
5. Hur deployar jag?

## Hur startar jag projektet på min dator?

1. Börja med att ladda ner hela projektet genom att clona ner det

```bash
git clone https://github.com/MMR-Solutions-AB/ta-battleground.git
```

2. Se till att **yarn** är installerat, om det är det kan du skippa detta steg, annars ladda ner det

```bash
npm i -g yarn
// om det inte går, testa göra det med sudo
sudo npm i -g yarn
```

3. När är **yarn** är installerat, kan du installera alla npm paket

```bash
   yarn
```

4. Du ska nu få en **.env** fil från någon från **Techover** som du ska skapa i rooten av projektet, alltså bredvid exempelvis **package.json** filen.
5. När det är gjort är det bara att starta projektet

```bash
   yarn dev
```

## Tech och prerequisite

- [Create t3 app](https://create.t3.gg/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)
- [Next.js](https://nextjs.org/docs)
- [Typescript](https://www.typescriptlang.org/docs/)
- [TailwindCSS](https://tailwindcss.com/)
- [MySQL från PlanetScale](https://planetscale.com/)
- [tRPC](https://planetscale.com/)
- [Prisma](https://www.prisma.io/)
- [Next auth](https://next-auth.js.org/)

Detta project är egentlig ett enda stort **Next.js** som är bootstrapat med **create t3 app** projekt och som använder sig utav **Yarn** (yarn är precis som NPM fast lite snabbare och du ska använda det). **create t3 app** är ett enkelt sätt att sammanväva alla technologierna ovanför. Det är en relativt ny grej så exakt hur projeket den generar ser ut må mycket väll ändrats lite sedan **Battleground** startades, men hela koncept kommer vara den samma och hur man. Så klart används massa andra NPM paket, du kan se hela listan i [package.json](package.json), men listan ovan är det större grejerna som kan ta lite längre att komma in i.

För att kunna förstå koden och faktiskt kunna utveckla vidare kommer du behöva lära dig lite om alla technologier ovan, och det bästa sättet du kan göra det är just genom att starta ett nytt **create t3 app** projekt, connecta det till en **Planetscale** databas och leka runt lite. Lägger du tid på det kommer du mycket enklare kunna navigera runt dig i Battleground eftersom du sett allting på en mycket mindre skala då.

### Database

**Planetscale** är en hosting platform för att hosta MySQL databaser. Deras fokus ligger på att ha en sån bra developer experience som möjligt och samtidigt vara så absolut billigt som möjligt. Exempelvis får man på deras free tier **1 miljard** row reads i månaden vilket är absort mycket, för lite kontext så har vi inte kommit över **1.5 miljoner** en enda månad. En viktigt del utav Planetscale är att du kan ha olika **branches** som du jobbar på för att ha olika schemas och olika databaser. Så exempelvis har **Battleground** projektet på Planetscale två **branches**, **main** som är Battlegrounds _production_ databas där alla riktigt användare data lever, sen har den också en **dev** branch som används för att utveckla på. För att gör en **schema change** i din **main** branch måste du göra en **pull request** liknade action på Planetscale hemsidan. Tillsammans med Planetscale används **Prisma** för att faktiskt beskriva scheman och faktiskt interagera med databasen genom hela applikationen. Du kan hitta hela Prisma scheman [här](./prisma/schema.prisma). Prisma är väldigt bra att du har koll på ifall du vill hålla på backend delen, som tur är så är Prisma väldigt enkelt att hänge med på ifall du redan har lite erfarenhet av **SQL**. Du kan hitta ett diagram på hela scheman i länken nedan.

**Så här gör du ifall du vill göra en schema ändring:**

1. Se till att din connection url till Planetscale går till **dev** branchen, du kan inte göra ändringar direkt mot **main** branchen.
2. Gör ändringen i [prisma schema filen](./prisma/schema.prisma) och spara filen
3. I din terminal, skriv **yarn db:push**. Det kommer pusha dina schema ändringar till **dev** branchen i Planetscale
4. Nu borde du se att **dev** branchen i Planetscale hemsidan har fått en schema ändring, nu trycker du på **"Create deploy request"**
5. Sist är det bara trycka på **"Deploy changes"** på den så kommer dina ändring komma in i **main** branchen på Planetscale

Med Prisma vår vi även tillgång till **Prisma studio** vilket är en liten sida för se vår databas i ett UI och interagera med den där ifrån. För att starta upp prisma studio, skriv **yarn studio** i terminalen så borde ett den öppna upp [localhost:5555](https://localhost:5555) där du kan se prisma studio

### SQL Schema

Här hittar du en länk till ett diagram som visar hur scheman för hela projektet är upp strukturerat
[SQL Schema](https://drawsql.app/teams/matheus-mendes/diagrams/battleground)

### Backend

Hela backend använder sig utav **tRPC** för att definiera massa olika funktioner som du kan se som **end-points**. Den enda riktiga viktiga mappen som du ska vara in och röra i ifall du vill ändra saker i backenden är [src/server/trpc/router](./src/server/trpc/router), där lever filerna som deklarerar alla funktioner som frontenden kommer kunna använda. Exempelvis finns filen [src/server/trpc/router/leaderboard](./src/server/trpc/router/leaderboard.ts) som enbart har en simple liten funktion, **getAll**. Den funktion returnerat enbart en **Prisma** query som hämtar alla användare i ordning av deras score. Vilket är hela principen med hela backenden, många funktioner som är som endpoints men egentligen är vanliga funktioner. Det fina med tRPC är att man får **end-to-end typesafety** vilket innebär att på frontend koden vet vi exakt hur datan vi får tillbaka kommer att se ut. Vi kan se ett exempel på hur vi använder vår **getAll** funktion från vår **leaderboard.ts** fil i frontend i filen [src/pages/leaderboard.tsx](./src/pages/leaderboard.tsx), där kan du se om du hovrar över **data** variabeln att vi har exakt rätt typescript type. Mer om exakt hur den relationen hittar du i **Frontend** sektion i detta dokument

Projektet använder sig utav **Next auth** för att hantera inloggning med **Github** OAuth provider. Det finns väldigt lite som behövs göra här och väldigt lite kommer faktiskt ändras nånsin. Men för att få tillgång till användarens id på backenden så får du den från **ctx.session.user.id**, du kan se ett exempel av detta i [problem.ts](./src/server/trpc/router/problem.ts) filen i **router** mappen längst ner i **getMySubmissions**

Hela servern hostas via **Next.js api routes** och start filen för det ligger i [src/pages/api](./src/pages/api/trpc/%5Btrpc%5D.ts). Den filen ska du dock aldrig röra

Exempelvis, säg att du vill skapa en ny sektion på sidan som låter användare kommentera på uppgifterna och du vill skapa den funktionaliteten på backend, då hade du gjort följande.

1. Först måste du faktiskt ändra scheman så att din databas kan spara den datan. Så du börjar med att ändra att din [prisma fil](./prisma/schema.prisma) får följande

```prisma
// skapar en ny table för att hålla
model Comment {
  id         String    @id @default(cuid())
  text       String
  problemId  String    // säger att den ska en column ska länka till ett problem
  problem    Problem   @relation(fields: [problemId], references: [id], onDelete: Cascade)
  userId     String    // säger att den ska en column ska länka till en user
  user       User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt

  // long story short, dessa behövs för att sql ska vara snabbare
  @@index([problemId])
  @@index([userId])
}

// du kommer också vara tvungen att ändra Problem och User tablen för att detta ska funka
model User {
 ...
 comments Comment[]
}

model Problem {
 ...
 comments Comment[]
}
```

2. När det är gjort kan ska du pusha din changes så Planetscale kan ändra din riktiga databas, det gör du med **yarn db:push** och kom ihåg att du måste vara connectad till **dev** branchen
3. Nu är det dags att skriva lite backend tRPC kod. Eftersom att detta är en ny sektion av vår databas vill vi nog skapa en ny fil i vår [src/server/trpc/router](./src/server/trpc/router) som vi kan kalla för **comment.ts**, detta är dock absolut inte nödvändigt och vi kunde lika gärna skriva allt i vår **problem.ts** fil om vi vill men detta blir lite enklare att läsa. Här kommer all backend kod leva för att läsa och skriva till våra kommentarer. I vår nya fil lägger vi till två funktioner, **getCommentsForProblem** och **sendComment**, namnen här spelar ju egentligen ingen roll så länge du tar något som du förstår. Detta hade kunnat sett ut så här exempelvis

```ts
// src/server/trpc/router/comment.ts
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const commentRouter = router({
  getCommentsForProblem: protectedProcedure
    // vi använder zod för att bestämma hur inputen till denna rout ska se ut
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.comment.findMany({
        where: {
          problemId: input.id,
        },
        select: {
          id: true,
          text: true,
          user: {
            id: true,
            name: true,
            image: true,
          },
        },
        orderBy: {
          createdAt: "desc", // sortera på nyast till äldst
        },
      });
    }),
  sendComment: protectedProcedure
    .input(z.object({ id: z.string(), text: z.string() }))
    // en mutation route kan du se som POST, PATCH och DELETE tillsammans
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.comment.create({
        data: {
          text: input.text,
          problemId: input.id,
          userId: ctx.session.user.id,
        },
      });
    }),
});
```

4. Nu måste vi länka denna kod in i vår router, det gör vi i vår [\_app.ts](./src/server/trpc/router/_app.ts) fil

```ts
// src/server/trpc/router/_app.ts
import { router } from "../trpc";
// alla andra import är här ...
import { commentRouter } from "./comment";

export const appRouter = router({
  // alla andra routers är här ...
  // vi säger att denna router heter "comment", detta kommer bestämma namnet vi kommer referera till i vår frontend kod
  comment: commentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
```

5. Nu är vår backend klar, väldigt smidigt och väldigt enkelt. Nu är det bara att faktiskt använde den koden i vår frontend, för att se hur man gör det, kolla på **Frontend** sektion.

Återigen rekommenderas att du sitter lite med hela **create t3 app** stacken själv för att väldigt enkelt komma in i kodbasen, men annars kan du nog gissa dig fram lite.

### Frontend

På frontenden används Next.js och Tailwind för all UI. Tailwind går ganska snabbt att lära sig och du hittar config filen [tailwind.config.cjs](./tailwind.config.cjs), den ska du förmodligen inte röra ofta alls om du inte vill ändra färgerna på sidan exempelvis.

Här är alla mappar du behöver hålla koll på när det kommer till frontenden:

- [components](./src/components/) - Innehåller alla allmäna komponeter genom projektet
- [context](./src/context/) - Innehåller två context filer för React context,
  - EditorContext.tsx - För att hantera settings för själva editorn, så som **font size** eller **theme**
  - ModalContext.tsx - För att visa och gömma hela editor modal
- [pages](./src/pages/) - Definierar alla olika url:er och vad som ska visas på det olika url:erna. Exempelvis i [pages/leaderboard.tsx](./src/pages/leaderboard.tsx) så kan du se vad som visas på **"/leaderboard"** url:en

När det kommer till att hämta data från backenden till frontenden så används **tRPC** vilket är ett ramverk för att både backend men även frontend, och med det får vi extremt bra developer experience tack vara den **end-to-end typesafety** vi får. Hur tRPC funkar från ett backend perspektiv hittar du i **Backend** sektion ovanför. Men på frontend delen av applikation så använder tRPC **useQuery**, vilket är ett annat populärt npm paket, _under the hood_. Så har du använt **useQuery** tidigare kommer mycket kännas bekant.

För att fetcha en endpoint så börjar du med att importera **trpc** från **utils** mappen vilket du enkelt kan göra med **path alias "@/../"**. Sen använder du den variabel i din komponent för att välja vilken route du vill fetcha från samt vilken function du vill köra. Exempelvis nedan kan du se en komponent som fetchar från en route som heter **test** och kör **getNumber** function, samt hur backend koden för den routen hade sett ut

```tsx
// src/components/MyComponent.tsx
import { trpc } from "@/utils/trpc";

export const MyComponent = () => {
  const { data: number, isLoading, isError } = trpc.test.getNumber.useQuery();

  if (isLoading) return <p>Loading...</p>;

  if (isError || !number) return <p>Kunde inte hämta ditt nummer</p>;

  return <p>Ditt nummer är {number}</p>;
};
```

```ts
// src/server/trpc/router/test.ts
import { router, protectedProcedure } from "../trpc";

export const testRouter = router({
  getNumber: protectedProcedure.query(async () => {
    return 8;
  }),
});
```

```ts
// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { testRouter } from "./test";

export const appRouter = router({
  test: testRouter,
});

export type AppRouter = typeof appRouter;
```

Exemplet ovan var ett väldigt simpelt exempel som visade hur du kan fetcha lite data ifrån en komponent, nu ska vi gå igenom hur detta hade sett ut för ett större exempel genom att fortsatte på det exemplet vi hade i **Backend** delen med att skapa en kommentar sektion på alla problem.

1. Först behöver vi skapa en url, något i stilen av **/problems/:id/comments** där vår sida för alla kommentarer ska visas. Så vi skapar filen **src/pages/problems/[id]/comments.tsx**. I den filen stoppar vi ner följande kod, som kommer fetcha alla comments för det problem vi är inne på och visa upp det som en json sträng (vi byter ut strängen i ett senare steg). Sidan kommer visa **BouncingBalls** komponenten ifall den håller på att ladda och ifall ett fel skulle inträffa eller vi inte fick någon data visar den ett simpelt litet error meddelande

```tsx
// src/pages/problems/[id]/comments.tsx
import ProblemsLayout from "@/components/layouts/ProblemsLayout";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import BouncingBalls from "@/components/loaders/BouncingBalls";
import type { NextPageWithLayout } from "@/pages/_app";

// Att vår komponent har NextPageWithLayout om type låter oss lägga till .getLayout delen längre ner
const Comments: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    data: comments,
    isLoading,
    isError,
  } = trpc.comment.getCommentsForProblem.useQuery({
    id: router.query.id as string,
  });

  if (isLoading)
    return (
      <div className="mt-10 flex justify-center">
        <BouncingBalls />
      </div>
    );

  if (isError || !comments || comments.length === 0)
    return (
      <p className="p-6 text-xl font-bold">
        Verkar som att det inte fanns några kommentarer
      </p>
    );

  return <div>{JSON.stringify(comments)}</div>;
};

// Detta är en väldigt viktigt del då den kommer se till att hela vår komponent kommer hamna i den layouten som alla sidor på problems sektion av sidan har
// Alltså att det editorn ligger till höger och all styling runt det
Comments.getLayout = (page) => <ProblemsLayout>{page}</ProblemsLayout>;

export default Comments;
```

Med det så borde vi nu kunna navigera till **/comments** väl inne på en uppgift och se våran sida. Däremot så behöver vi uppdatera navigationen på problems sidan så att det finns någonstans att trycka för att se kommentarerna.

2. Så vi gör det i [src/components/layouts/ProblemsLayout](./src/components/layouts/ProblemsLayout.tsx)

```tsx
const ProblemsLayout: React.FC<ProblemsLayoutProps> = ({ children }) => {
  // all annan kod ...

  return (
    // all annan kod ...
    <div className="bg-bg-dark text-text-dimmed flex flex-shrink-0 pt-2 text-sm">
      <NavLink href="">Description</NavLink>
      <NavLink href="/submissions">Submissions</NavLink>
      <NavLink href="/leaderboard">Leaderboard</NavLink>
      <NavLink href="/comments">Comments</NavLink> // den här lägger vi till
    </div>
    // all annan kod ...
  );
};
```

Nu kommer vår sida ha en ny länk till till **/comments**

3. Nästa steg blir nog att faktisk kunna skicka meddelanden. Vi har ju redan gjort en **sendComment** funktion på våran backend, nu behöver vi bara använda den. Eftersom att **sendComments** funktionen är en tRPC mutation så ska vi använda oss utav useMutation hooken. Så här hade koden för det sett ut

```tsx
// src/pages/problems/[id]/comments.tsx

// alla andra import går här...
import { useState } from "react";

// Att vår komponent har NextPageWithLayout om type låter oss lägga till .getLayout delen längre ner
const Comments: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    data: comments,
    isLoading,
    isError,
  } = trpc.comment.getCommentsForProblem.useQuery({
    id: router.query.id as string,
  });
  const utils = trpc.useContext();
  const sendCommentMutation = trpc.comment.sendComment.useMutation();
  const [comment, setComment] = useState("");

  // loading och error states:en från förra code snippet:en går här ...

  return (
    <div>
      <div>{JSON.stringify(comments)}</div>
      <div>
        {/* För att hålla koll på det som användaren skriver */}
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <button
          // Man ska inte kunna trycka på knappen ifall den ifall vi har en mutation igång som håller på att laddas
          disabled={sendCommentMutation.isLoading}
          onClick={async () => {
            // Det här är när vi faktiskt gör vår "POST" request
            // om du kollar på vår sendComment funktion i vår backend kan du se att den tog två saker i vår input, id och text
            const res = await sendCommentMutation.mutateAsync(
              {
                id: router.query.id as string,
                text: comment,
              },
              {
                // när request:en går igenom, ska vi invalidate:a "getCommentsForProblem" så att den kommer fetcha den på nytt
                // long story short, fetcha alla comments igen så att användaren kan se den som precis skapats
                onSuccess() {
                  utils.comment.getCommentsForProblem.invalidate();
                },
              }
            );

            console.log(res);
          }}
        >
          Send comment
        </button>
      </div>
    </div>
  );
};

Comments.getLayout = (page) => <ProblemsLayout>{page}</ProblemsLayout>;

export default Comments;
```

Nu kan du faktiskt skicka comments som borde spara i databasen

> Notera att detta inte tar hand om att visa errors eller loading state för när själva mutationen går fel. Det borde du ha med, du kan hitta hur det hade sett ut på tRPCs dokumentation

4. Dags att visa våra kommentarer genom att skapa en ny komponent.

```tsx
// src/components/Comment.tsx
import React from "react";
import Image from "next/image";
import type { RouterOutputs } from "@/utils";

interface CommentProps {
  // denna typescript type är lite svårt att förstå vid första glans
  // men det den gör är att den kommer ta ut det som vår getCommentsForProblem funktion returnerar
  // vilket är en array av kommentarer eller undefined
  // NonNullable kommer göra så att vi enbart tar det "non-nullable" värdena, alltså inte undefined i detta fall
  comment: NonNullable<
    RouterOutputs["comment"]["getCommentsForProblem"]
  >[number];
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="flex gap-2">
      <div className="relative h-10 w-10">
        <Image
          src={comment.user.image}
          fill={true}
          alt="user image"
          className="inset-0 rounded-full object-cover"
        />
      </div>
      <div>
        <p>{comment.user.name}</p>
        <p>{comment.text}</p>
      </div>
    </div>
  );
};
```

5. Nu kan vi använda den komponenten i **comments** pagen.

```tsx
// src/pages/problems/[id]/comments.tsx

// alla andra import går här...

import { Comment } from "@/components/Comment";

// Att vår komponent har NextPageWithLayout om type låter oss lägga till .getLayout delen längre ner
const Comments: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    data: comments,
    isLoading,
    isError,
  } = trpc.comment.getCommentsForProblem.useQuery({
    id: router.query.id as string,
  });

  // mutation och input staten går här ...

  // loading och error states:en går här ...

  return (
    <div>
      <div>
        {/* Vi visar uppa alla våra kommentarer */}
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
      <div>{/* input fältet och knappen går här ... */}</div>
    </div>
  );
};

Comments.getLayout = (page) => <ProblemsLayout>{page}</ProblemsLayout>;

export default Comments;
```

Och bara så, så har vi gjort en ny feature på Battleground som är redo att deploya.

## Hur lägger jag till nya problem, factions, medlemmar i factions och wars

Du hittar egentligen all data om både **problems och wars** i [src/data](./src/data) mappen. I den mappen hittar du ett par olika filer och mappar. Men det enda du egentligen kommer att röra är i [problems](./src/data/problems/) eller i [wars](./src/data/wars) mapparna. I **problems** mappen hittar du alla uppgifter som INTE är en **war** uppgift, varje uppgift är uppbyggt av exakt två filer, en **data.ts** fil som innehåller alla metadata om uppgiften så som **svårighetsgrad** samt **testcases** bland annat, och en **description.md** fil som är en helt enkel markdown fil som är själva uppgiftens beskriven. Dessa filnamn är **väldigt** viktiga och måste heta så. Alla **wars** i **wars** mappen består utav en **war.ts** fil som innehåller all meta data om den war:en, så som namn och startdatum, här igen måste filen heta **war.ts**. Det finns även en **problems** map som innehåller alla problem för just den war:en som följer exakt samma struktur som i den vanliga **problems** mappen.

### Lägga till Problems

I din terminal skriv

```bash
yarn gen
```

Den kommer nu fråga dig ett par olika frågor, så som namnet på problemet, svårighetsgrad, samt ifall du vill att detta ska vara en uppgift till en **war**. När du valt allting så kommer en ny map skapas för din nya uppgift, den nya mappen kommer ligga [src/data/problems](./src/data/problems) ifall du inte ville ha en war uppgift annars hamnar den i **problems** mappen för den waren du valde.

Som sagt kommer alla uppgifter bestå utav två filer, **data.ts** och **description.md**. Låt oss kolla på dessa två filer för att första vad det gör och hur du ska använda det.

##### data.ts

Nedan ser du ett exempel ifrån **Simple addition** uppgiften. Här kommer även förklaring på vad det olika raderna gör och bra saker du måste hålla koll på

1. Vi börjar med att importera **Problem** typen ifrån [Problem.ts](./src/data/Problem.ts) filen. Denna type kommer hjälpa oss att undvika fel i våran kod tack vare typescript
2. Vi exporterar sedan en variabel som heter **data**, det är viktigt att den heter **data** eftersom att när vi sen ska pusha våra uppgifter till vår databas så kommer inte det gå om den heter någon annat. En annan viktig del här är att vi skriver att denna **data** variabel ska vara type **Problem<number, number>** vilket kortfattat kommer ge oss intellisense. Denna del kan vara lite förvirrande ifall du är ny till Typescript men just **<number, number>** delen är vad som kallas för generics i Typescript och är lite som att stoppa in argument i en type för att ändra den lite. I detta fall så bestämmer det två vilken type vår **input** och **output** ska ha i våra testcase längre ner. Vi säger att båda ska vara nummer eftersom att vår funktion ska ta in nummer som argument och ska returnera ett nummer också, detta betyder att ifall du skulle försöka skriva att en av testcasen skulle returnera en sträng så kommer VS code bli röd och varna dig. Denna del är lite förvirrandde och det blir nog mycket svårare ifall du inte använt Typescript tidigare. Ifall du blir väldigt frustrerad på att det inte går kan du säga att båda är type **any**, alltså **Problem<any, any>**, detta kommer låta dig skriva vad som helst som input och output. Hela type grejen här är egentligen inte super viktig utan är enbart till för att underlätta för oss när vi jobbar på, så om det bara ställer till det med problem kan du bara köra **any**, det är fine
3. Det första vi stoppar in i objektet är vilket namn den ska ha, denna kommer redan var ifylld med det du valde när du gjorde den nya uppgiften
4. Sedan väljer vi svårighetsgrad, denna kommer redan var ifylld med det du valde när du gjorde den nya uppgiften
5. Efter det kommer uppgiftens nummer, detta är en väldigt viktig del. Alla uppgifter måste ha en unikt nummer eftersom att när du ska lägga upp uppgifterna till databasen så kommer den använda numrerna för att veta vilken den ska lägga till samt vilka den ska uppdatera. Numret kommer redan vara ifylld när du skapar uppgiften, detta är inget du behöver lägga till. Hur den vet vilket nummer den ska skapa är att den läser igenom alla uppgifter som finns och hittar det största numret och tar det plus 1. Detta innebär att ifall du skulle exempelvis ha **5** uppgifter med följande nummer **1, 2, 3, 4, 5** så kommer den nya uppgiften få nummer **6**. Men ifall du har **5** uppgifter med följande nummer **1, 2, 4, 5, 6** så kommer du få nummer **7** och inte **3** även om det saknas en uppgift för det numret
6. Arguments delen är där du speciefera vilka argument funktionen ska ha och vilka typer det argumenten ska vara. Exempelvis nedan säger vi att funktionen ska ta emot två argument, **a** och **b** som båda ska vara nummer. Det du skriver i **type** key:n ska vara i **JSDocs** format. Du får gärna googla det för att se hur du gör olika grejer där
7. Tags delen specificerar vilka tags som ska finnas. Dessa kommer vara ifyllda redan från att du valde det i terminalen när du skapade uppgiften
8. Sist men absolut inte minst har vi **testCases**. Här är det där du bestämmer alla testcases som kommer köras när en elev submittar deras kod. Alla objekt innan för ska ha exakt två keys, **input** och **output**. Hur dessa ska se ut beror lite på vilka types du la när du defienerade din data variabel. Däremot så måste **input** alltid vara en array, sen vad som står innanför den spelar inte lika stor roll, men oavsett vad ska **input** vara en array

```ts
import type { Problem } from "../../Problem";

export const data: Problem<number, number> = {
  name: "Simple addition",
  difficulty: "easy",
  number: 1,
  arguments: [
    { name: "a", type: "number" },
    { name: "b", type: "number" },
  ],
  tags: ["basics", "numbers"],
  testCases: [
    {
      input: [1, 2],
      output: 3,
    },
    {
      input: [100, 12],
      output: 112,
    },
    {
      input: [87, 0],
      output: 87,
    },
  ],
};
```

##### description.md

Denna fil är själva förklaringen på uppgiften som eleverna kommer se. Filen är en **markdown** fil. Denna fil kommer redan ha lite start text som du kan använda som ett start spår på hur det ska se ut, men du kommer vara tvungen att ändra en hel del för att faktiskt ha din egna fråga

### Lägg upp ditt problem på databasen eller uppdatera befintliga problem

Nu när du har gjort dina problem och faktiskt vill pusha upp dessa på databasen. Då är det bara två saker att göra:

1. Först, navigera till [prisma/seed.ts](./prisma/seed.ts) filen, och se till att både **syncDBWithWars** och **syncDBWithProblems** funktionerna inte är ut-kommenterade. Det spelar ingen roll ifall det andra funktioner är ut-kommenterade eller inte. Du hittar mer om info om denna fil och vad alla funktioner gör längre ner i dokumentet

```ts
import { prisma } from "../src/server/db/client";
import { syncDBWithFactions } from "./runners/syncDBWithFactions";
import { syncDBWithProblems } from "./runners/syncDBWithProblems";
import { syncDBWithWars } from "./runners/syncDBWithWars";
import { syncDBWithUserScores } from "./runners/syncDBWithUserScores";
import { syncDBWithWarScores } from "./runners/syncDBWithWarScores";

async function main() {
  // await syncDBWithFactions();

  // add and update all wars
  await syncDBWithWars();

  // add and update all problems
  await syncDBWithProblems();

  // await syncDBWithWarScores();

  // await syncDBWithUserScores();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

2. Nu är det bara att skriva följande kommando i terminalen. Detta kommer köra ett script som syncar alla problem bland dina filer med det som finns i databasen. Hur koden gör det kan du lista ut om du följer koden, men det är inte super viktigt, utan den viktiga är **ATT** den gör det.

```bash
   yarn db:seed
```

Nu kommer dina problem vara syncade i den databasen du är connected till. Så ifall du är connectad till **main** databasen så kommer riktiga **battelground** få det ändringar du gjort. Denna funktion kommer inte bara skapa nya problem, utan den kommer också uppdatera alla befintliga problem med hjälp utav alla nummer som problemen har. Så skulle du hitta ett stav fel i vilken uppgift som helst exempelvis så är det bara att fixa det felet i den file, sen köra **yarn db:seed** igen så kommer det uppdateras.

### Hur skapar jag nya factions.

I [prisma/runners/syncDBWithFactions.ts](./prisma/runners/syncDBWithFactions.ts) filen finns det en variabel som heter **baseFactions**, lägger du till en ny faction där och sen ser till att **syncDBWithFactions** funktionen inte är utkommenderad i [prisma/seed.ts](./prisma/seed.ts) filen så kommer den nya factinen skapas. Notera dock att den kommer skapa en ny faction i databasen och inte lägga till denna faction i alla befintliga wars. Vill du se till att den nya factionen ska vara med i den nya war:en, så får du göra det i prisma studio på enklast sätt. Alla factions har en **image** key som referar till en bild i [/public/banners](./public/banners/) mappen, så när du skapar en ny faction bör du också skapa en ny banner. Alla banners är skapa på [haikei](https://app.haikei.app/)

```ts
// prisma/runners/syncDBWithFactions.ts
const baseFactions: Prisma.FactionCreateInput[] = [
  ...{ name: "New faction", image: "banner-5.svg" },
];

// prisma/seed.ts
async function main() {
  // make sure all factions are there
  await syncDBWithFactions();
}
```

### Hur skapar jag nya wars

Du börjar med att skriva följande i terminalen:

```bash
yarn gen:w
```

Efter du valt ett namn kommer en ny map skapas i [/data/wars](./data/wars) mappen för den war:en. I den mappen finns en fil som heter **war.ts** och en tom map som heter **problems**.

När det kommer till metadatan du hittar i **war.ts** filen så är det ganska straight forward men ett par saker att hålla koll på är.

1. Se till att inte byta nummer på din war om du inte verkligen har en bra anledning. Precis som alla uppgifter så är nummrerna till för att enkelt kunna uppdatera och skapa nya wars.
2. Start och slutdatumen kan vara lite tricky eftersom att tidszoner kan vara lite förvirrande. Här la jag aldrig riktigt super mycket tid på att testa det men det man hade möjligtvis kunna bestämma i vilken tidszon tiden du bestämmer är i, men det testade jag aldrig. Var bara lite vaksam att tiden du bestämt är den som hemsidan visar

För att lägga till problem så gäller det bara att du har dina problem i **problems** mappen. När du skapar nya problem med `yarn gen` så kommer du bli frågad ifall du vill ha den uppgiften i en war, så det borde gå på automatik

För att lägga upp din war och alla dess problem så är det bara att se till att **syncDBWithWars** och **syncDBWithProblems** funktionerna i [prisma/seed.ts](./prisma/seed.ts) inte är utkommenderade och sen köra `yarn db:seed`.

Själva hemsidan kommer se till att bara visa den nuvarande war:en, så det är helt okej att du pushar nya wars till databasen även om den nuvarande waren inte är klar. Samma sak med alla uppgifter för den waren. Ifall war:en som en uppgift är till för inte har börjat än så kommer man inte kunna se den på hemsidan någonstans. Med det sagt så kommer det bara funka om dina tider för start- och slutdatum inte överlappar med varanda för det olika warsen.

### Hur lägger jag till medlemmar i en faction och redigerar befintliga

Detta gör du i **prisma studio** enklast. Du öppnar den via att skriva `yarn studio` i terminalen.

1. Välj **FactionMember** tablen
2. Tryck på **Add record**
3. Tryck på **faction** columnen, välj den factionen du vill att den nya membern ska vara med i
4. Tryck på **user** columnen, välj den användaren du vill ska gå med i factionen
5. Tryck på den gröna knappen där det står **Save 1 change**
6. Klart!

Här har du ett exemempel på hur det ska se ut precis innan du sparat den nya medlemmen. För att lite enklare förstå varför detta funkar kan du kolla på hur [SQL Schema](https://drawsql.app/teams/matheus-mendes/diagrams/battleground) ser ut

![Prisma studio](public/prisma-studio.png)

För att radera användare är det bara att markera den användaren via checkboxen till vänster i prisma studio och sen trycka på **Delete 1 record**

## Hur deployar jag

För att deploya gäller det bara att du pushar din ändringar till **main** branchen på GitHub. Vercel, vilket är det som används för att deploya, kommer automatiskt redeploya. När Vercel redeployar så kommer den bygga hela ditt projekt och ifall
