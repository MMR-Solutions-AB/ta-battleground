# Objectively freaky friday

Skriv en funktion **invertDictionary(d)** som omvandlar ett object med strängar som nycklar och heltal som värden till en dictionary med heltal som nycklar och listor med strängar som värden. I det nya objectet ska varje tal nyckel vara ett värde i det ursprungliga objectet, och värdet för nyckeln ska vara en array med alla strängar som hade detta värde i det ursprungliga objectet.

## Exempel 1

**_Input_**

```bash
d = { a: 1, b: 2, c: 1 }
```

**_Output_**

```bash
{ 1: ["a", "c"], 2: ["b"] }
```

## Exempel 2

**_Input_**

```bash
d = { abc: 12, skrt: 44 }
```

**_Output_**

```bash
{ 12: ["abc"], 44: ["skrt"] }
```

## Exempel 3

**_Input_**

```bash
d = { dede: 9, lol: 9, popo: 9, matu: 9 }
```

**_Output_**

```bash
{ 9: ["dede", "lol", "popo", "matu"] }
```
