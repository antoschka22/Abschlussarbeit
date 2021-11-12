# FIT Abschlussprüfung
Unser Projekt ist in 4 Ordner unterteilt, der Backendentwickler kümmert sich um die Ordner ``admin, backend und database`` und der Frontendwentwickler um den Ordner ``frontend``.<br><br>
### !!! DER CODE DES FRONTENDENTWICKLERS MUSS IM ``./frontend/immosolution_frontend`` SEIN<br><br>

## docker-compose 
Docker-compose hat zwei Commands, die für Anfänger notwendig sind.
```bash
docker-compose build

docker-compose up -d
```
Mit dem ersten Command erstellst du die Abbildungen und mit dem zweiten Command machst aus du aus ihnen die Kontainer. Unter *``localhost:8080``* sollte dann das Frontend sichtbar sein.<br>
### Wenn du dein Frontend änderst, musst du dein Code compilieren und einen neuen Kontainer machen.<br><br>
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
# Um alle Kontainer aufzulisten
docker ps
```