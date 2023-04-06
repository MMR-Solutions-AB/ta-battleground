# Waiting time

Skriv en funktion **waitingTime(patients)** som tar emot en lista av objekt, patients. Varje objekt representerar en patient och har två egenskaper, "arrivalTime" och "startTime" som representerar när patienten anlände till vårdcentralen och när behandlingen började i sekunder sedan midnatt. Funktionen ska returnera genomsnittlig väntetid för alla patienter i sekunder. Avrunda till närmsta heltal.

## Exempel 1

**_Input_**

```js
patients = [
  { arrivalTime: 28800, startTime: 29000 },
  { arrivalTime: 28900, startTime: 29100 },
  { arrivalTime: 29000, startTime: 29200 },
];
```

**_Output_**

```bash
200
```

## Exempel 2

**_Input_**

```js
patients = [{ arrivalTime: 1000, startTime: 1500 }];
```

**_Output_**

```bash
500
```
