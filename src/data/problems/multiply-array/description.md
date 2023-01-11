# Multiply array

Skriv en funktion **multiplyArray(arr, cb)** som tar emot en array **arr** av tal och en callback funktion **cb**. Funktionen ska returnera en ny array där varje element i **arr** har blivit multiplicerat med värdet som returneras från callback funktionen när den körs med elementet som argument.

Denna uppgift är bra tillfälle att träna på **callback** funktioner och **array.map** metoden

## Exempel 1

**_Input_**

```bash
arr = [1, 2, 3]
cb = (x) => x * 2
```

**_Output_**

```bash
[2, 4, 6]
```

**_Förklaring_**

Vårt argument **cb** är en funktion som tar emot ett nummer och sedan returnerar samma nummer gånger två. Vilket betyder att ifall vi hade kört den funktionen på varje element i array:n **arr** så kommer vi få en ny array med **2** gånger så stora tal.

## Exempel 2

**_Input_**

```bash
arr = [4, 5, 6]
cb = (x) => x * x
```

**_Output_**

```bash
[16, 25, 36]
```

**_Förklaring_**

Vårt argument **cb** är en funktion som tar emot ett nummer och sedan returnerar samma nummer gånger sig själv, alltså att vi tar numret upphöjt till två. Vilket betyder att ifall vi hade kört den funktionen på varje element i array:n **arr** så kommer vi få en ny array där varje element är det tidigare element upphöjt till två. **4 \* 4 = 16**, **5 \* 5 = 25** och **6 \* 6 = 36**
