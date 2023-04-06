# Buy apartment

Skriv en funktion **buyApartment(price, bank)** som tar emot 2 argument, **price** som är priset på lägenheten och **bank** som är hur mycket pengar du har i cash just nu.

I våran fantasi värld så måste man ha minst 17% av priset på lägenheten i cash. Funktionen ska returnera **SÅLD** eller **Medges ej**, beroende på om man klarar av kravet eller ej.

## Exempel 1

**_Input_**

```bash
price = 5 000 000
bank = 1 200 000
```

**_Output_**

```bash
"SÅLD"
```

**_Förklaring_**

**17%** av **5 000 000** är **850 000**, eftersom att vi har **1 200 000** så har vi råd att köpa lägenheten

## Exempel 2

**_Input_**

```bash
price = 3 000 000
bank = 315 000
```

**_Output_**

```bash
"Medges ej"
```
