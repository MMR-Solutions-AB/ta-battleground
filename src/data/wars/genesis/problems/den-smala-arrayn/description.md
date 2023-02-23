# Den smala arrayn

Skriv en funktion **denSmalaArrayn(arr)** som tar emot en nested **array** som argument. Funktionen ska returnera en ny array där alla element från den ursprungliga nested **arrayen** är placerade i en enkel array, i samma ordning som de fanns i den nested **arrayen**.

## Exempel 1

**_Input_**

```bash
arr = [1, [2, [3, 4], 5], [6]]
```

**_Output_**

```bash
[1, 2, 3, 4, 5, 6]
```

**_Förklaring_**

Alla nested arrays är borta och nu och du är kvar med en array. Där alla element ligger i samma ordning som i föregående array.

## Exempel 2

**_Input_**

```bash
arr = [[1, 9], [5], [[[5], [8]]]];
```

**_Output_**

```bash
[1, 9, 5, 5, 8]
```
