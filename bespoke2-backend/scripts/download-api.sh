#!/bin/bash

# Datumkennzeichen fuer Dateiname
DATUMKENNZEICHEN=$(date +"%Y-%m-%d-%H%M-%Ssek")

API_URL="https://api.coingecko.com/api/v3/coins/list"

ZIELORDNER='../data'

curl -s "$API_URL" -o "$ZIELORDNER/api-list-$DATUMKENNZEICHEN.json"

# manuell: Script direkt in der Bash aufrufen
# Button auf http://localhost:5173/cockpit.html
# TODO Beachten bei Deployment: (und vorher testweise) 
### Cronjob einrichten
# crontab -e  # bei Render über Webinterface, siehe auch "import cron from 'node-cron';"
# Cronjobzeile:
# 0 8,16 * * *   /vollstaendigerPfad/zu/backend/scripts/download-api.sh
# Zur vollen Stunde um 8 und um 16 Uhr

# * * * * * auszuführender Befehl
# │ │ │ │ │
# │ │ │ │ └──── Wochentag (1-7 oder mon,tue,wed,thu,fri,sat,sun)
# │ │ │ └────── Monat (1-12)
# │ │ └──────── Tag (1-31)
# │ └────────── Stunde (0-23)
# └──────────── Minute (0-59)
#
