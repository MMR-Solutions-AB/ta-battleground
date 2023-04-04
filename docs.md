# Dokumentation för Battleground

I denna fil kommer du hitta all info du behöver angående battleground, allt från hur **wars, problems och factions** funkar till hur hela projektet funkar

## Overview

1. Hur startar jag projekt på min dator?
2. Tech och prerequisite
3. Vart ligger alla filer och mappar?
4. Hur lägger jag till nya **problem, factions och wars**
5. Hur deployar jag?

### Hur startar jag projektet på min dator?

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

### Tech och prerequisite

- [Create t3 app](https://create.t3.gg/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)
- [Next.js](https://nextjs.org/docs)
- [Typescript](https://www.typescriptlang.org/docs/)
- [TailwindCSS](https://tailwindcss.com/)
- [MySQL från PlanetScale](https://planetscale.com/)
- [tRPC](https://planetscale.com/)
- [Prisma](https://www.prisma.io/)
- [Next auth](https://next-auth.js.org/)

Detta project är egentlig ett enda stort **Next.js** som är bootstrapat med **create t3 app** projekt och som använder sig utav **Yarn** (yarn är precis som NPM fast lite snabbare och du ska använda det). **create t3 app** är ett enkelt sätt att sammanväva alla technologierna ovanför. Det är en relativt ny grej så exakt hur projeket den generar ser ut må mycket väll ändrats lite sedan jag skriver detta men hela koncept kommer vara den samma och hur man.

För att kunna förstå koden och faktiskt kunna utveckla vidare kommer du behöva lära dig lite om alla technologier ovan, och det bästa sättet du kan göra det är just genom att starta ett nytt **create t3 app** projekt, connecta det till en **Planetscale** databas och leka runt lite. Lägger du tid på det kommer du mycket enklare kunna navigera runt dig i Battleground eftersom du sett allting på en mycket mindre skala då.
