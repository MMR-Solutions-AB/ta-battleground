# Dokumentation för Battleground

I denna fil kommer du hitta all info du behöver angående battleground, allt från hur **wars, problems och factions** funkar till hur hela projektet funkar

## Overview

1. Hur startar jag projekt på min dator?
2. Tech och prerequisite
3. SQL Schema
4. Vart ligger alla filer och mappar?
5. Hur lägger jag till nya **problem, factions, medlemmar i factions och wars**
6. Hur deployar jag?

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

**Planetscale** är en hosting platform för att hosta MySQL databaser. Deras fokus ligger på att ha en sån bra developer experience som möjligt och samtidigt vara så absolut billigt som möjligt. Exempelvis får man på deras free tier **1 miljard** row reads i månaden vilket är absort mycket, för lite kontext så har vi inte kommit över **1.5 miljoner** en enda månad. En viktigt del utav Planetscale är att du kan ha olika **branches** som du jobbar på för att ha olika schemas och olika databaser. Så exempelvis har **Battleground** projektet på Planetscale två **branches**, **main** som är vår _production_ databas där alla riktigt användare data lever, sen har den också en **dev** branch som används för att utveckla på. För att gör en **schema change** i din **main** branch måste du göra en **pull request** liknade action på Planetscale hemsidan. Tillsammans med Planetscale används **Prisma** för att faktiskt beskriva scheman och faktiskt interagera med databasen genom hela applikationen. Du kan hitta hela Prisma scheman [här](./prisma/schema.prisma). Prisma är väldigt bra att du har koll på ifall du vill hålla på backend delen, som tur är så är Prisma väldigt enkelt att hänge med på ifall du redan har lite erfarenhet av **SQL**. Du kan hitta ett diagram på hela scheman i länken nedan.

**Så här gör du ifall du vill göra en schema ändring:**

1. Se till att din connection url till Planetscale går till **dev** branchen, du kan inte göra ändringar direkt mot **main** branchen.
2. Gör ändringen i [prisma schema filen](./prisma/schema.prisma) och spara filen
3. I din terminal, skriv **yarn db:push**. Det kommer pusha dina schema ändringar till **dev** branchen i Planetscale
4. Nu borde du se att **dev** branchen i Planetscale hemsidan har fått en schema ändring, nu trycker du på **"Create deploy request"**
5. Sist är det bara trycka på **"Deploy changes"** på den så kommer dina ändring komma in i **main** branchen på Planetscale

### SQL Schema

Här hittar du en länk till ett diagram som visar hur scheman för hela projektet är upp strukturerat
[SQL Schema](https://drawsql.app/teams/matheus-mendes/diagrams/battleground)

### Backend

Hela backend använder sig utav **tRPC** för att definiera massa olika funktioner som du kan se som **end-points**. Den enda riktiga viktiga mappen som du ska vara in och röra i ifall du vill ändra saker i backenden är [src/server/trpc/router](./src/server/trpc/router), där lever filerna som deklarerar alla funktioner som våran frontend kommer kunna använda. Exempelvis finns filen [src/server/trpc/router/leaderboard](./src/server/trpc/router/leaderboard.ts) som enbart har en simple liten funktion, **getAll**. Den funktion returnerat enbart en **Prisma** query som hämtar alla användare i ordning av deras score. Vilket är hela principen med hela backenden, många funktioner som är som endpoints men egentligen är vanliga funktioner. Det fina med tRPC är att man får **end-to-end typesafety** vilket innebär att på frontend koden vet vi exakt hur datan vi får tillbaka kommer att se ut. Vi kan se ett exempel på hur vi använder vår **getAll** funktion från vår **leaderboard.ts** fil i frontend i filen [src/pages/leaderboard.tsx](./src/pages/leaderboard.tsx), där kan du se om du hovrar över **data** variabeln att vi har exakt rätt typescript type. Mer om exakt hur den relationen hittar du i **Frontend** sektion i detta dokument

Projektet använder sig utav **Next auth** för att hantera inloggning med **Github** OAuth provider. Det finns väldigt lite som behövs göra här och väldigt lite kommer faktiskt ändras nånsin. Men för att få tillgång till användarens id på backenden så får du den från **ctx.session.user.id**, du kan se ett exempel av detta i [problem.ts](./src/server/trpc/router/problem.ts) filen i **router** mappen längst ner i **getMySubmissions**

Hela servern hostas via **Next.js api routes** och start filen för det ligger i [src/pages/api](./src/pages/api/trpc/%5Btrpc%5D.ts). Den filen ska du dock aldrig röra

Återigen rekommenderas att du sitter lite med hela **create t3 app** stacken själv för att väldigt enkelt komma in i kodbasen, men annars kan du nog gissa dig fram lite.

### Frontend

På frontenden används Next.js och Tailwind primärt för all UI. Tailwind går ganska snabbt att lära sig och du hittar
