# Skate Tracker (Eiskunstlauf-Tracker)

Eine kleine Web-App im iOS-Look, die sich wie eine native App anfühlt
(„Zum Startbildschirm hinzufügen“ → Vollbild-App, eigenes Icon, offline nutzbar).

## Funktionen
- **Tag**: Einheiten pro Tag anlegen: ❄️ Eistraining oder 🏋️ Off-Ice, Trainer
  (frei benennbar), Dauer in Minuten (Schnellauswahl 30–120 + frei,
  in 5-Min-Schritten), Gruppengröße und -namen, Stundensatz mit Live-Vorschau.
- **Stundensatz**: Der am Vortag zuletzt verwendete Satz des Trainers wird für
  den nächsten Tag automatisch übernommen (Default 60 €/h, je Trainer änderbar).
- **Trainingsgruppe**: Kinder in fester Reihenfolge; das erste Kind (z.B. Ihre
  Tochter) ist immer automatisch dabei und nicht abwählbar. Ohne Auswahl
  weiterer Kinder trägt es die vollen Kosten – funktioniert also ganz ohne
  Namensangabe.
- **Kosten**: Übersicht pro Kind: aktueller Monat + alle vergangenen Monate,
  Tages-/Monats-/Gesamtkosten nach Formel
  `Stundensatz/60 · Trainingsminuten ÷ Anzahl Kinder der Gruppe`,
  plus Statistiken (Anzahl Eis-/Off-Ice-Einheiten, Eiszeit, Off-Ice-Zeit,
  6-Monats-Balkendiagramm).
- **Personen**: Trainer und Kinder hinzufügen/umbenennen/löschen; Grund-
  Stundensatz je Trainer; Foto je Person (Avatar, wird automatisch komprimiert).
  Gelöschte Personen bleiben in der Kostenhistorie erhalten.
- **Daten**: alles lokal im Safari des iPhones (localStorage), Export/Import
  als JSON-Backup unter Personen → Daten.

## Auf dem iPhone installieren
Voraussetzung: die Dateien sind über eine HTTPS-Adresse erreichbar, z.B.
GitHub Pages (empfohlen, kostenlos) oder jeder eigene Webserver mit HTTPS.

1. `index.html`, `manifest.json`, `sw.js`, `icon-*.png`, `apple-touch-icon.png`
   auf den Host kopieren (z.B. GitHub-Repo → Settings → Pages).
2. In **Safari** die URL öffnen.
3. Teilen-Button → **„Zum Startbildschirm hinzufügen“**.
4. Fertig: App-Icon ⛸️, startet vollbildschirmartig ohne Safari-Leiste.

Schnell-Test im Heimnetz (ohne HTTPS, funktioniert, aber der Offline-Cache ist
dann deaktiviert und Safari kann LocalStorage bei Http-Adressen gelegentlich
zurücksetzen – für den Dauerbetrieb also HTTPS nutzen):

    cd skate-tracker && python3 -m http.server 8000
    # iPhone (gleiches WLAN): http://IP-DIESERS-MASCHINE:8000

## Backup
Personen → „Export (JSON)“ regelmäßig ziehen (schickt die Datei per Teilen-
Dialog in Dateien/Notes); „Import“ stellt sie wieder her.

## Teststand
Anlage/Änderung/Löschung von Einheiten, Minuten-Auswahl, Kostenformel (per Hand
nachgerechnet, exakt), Stundensatz-Übernahme vom Vortag, leere Gruppe (nur das
fixe Kind), Personen-CRUD, Foto-Upload, Persistenz nach Neuladen, Export/Import
inkl. Fehlerfall, keine Layout-Überläufe (Viewport 402×874), keine JS-Fehler.
