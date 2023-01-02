# Funny message

Du vill ge dina tweets en liten komisk effekt, och det bästa sättet att göra det på är att härma vad andra skriver fast att du skriver varannan bokstav med **versaler** _(stor bokstav)_ och alla andra bokstäver är i **gemener** _(små bokstäver)_.

Din uppgift är att skriva en funktion som tar emot ett argument vilket ska vara ett meddelande i formen utav en sträng. Du ska returnera denna sträng efter du har bytt ut varannan bokstav till en **versal** medans andra halvan av bokstäverna ska vara i **gemener**.

## Hur ska man tänka

1. Skapa en variabel som är en tom sträng
2. Skapa en variabel som ska heta upperCase och har värdet false till och börja med, denna variabel kommer hålla koll på om vi ska ha en stor eller liten bokstav
3. Loopa igenom alla bokstäver i din parameter "message" med hjälp utav en for-of loop
4. Om upperCase är false ska du lägga till en liten bokstav (.toLowerCase()) till din tomma sträng annars lägger du bokstaven i stor bokstav (.toUpperCase())
5. Innanför for loopen ska du använda dig utav "not" operatorn för att ändra på variablen upperCase värde
6. Returnera din tidigare tomma sträng

## Exempel 1

**_Input_**

```bash
s = "hello world"
```

**_Output_**

```bash
"hElLo wOrLd"
```

## Exempel 2

**_Input_**

```bash
s = "Light tHEme SCARES me"
```

**_Output_**

```bash
"lIgHt tHeMe sCaReS Me"
```
