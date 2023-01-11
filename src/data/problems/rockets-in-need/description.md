# Rockets in need

Du jobbar på SpaceX och får in flera listor som rapporterar om en raket behöver reparation eller inte.

Alla listor är i formen utav ett javascript objekt och har tre keys, först har det en key som är **name** vilket är namnet på raketen i form av en string, sen har det en **distance** key vilket är i form utav ett nummer och distansen från SpaceX HQ till raketen, sist men inte minst har det en **damaged** key vilket kommer ha ett värde utav en boolean.

Ditt jobb går ut på att sammanställa en array med alla raketer som behöver reparation, vilket kommer vara alla raketer med värdet true för **damaged** keyn.

Din funktion tar emot ett argument vilket kommer vara en array där alla element är ett javascript objekt med den form som beskrivs ovan. Din funktion ska returnera ett javascript objekt där alla keys är namnet på raketen som behöver hjälp och alla dessa keys ska ha ett värde som är distansen till raketen.

## Hur ska man tänka

1. Börja med att skapa en funktion som tar emot en parameter
2. För att hålla koll på alla raketer som behöver hjälp, ska man skapa ett nytt tomt object (döp din variabel till rocketsInNeed)
3. Loopa igenom alla raketer i arrayn med hjälp utav en for-of loop och kolla ifall den raketen är skadad (arrayn är din parameter)
4. Om den är skadad ska du spara du den skadade raketens distans i det tomma objektet - rocketsInNeed[rocket.name]
5. Om inte gör ingenting
6. returnera rocketsInNeed

## Exempel 1

**_Input_**

```js
rockets = [
  { name: "aa", distance: 58, damaged: false },
  { name: "bb", distance: 12, damaged: true },
  { name: "cc", distance: 45, damaged: true },
];
```

**_Output_**

```js
{ bb: 12, cc: 45 }
```

**_Förklaring_**

Raketerna med namnen 'bb' och 'cc' är båda skadade, så vi returnerar deras namn tillsammans med deras distans

## Exempel 2

**_Input_**

```js
rockets = [
  { name: "xx", distance: 5, damaged: false },
  { name: "yy", distance: 98, damaged: false },
];
```

**_Output_**

```bash
{ }
```

**_Förklaring_**

Ingen raket är skadad, så vi returnerar ett tomt objekt

## Exempel 3

**_Input_**

```js
rockets = [];
```

**_Output_**

```bash
{ }
```

**_Förklaring_**

Det finns inga raketer, så vi returnerar ett tomt objekt
