# Webbshop autentiserings-backend

Webbshoppens backend är separerade i webbshops-funktioner och user-funktioner. I detta repository finns user-realterade backenden, registrering, inlogg med auth etc.

## Versioner

- Node: `22.20.0`
- npm: `10.9.3`
- Express: `^5.1.0`

## Installera nvm, node och npm

### NVM

- ### Linux/Mac installation

  - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash`
  - `export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"`
  - `[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"` (Laddar in nvm utan att starta om terminalen)

- ### Windows installation
  - Klicka på 'Download Now!' i [nvm-windows repots Readme](https://github.com/coreybutler/nvm-windows#readme)
  - Installera .exe filen tillhörande den senaste releasen
  - Följ installations programmet

Kontrollera installation genom att köra `nvm -v` i terminalen

### Installera node och npm

- Kör `nvm install`
  - Kommandot installerar också npm samtidigt
  - Kommandot byter även till den installerade node- och npm versionen

## Kom igång

### Ta hem repot

- Navigera dit du vill klona projektet
- Klona repot: `git clone https://github.com/Frommflin/webshop-auth-backend.git`
- Navigera in i repomappen: `cd webshop-auth-backend`
- Kör: `nvm use`
  - förväntad output: `Now using node v22.20.0 (npm v10.9.3)`

### Installera dependencies

`npm install`

### Kör dev-server

`npm run dev`

### Använd https server med självsignerande certifikat

1. Se till att `NODE_ENV=production` är satt till production i env

2.
```
npm install

npm run generate-certs
``` 
3. Då det är ett självsignerande certifikat kan browsern se det som osäkert, tryck avancerat --> frotsätt(osäkert) för att bortse från varningen 

## CI workflow

Projektet genomgår test server-start (`npm run start`) vid varje push in i `main`-branchen. Resultat av bygget hittas under `Actions` > `Node.Js CI` i repo-menyn, alternativ navigera direkt till `https://github.com/Frommflin/webshop-auth-backend/actions`

## ⚖️ GDPR-efterlevnad

> ℹ️ Detta delsystem hanterar följande GDPR-områden:  
> Consent (7), Access (15), Deletion (17), Security (32), Audit Logs (30)  
> För övriga GDPR-punkter, se:  
> [Frontend](https://github.com/Frommflin/webshop-react-frontend) och [Shop-backend](https://github.com/Frommflin/webshop-shop-backend)

### 📜 Plan och implementering

| # | GDPR-område | Artikel | Status | Förklaring |
|:-:|:-------------|:--------|:--------|:------------|
| 1 | **Consent Management** | 7 | ❌ | Samtycke vid registrering för att lagra personuppgifter. |
| 2 | **Data Access Requests** | 15 | ❌ | Endpoint `/user-data` för att visa sparad användardata. |
| 3 | **Data Deletion Requests** | 17 | ❌ | Endpoint `/delete-account` för att radera konto och data. |
| 4 | **Security Measures** | 32 | ❌ | Hashning, saltning, JWT med HttpOnly-cookie, Helmet, CSRF-skydd, HTTPS. |
| 5 | **Consent Logs & Audit Trails** | 30 | ❌ | Loggning av användarsamtycke och ändringar över tid. |
| 6 | **Regular Updates** | 24 | ❌ | Kontinuerlig uppdatering av beroenden och säkerhetsrutiner. |

---

## 🧩 Planerade tekniska säkerhetsåtgärder

- Hashning och saltning med **bcrypt**
- JWT med **HttpOnly-cookie**
- **Helmet** för säkra HTTP-headers  
- **CORS** med whitelistade domäner  
- **CSRF-token** för skydd mot Cross-Site Request Forgery  
- **Input-sanering** (express-validator, DOMPurify)
- **HTTPS** i utvecklings- och produktionsmiljö
- **Loggning av samtycke och aktivitet**
- **Endpoint för dataåtkomst och radering**