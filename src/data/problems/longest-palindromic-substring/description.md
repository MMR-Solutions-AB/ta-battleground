# Longest palindromic substring

Skriv en funktion **longestPalindromicSubstring(s)** som returnerar den längsta palindromiska understrängen i strängen **s**. En palindromisk understräng är en understräng som är en palindrom, det vill säga en ord som läses likadant både framifrån och bakifrån.

## Exempel 1

**_Input_**

```bash
s = "adxyxlo"
```

**_Output_**

```bash
"xyx"
```

**_Förklaring_**

Det längsta, och enda, palindromet i hela strängen är **xyx**

## Exempel 2

**_Input_**

```bash
s = "abc"
```

**_Output_**

```bash
""
```

**_Förklaring_**

Det finns inget palindrome i strängen, så vi returnerar en tom sträng

## Exempel 3

**_Input_**

```bash
s = "aba"
```

**_Output_**

```bash
"aba"
```

**_Förklaring_**

Hela strängen är ett palindrome, så vi returnerar hela strängen
