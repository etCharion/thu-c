# Thu'C – projekt poznámky pro Claude

## Git / GitHub

Repozitář: `etCharion/thu-c`

Token je uložen v `.git/config` jako součást remote URL (lokálně, nikdy se nepushuje).
`git push origin <branch>` funguje přímo bez dalšího nastavení.

**Důležité:** Proxy resetuje remote URL při každém sezení. Na začátku každé konverzace spusť:
```
git remote set-url origin https://<TOKEN>@github.com/etCharion/thu-c.git && git fetch origin
```
Token si vyžádej od uživatele pokud ho nemáš k dispozici z předchozího kontextu.

Development branch: `claude/review-dnd-character-bmHfc`
