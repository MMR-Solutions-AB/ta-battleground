# Running sum of array

Skriv en funktion **runningSumOfArray(nums)** som tar emot en array av positiva heltal. Funktionen ska returnera **the running sum** av **nums**. **The running sum** får vi genom att gå igenom **nums** och kontinuerligt addera upp summan av **nums** vi varje index

## Exempel 1

**_Input_**

```bash
nums = [1, 2, 3, 4]
```

**_Output_**

```bash
[1, 3, 6, 10]
```

**_Förklaring_**

Vi får **the running sum** på genom: [1, 1+2, 1+2+3, 1+2+3+4]

## Exempel 2

**_Input_**

```bash
nums = [5, 2, 2, 1]
```

**_Output_**

```bash
[5, 7, 9, 10]
```

**_Förklaring_**

Vi får **the running sum** på genom: [5, 5+2, 5+2+2, 5+2+2+1]
