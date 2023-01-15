# Group by age

Skriv en funktion **groupByAge(people)** som tar emot ett argument people som är en array av objekt med information om personer. Varje objekt i arrayen innehåller nycklarna **"name"**, **"age"** och **"city"**. Funktionen ska returnera ett objekt som har en nyckel för varje unik ålder och värdet för nyckeln ska vara en array med namnen på personer som är den åldern.

## Exempel 1

**_Input_**

```bash
people = [
  { name: "Alice", age: 21, city: "New York" },
  { name: "Bob", age: 25, city: "Chicago" },
  { name: "Charlie", age: 21, city: "New York" },
]
```

**_Output_**

```bash
{ 21: ["Alice", "Charlie"], 25: ["Bob"] }
```

## Exempel 2

**_Input_**

```bash
people = [
  { name: "David", age: 35, city: "San Francisco" },
  { name: "Eve", age: 40, city: "Los Angeles" },
  { name: "Frank", age: 35, city: "San Francisco" },
]
```

**_Output_**

```bash
{ 35: ["David", "Frank"], 40: ["Eve"] }
```
