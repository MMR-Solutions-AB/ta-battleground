# Cheapest color by car

Skriv en funktion **cheapestCarByColor(cars, color)** som tar emot en lista av bilar (där varje bil är representerad som en dictionary med egenskaperna "make", "model", "year", "color" och "price") och en sträng "color" som representerar den önskade bilens färg. Funktionen ska returnera det billigaste priset för en bil med den valda färgen.

Ifall det inte finns en enda bil med den givna färgen ska din funktion returnera **0**

## Exempel 1

**_Input_**

```bash
cars = [
  { brand: "Ford", color: "red", price: 35000 },
  { brand: "Tesla", color: "blue", price: 75000 },
  { brand: "Chevy", color: "red", price: 30000 },
  { brand: "BMW", color: "black", price: 60000 },
]

color = "red"
```

**_Output_**

```bash
30000
```

**_Förklaring_**

Output blir 30000 då i andra argumentet så specificerar vi en färg vilket i detta fallet är **"red"**. Den billigaste bilen är inte 30000 men den billigaste bilen som är **key:n "red"**, kostar 30000.

## Exempel 2

**_Input_**

```bash
cars = [
  { brand: "Tesla",  color: "black", price: 35000 },
  { brand: "Tesla", color: "red", price: 75000 },
]

color = "blue"
```

**_Output_**

```bash
0
```

**_Förklaring_**

Det finns ingen bil som är **"blue"**
