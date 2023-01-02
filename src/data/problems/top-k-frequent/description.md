# Top k-frequent

Skriv en funktion **topKFrequent(nums, k)** som returnerar en lista med de **k** mest förekommande elementen i listan **nums**.

## Exempel 1

**_Input_**

```bash
nums = [1, 1, 1, 2, 2, 3]
k = 2
```

**_Output_**

```bash
[1, 2]
```

**_Förklaring_**

Vår array **nums** har **3** unika värden, **1** som förekommer 3 gånger, **2** som förekommer 2 gånger och **3** som förekommer 1 gång, och ifall vi ordnar det i ordning av mest förekommande får vi **[1, 2, 3]**. Eftersom att **k** är **2** betyder det att vi ska enbart returnera det **2** första element, alltså **[1, 2]**

## Exempel 2

**_Input_**

```bash
nums = [6, 4, 4, 9, 9, 9, 9]
k = 1
```

**_Output_**

```bash
[9]
```

**_Förklaring_**

Vår array **nums** har **3** unika värden, **6**, **4** och **9**, och ifall vi ordnar det i ordning av mest förekommande får vi **[9, 4, 6]**. Eftersom att **k** är **1** betyder det att vi ska enbart returnera det första element, alltså **[9]**

## Exempel 3

**_Input_**

```bash
nums = [2, 0, 0, 3, 1, 2, 1, 8]
k = 3
```

**_Output_**

```bash
[0, 1, 2]
```

**_Förklaring_**

Vår array **nums** har **5** unika värden, **0** som förekommer 2 gånger, **1** som förekommer 2 gånger, **2** som förekommer 2 gånger, **3** som förekommer 1 gång och **8** som förekommer 1 gång, och ifall vi ordnar det i ordning av mest förekommande får vi **[0, 1, 2, 3, 8]**, vi sorterar även listan här. Eftersom att **k** är **3** betyder det att vi ska enbart returnera det **3** första element, alltså **[0, 1, 2]**
