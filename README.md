# vue-copos

This template should help get you started developing with Vue 3 in Vite.

## Project Setup
```sh
npm install
```

### Compile and Hot-Reload for Development
```sh
npm run dev
```

### Compile and Minify for Production
```sh
npm run build
```

### Customize configuration
See [Vite Configuration Reference](https://vitejs.dev/config/).

## Web Application

### Menu views
#### Real COPOS menu views
- [x] Default
  - [ ] Non scan
  - [ ] Opzoeken kassabon
  - [ ] Saldo cadeaukaart
  - [ ] Prijs opvraag
  - [ ] Opzoeken klant
  - [ ] Zelfscan


- [x] Supervisor
  - [ ] Betalen rekening
  - [ ] Retour zegels
  - [ ] Kopen zegels
  - [ ] Volume regelen
  - [x] Training
  - [x] Lade open
  - [ ] Lade naar kluis
  - [ ] Klantenorder
  - [ ] Klantenorder via klantenkaart
  - [ ] Kas in
  - [ ] Kas uit
  - [ ] Bon uit wacht
  - [ ] Retour artikel
  - [ ] Retourmodus handmatig
  - [ ] Retourmodus kassabon


- [x] Kassa PLU's
  - [x] Broodjes
  - [x] Stuks fruit
  - [x] Stuks groente
  - [x] Wegen appels & peren
  - [x] Wegen fruit
  - [x] Wegen groente
  - [ ] Bier
  - [ ] Telefoon kaarten
  - [ ] Service en diensten
  - [ ] Overig
  - [ ] Lokale artikelen
  - [ ] Lege kratten
  - [ ] Reserve
  - [ ] Leeg


- [x] Afrekenen
  - [ ] TGTG magicbox
  - [ ] TGTG broodbox
  - [ ] Zegelboekjes diversen
  - [ ] Mobiele PIN
  - [ ] Verkoop op rekening
  - [ ] Opzoeken klant
  - [ ] Extra pinnen
  - [ ] Emballage retour
  - [ ] Cadeaukaart
  - [ ] Waardebon
  - [x] Briefgeld
    - [x] 5 EUR
    - [x] 10 EUR
    - [x] 20 EUR
    - [x] 50 EUR
    - [x] 100 EUR
  - [x] Contant
  - [x] PIN


- [x] Afmelden
- [x] Terug

#### Util menu views
- [x] Not Found Menu

## To Do:
- [x] Refactor `vuex stores` and cleanup project
- [x] Implement Alerts
- [ ] Implement Pin betalen
- [x] Add kassalade
- [ ] Add kassabon
- [ ] Add koopzegels printen alert

## Bugs
- [x] Fix `TransactionDetailsInputLine` content updating weirdly after navigating.
- [ ] Pressing Enter in the final screen causes a NaN on the payment screen.