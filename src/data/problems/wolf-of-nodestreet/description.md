# Wolf of nodestreet

Skriv en funktion **maxProfit(prices)** som hittar den maximala vinsten som kan uppnås genom att köpa och sälja en aktie. Du kan endast göra en köp- och säljtransaktion. **prices** argument är en **array** av positiva heltal, array representerar olika priser en aktie har i ordning. Ifall ingen vinst kan göras ska du returnera **false**.

## Exempel 1

**_Input_**

```bash
prices = [7, 1, 5, 3, 6, 4]
```

**_Output_**

```bash
5
```

**_Förklaring_**

Köper vi aktien vi **1** så kan vi senare sälja de vi **6** för att uppnå den maximal vinst

## Exempel 2

**_Input_**

```bash
prices = [80, 70, 60, 50]
```

**_Output_**

```bash
0
```

**_Förklaring_**

Eftersom att priset aldrig stiger så finns det inget sett att gå i vinst
