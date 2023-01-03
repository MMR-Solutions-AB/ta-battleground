# Fara vid havs

Skriv en funktion **faraVidHavs(cords, boats)** som tar emot två argument, första argument är en **tupel** (en tupel är en array med exakt två värden) med din ubåts **x** och **y** koordinater, det andra argumentet är en **array** av **tupels** med alla ubåtar i närhetens koordinater. Funktionen ska return **true** ifall det finns en annan ubåt i närheten inom 3 enheter ifrån din ubåt

## Exempel 1

**_Input_**

```js
cords = [1, 1];
boats = [
  [5, 1],
  [2, 2],
];
```

**_Output_**

```bash
true
```

**_Förklaring_**

Avståndet från din ubåt och den första ubåten med koordinaterna **[5, 1]** är **4** enheter då ni har samma **y** koordinat så den enda skillnaden är i x-led vilket blir 5 - 1 = 4, denna ubåt är **inte** inom **3** enheter. Den andra ubåten med koordinaterna **[2, 2]** är inom **3** enheter. Detta kan vi räkna ut genom att ta roten ur summan av differensen i **x-led** upphöjt till **2** plus differensen i **y-led** upphöjt till **2**, alltså något i denna stilen **√((2 - 1)^2 + (2 - 1)^2) => √2**. **√2** är ungefär **1.4** vilket är mindre än 3 så vi returnerar **true** då det finns en ubåt inom **3** enheter

## Exempel 2

**_Input_**

```js
cords = [0, 0];
boats = [[100, 100]];
```

**_Output_**

```bash
false
```
