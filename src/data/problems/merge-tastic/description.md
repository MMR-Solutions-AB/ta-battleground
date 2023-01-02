# Merge tastic

Skriv en funktion **mergeTastic(obj1, obj2)** som slår samman två object med strängar som nycklar och heltal som värden till en dictionary. I det nya objektet ska varje strängnyckel vara nyckel i det ursprungliga objektet, och värdet för nyckeln ska vara summan av värdena för nyckeln i bägge ursprungliga object. Om en nyckel finns i en av de ursprungliga object men inte i den andra, ska den tas med i det nya objektet med det ursprungliga värdet.

## Exempel 1

**_Input_**

```bash
obj1 = { a: 1, b: 2 }
obj2 = { a: 5, b: 9 }
```

**_Output_**

```bash
{ a: 6, b: 12}
```

## Exempel 2

**_Input_**

```bash
obj1 = { nummer: 0, integer: 3 }
obj2 = { nummer: 12 }
```

**_Output_**

```bash
{ nummer: 12, integer: 3 }
```
