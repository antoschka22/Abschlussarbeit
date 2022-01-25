# FIT Abschlussprüfung
## How to use

### !!! Sie müssen Git, Angular, NodeJs und Docker installiert haben. Sonst funktionieren diese Commands nicht. !!!

1. code fetchen
```bash
git clone https://github.com/antoschka22/abschlussarbeit.git
```

2. im immosolution-frontend Ordner node-modules herunterladen 
```bash
# in den Angular Ordner gehen
cd .\abschlussarbeit\frontend\immosolution-frontend\

# Module installieren
npm install
```

3. ebenfalls im immosolution-frontend Ordner Angular-Projekt kompilieren 
```bash
# Angular Projekt auf JavaScript übersetzen 
ng.cmd build
```

4. Docker-Abbildung und Docker-Container erstellen
```bash
# Image bilden
docker-compose build

# Container erstellen
docker-compose up -d
```
# Zusäztliche Commands
```bash
#Angular-Web-Server starten
ng.cmd serve --open
```


<br><br>
Unser Projekt ist in 3 Ordner unterteilt, der Backendentwickler kümmert sich um die Ordner ``frontend/admin, backend und database`` und der Frontendentwickler ``frontend/frontend``.<br><br>

## docker-compose 
Docker-compose hat zwei Commands, die für Anfänger notwendig sind.
```bash
docker-compose build

docker-compose up -d
```
Mit dem ersten Command erstellst du die Abbildungen und mit dem zweiten Command machst aus du aus ihnen die Container. Unter *``localhost:8080``* sollte dann das Frontend sichtbar sein.<br>
### Wenn du dein Frontend änderst, musst du dein Code compilieren und einen neuen Container machen.<br><br>
## Weitere Docker Befehle
```bash
# Um ein Abbildung vom frontend zu machen, anstatt alle Abbildungen (frontend, admin, backend, database)
docker-compose build frontend
```
```bash
# Um die Fehlermeldungen des Kontainers zu sehen, dies wird benutzt, wenn der Kontainer nicht starten kann
docker logs immosolution_frontend
```
```bash
# Um alle Container aufzulisten
docker ps
```