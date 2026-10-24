# Skate Tracker (Eiskunstlauf-Tracker)

Eine kleine Web-App im iOS-Look, die sich wie eine native App anfühlt
(„Zum Startbildschirm hinzufügen“ → Vollbild-App, eigenes Icon, offline nutzbar).

## Funktionen
- **Tag**: Einheiten pro Tag anlegen: ❄️ Eistraining, 🏋️ Off-Ice oder 🧩 Patch,
  Trainer (frei benennbar), Dauer in Minuten (frei, in 5-Min-Schritten per Tippfelder),
  Gruppengröße und -namen, Stundensatz mit Live-Vorschau. Kachel „Gesamtkosten
  <fixes Kind>“ zeigt die Tageskosten Ihres Kindes.
- **Stundensatz**: standardmäßig zugeklappt; der am Vortag zuletzt verwendete
  Satz des Trainers wird automatisch übernommen (Default 60 €/h). Tippen auf das
  Satz-Feld klappt die Änderung auf – nur für diese Einheit.
- **Patch-Tickets** (nur bei Typ „Patch“, einklappbar): „Ticketkosten Trainer“
  (Standard 15 €) einmalig pro Einheit, anteilig auf alle Kinder der Gruppe
  verteilt; „Ticketkosten Kind“ (Standard 0 €) pro Kind. Formel pro Kind:
  `(Stundensatz/60 · Minuten + Ticket Trainer) ÷ Gruppengröße + Ticket Kind`.
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

## Cloud-Sync (optional, für zwei Handys)
Unter **Personen → Daten → „☁️ Cloud-Sync einrichten"** verbinden sich mehrere
Geräte mit demselben Datenbestand (Supabase, EU-Region, Gratis-Konto). Einmal
angelegt, sehen alle Geräte dieselben Einheiten, und Änderungen erscheinen nach
Sekunden auch auf dem anderen Handy (offline gemachte Änderungen werden
nachgeliefert, Konfliktregel: pro Datensatz gewinnt die letzte Änderung).

**Einrichtung (einmalig, ~10 Minuten):**
1. Konto auf https://supabase.com anlegen, Projekt in Region **Frankfurt (eu-central-1)** erstellen.
2. Im Dashboard unter **SQL Editor** den Inhalt von `supabase-setup.sql` ausführen.
3. Unter **Authentication → Users → Add user** ein gemeinsames Familienkonto
   anlegen (E-Mail + Passwort, „Mark email as confirmed“ anhaken).
4. Unter **Project Settings → API** die Projekt-URL und den anon-Schlüssel
   ablesen.
5. Auf **jedem** Handy in der App unter Personen → Daten → Cloud-Sync
   einrichten: URL, anon-Schlüssel, dieselbe E-Mail + Passwort eintragen →
   Verbinden. Bestehende Daten beider Geräte werden dabei zusammengeführt.

Hinweise: Der anon-Schlüssel ist öffentlich gedacht; geschützt ist alles durch
das Familienkonto (RLS). Die Sync-Zugangsdaten liegen im localStorage des
Geräts. Fotos wandern als Teil der Datensätze mit durch die Cloud.

## Auf dem iPhone installieren
1. In **Safari** (nicht Chrome!) öffnen: **https://yansan9094.github.io/skate-tracker/**
2. Teilen-Button (Unten in der Leiste) → **„Zum Startbildschirm hinzufügen“**.
3. Fertig: App-Icon ⛸️ startet vollbildschirmartig ohne Safari-Leiste.

## Aktualisieren
Code hier ändern und pushen (`git push`), dann lädt die App nach wenigen
Minuten automatisch die neue Version. Trainingsdaten bleiben auf dem Handy
unverändert erhalten (sie liegen lokal im Safari, nicht auf GitHub).

Hinweis: Die Voreinstellungen heißen bewusst „Kind 1–14“ und „Trainer 1–4“,
da dieses Repo öffentlich ist. Echte Namen einmalig auf dem Handy unter
„Personen“ eintragen – ohne Cloud-Sync verlassen sie das Gerät nie; mit
aktiviertem Sync liegen sie im Supabase-Projekt der Familie.

## Backup
Personen → „Export (JSON)“ regelmäßig ziehen (schickt die Datei per Teilen-
Dialog in Dateien/Notes); „Import“ stellt sie wieder her.

## Teststand
Anlage/Änderung/Löschung von Einheiten, Minuten-Auswahl, Kostenformel (per Hand
nachgerechnet, exakt), Stundensatz-Übernahme vom Vortag, leere Gruppe (nur das
fixe Kind), Personen-CRUD, Foto-Upload, Persistenz nach Neuladen, Export/Import
inkl. Fehlerfall, keine Layout-Überläufe (Viewport 402×874), keine JS-Fehler.
