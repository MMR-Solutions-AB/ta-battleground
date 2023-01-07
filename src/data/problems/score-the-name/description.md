# Score the name

Skriv en funktion **scoreTheName(s)** som tar emot en sträng. Funktionen ska returnera summan av alla bokstävers positioner i alfabetet. Du kan anta att strängen **s** enbart innehåller små bokstäver samt inga mellanslag, alla bokstäver kommer vara mellan **a-z** och kan ha upprepande bokstäver

## Exempel 1

**_Input_**

```bash
s = "lucio"
```

**_Output_**

```bash
60
```

**_Förklaring_**

Om vi kollar på vilken position varje bokstav i strängen **"lucio"** kommer i alfabetet så kan vi se att att **l** kommer på **12** plats, **u** kommer på **21** plats, **c** kommer på **3** plats, **i** kommer på **9** plats och **o** kommer på **15** plats. Adderar vi alla dessa nummer får vi **12 + 21 + 3 + 9 + 15 = 60**

## Exempel 2

**_Input_**

```bash
s = "abba"
```

**_Output_**

```bash
6
```

**_Förklaring_**

Om vi kollar på vilken position varje bokstav i strängen **"abba"** kommer i alfabetet så kan vi se att att **a** kommer på **1** plats och **b** kommer på **2** plats. Adderar vi alla dessa nummer får vi **1 + 2 + 2 + 1 = 6**
