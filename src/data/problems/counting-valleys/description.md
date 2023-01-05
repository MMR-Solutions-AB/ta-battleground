# Counting Valleys

_Bob_ den ivriga bergsbestigare för noggrant register över sina vandringar. Under den senaste vandringen som tog exakt **8** steg, noterades det för varje steg om det var en uppförsbacke, **U**, eller en nedförsbacke, **N**. Vandringar börjar och slutar alltid vid havsnivån, och varje steg upp eller ner representerar en **1** enhetsförändring i höjden. Din uppgift blir att med hjälp av en variabel, **path** vilket är en sträng som representerar ifall hans steg var en uppförsbacke eller en nerförsbacke, lista ut hur många gånger **unika** **dalar** _Bob_ begick.

En **dal** definieras utav att _Bob_ går under havsnivå

## Exempel 1

**_Input_**

```bash
path = "UNNNUNUU"
```

**_Output_**

```bash
1
```

**_Förklaring_**

Om vi låter **\_** vara havsnivå, en uppförsbacke vara **/** och en nedförsbacke vara **\\** så hade man kunnat rita _Bobs_ vandring på följande sett

```bash
 _/\      _
    \    /
     \/\/
```

Här kan vi se att _Bob_ enbart vandrar i en **Dal** en enda gång, även om den dalen är ganska lång så är det fortfarande bara en enda **dal**. Kom ihåg, för att _Bob_ ska kunna vandra i en ny dal behöver han komma upp till havsyta igen, vilket han aldrig gör i detta exempel tills att han är klar

## Exempel 2

**_Input_**

```bash
path = "NUNUNU"
```

**_Output_**

```bash
3
```
