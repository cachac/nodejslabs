# 1. use notus template
node 16
npm i

npm run dev
browser: localhost:3000

# 2. auto fix
npm audit
> 47 vulnerabilities (1 low, 10 moderate, 24 high, 12 critical)

check:
nth-check  <2.0.1
Severity: high


npm audit fix
> 29 vulnerabilities (14 moderate, 11 high, 4 critical)
npm run dev
> Error: Next.js requires react >= 18.2.0 to be installed.


# 3. reset
delete node_modules
delete package-lock.json

# 4. install
npm i

> npm ERR! Could not resolve dependency:

> npm ERR! peer react@"^18.2.0" from next@13.3.1

# 5. restore package.json and install
npm run dev
npm audit
> 47 vulnerabilities (1 low, 10 moderate, 24 high, 12 critical)


# 6. npm-check
npm outdated
npm npm-check -u
npm install
> fail

# 7. Manual fix

check nth-check  url link
> patched versions 2.0.1



## 7.1. preinstall hook
```json
script:
{
	"preinstall": "([ ! -f package-lock.json ] && npm install --package-lock-only --ignore-scripts --no-audit); npx npm-force-resolutions"
}

"resolutions": {
	"nth-check": "2.0.1"
},
```

npm i
npm audit
> 40 vulnerabilities (1 low, 11 moderate, 16 high, 12 critical)

npm run dev

# 8. check node-fetch
"resolutions": {
	"nth-check": "2.0.1",
	"node-fetch": "2.6.7"
},

npm i
npm audit
> 39 vulnerabilities (1 low, 11 moderate, 15 high, 12 critical)

# add postinstall hook
"postinstall": "npm audit",

npm run dev

# 9. minimatch
> 37 vulnerabilities (1 low, 11 moderate, 13 high, 12 critical)

# 10. high vulnerabilities fixed
```json
  "resolutions": {
    "nth-check": "2.0.1",
    "node-fetch": "2.6.7",
    "minimatch": "3.0.5",
    "ansi-html": "0.0.8",
    "glob-parent": "5.1.2",
    "node-forge": "1.3.0" --> "1.0.0"
  },
```

# 11. critical
```json
    "ejs": "3.1.7",
    "shell-quote": "1.7.3",
    "loader-utils": "1.4.1"
```
npm run dev

# 12. hard reset
delete node_modules & lock
npm i
npm audit
npm run dev

> new vulnerabilites
- immer
- loader-utils

```json
    "loader-utils": "1.4.2",
    "immer": "9.0.6"
```

# 13. moderate
```json
    "browserslist": "4.16.5",
    "postcss": "7.0.36",
    "yaml": "2.2.2"
```
npm run dev
# 14. hard reset
# 15. new high
```json
    "next": "12.1.0"
```

# 16. final
```json
  "resolutions": {
    "nth-check": "2.0.1",
    "node-fetch": "2.6.7",
    "minimatch": "3.0.5",
    "ansi-html": "0.0.8",
    "glob-parent": "5.1.2",
    "node-forge": "1.3.0",
    "ejs": "3.1.7",
    "shell-quote": "1.7.3",
    "loader-utils": "1.4.2",
    "immer": "9.0.6",
    "browserslist": "4.16.5",
    "postcss": "7.0.36",
    "yaml": "2.2.2",
    "next": "12.1.0"
  },
```
> found 0 vulnerabilities
