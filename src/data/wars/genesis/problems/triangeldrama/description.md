# Triangeldrama

Skriv en funktion **triangeldrama(a,b,c)** som tar emot tre argument a, b, c, vilka är längderna på triangelns sidor. Funktionen ska returnera vilken typ av triangel det är: **"likbent", "oliksidig"** eller **"liksidig"** beroende på vilken typ av triangel det är. Om det inte går att bilda en triangel med de angivna längderna ska din funktion returnera **"no"**

Detta är definitionen för det olika trianglarna:

1. **likbent**: **två** av sidorna är lika långa men den tredje är inte det, exempelvis **4, 3, 3**
2. **oliksidig**: Alla **tre** sidor i triangeln är olika längder, exempelvis **2, 3, 4**
3. **liksidig**: All **tre** sidor i triangeln är samma längd, exempelvis **5, 5, 5**

## Exempel 1

**_Input_**

```bash
a = 2
b = 2
c = 2
```

**_Output_**

```bash
liksidig
```

## Exempel 2

**_Input_**

```bash
a = 3
b = 4
c = 4
```

**_Output_**

```bash
likbent
```

## Exempel 3

**_Input_**

```bash
a = 3
b = 4
c = 5
```

**_Output_**

```bash
oliksidig
```

## Exempel 4

**_Input_**

```bash
a = 7
b = 1
c = 1
```

**_Output_**

```bash
no
```
