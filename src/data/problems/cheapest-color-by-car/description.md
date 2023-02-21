# Carcar

Skriv en funktion **cheapestCarByColor(cars, color)** som tar emot en lista av bilar (där varje bil är representerad som en dictionary med egenskaperna "make", "model", "year", "color" och "price") och en sträng "color" som representerar den önskade bilens färg. Funktionen ska returnera det billigaste priset för en bil med den valda färgen.

## Exempel 1

**_Input_**

```bash
cars =
[{"make": "Ford", "model": "Mustang", "year": 2020, "color": "red", "price": 35000},
{"make": "Tesla", "model": "Model S", "year": 2019 "color": "blue", "price": 75000},
{"make": "Chevy", "model": "Camaro", "year": 2018, "color": "red", "price": 30000},
{"make": "BMW", "model": "M3", "year": 2020, "color": "black", "price": 60000}]

color = "red"

```

**_Output_**

```bash
30000
```

**_Förklaring_**

Output blir 30000 då i andra argumentet så specifierar vi en färg vilket i detta fallet är "red". Den billigaste bilen är inte 30000 men den billigaste (red) bilen. Kostar 30000.
