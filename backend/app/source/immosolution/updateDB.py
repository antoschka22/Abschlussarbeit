from dao.db import get_db_cursor

def updateDatabase():
    def checkTables():
        """
            checks if all the tables exist
        """
        with get_db_cursor() as cursor:
            cursor.execute("""SELECT count(*) as amountoftables
                            FROM pg_catalog.pg_tables
                            WHERE schemaname != 'pg_catalog' AND 
                            schemaname != 'information_schema';
                            """)
            return cursor.fetchone()

    def checkDBVersionTableExists():
        """
            function checks if the table db_version which stores the versions of the dbs exists
        """
        with get_db_cursor() as cursor:
            cursor.execute("""SELECT *
                            FROM INFORMATION_SCHEMA.TABLES
                            WHERE TABLE_SCHEMA = 'public'
                            AND TABLE_NAME = 'db_version'; 
                            """)
            return cursor.fetchone()
    if not checkDBVersionTableExists():
        """
            creates the db_version table if it doesnt exist
        """
        with get_db_cursor() as cursor:
            cursor.execute("""
                            CREATE TABLE db_version (
                            id FLOAT(5) PRIMARY KEY,
                            comment VARCHAR(255) NOT NULL);
                            """)
    def latestVersion():
        """
            Get the current version of the db
        """
        with get_db_cursor() as cursor:
            cursor.execute("select max(id) from db_version")
            return cursor.fetchone()

    def addVersion(version, comment):
        """
            add next new version with a comment
        """
        with get_db_cursor() as cursor:
            cursor.execute("""
                            insert into db_version (id, comment)
                            values(%s, %s)""", [version, comment])

    checkAllTheTables = checkTables()
    lastVersionId = latestVersion()
    if checkAllTheTables['amountoftables'] == 1:
        if lastVersionId["max"] != 0.1:
            addVersion(0.1, 'test')
    if lastVersionId["max"] != 0.2:
        with get_db_cursor() as cursor:
            cursor.execute("""
                CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
                CREATE TABLE IF NOT EXISTS Infos( 
                    id UUID DEFAULT uuid_generate_v4 () UNIQUE,
                    angebot VARCHAR(65535) NOT NULL,
                    gruedung VARCHAR(65535) NOT NULL,
                    referenzprojekte VARCHAR(65535) NOT NULL,
                    mitarbeiter VARCHAR(65535) NOT NULL,
                    privatkunden VARCHAR(65535) NOT NULL,
                    PRIMARY KEY (id)
                );
                CREATE TABLE IF NOT EXISTS Kunden(
                    firmenname VARCHAR(65535) NOT NULL,
                    PLZ VARCHAR(65535) NOT NULL,
                    ort VARCHAR(65535) NOT NULL,
                    strasse VARCHAR(65535) NOT NULL,
                    PRIMARY KEY (firmenname)
                );
                CREATE TABLE IF NOT EXISTS Projekte(
                    id UUID DEFAULT uuid_generate_v4 () UNIQUE,
                    projektname VARCHAR(65535) NOT NULL UNIQUE,
                    herzeigeprojekte BOOLEAN NOT NULL,
                    kunden_kundenname VARCHAR(65535),
                    PRIMARY KEY (id),
                    FOREIGN KEY (kunden_kundenname) REFERENCES Kunden(firmenname) ON DELETE CASCADE
                );
                CREATE TABLE IF NOT EXISTS Bilder(
                    id UUID DEFAULT uuid_generate_v4 () UNIQUE,
                    projektbilder VARCHAR(65535),
                    projekt_id UUID,
                    PRIMARY KEY (id),
                    FOREIGN KEY (projekt_id) REFERENCES Projekte(id) ON DELETE CASCADE
                );
                CREATE TABLE IF NOT EXISTS Leistungen(
                    leistung VARCHAR(65535),
                    PRIMARY KEY (Leistung)
                );
                CREATE TABLE IF NOT EXISTS Arbeit(
                    id UUID DEFAULT uuid_generate_v4 () UNIQUE,
                    beschreibung VARCHAR(65535) NOT NULL,
                    leistungen_leistung VARCHAR(65535),
                    PRIMARY KEY (id),
                    FOREIGN KEY (leistungen_leistung) REFERENCES Leistungen(leistung) ON DELETE CASCADE
                );
                INSERT INTO Infos(angebot, gruedung, referenzprojekte, mitarbeiter, privatkunden)
                VALUES ('
                Als kompetentes und motiviertes Unternehmen bieten wir all unseren Kunden sorgsam abgestimmte Lösungen im Bereich Gebäudemanagement und Gebäudetechnik an. Daher liegen unsere Kernkompetenzen in der Planung und Installation sowie im Betrieb und in der Wartung von gebäudetechnischen Anlagen in den Bereichen Heizung, Kälte/Klima, Lüftung und Sanitär. 
                ', '
                Seit der Gründung des Unternehmens im Jahr 2002 steht Immosolution für Service und Dienstleistungen in Handschlagqualität. Als junges und dynamisches Team, werden wir nun seit Anfang 2020 in neuer Konstellation erfolgreich den gewohnten Ansprüchen aller Bestands- und Neukunden gerecht
                ', '
                Referenzprojekte sind immer der beste und zuverlässigste Beweis für die Leistungsfähigkeit eines Unternehmens. Einige ausgewählte Beispiele zeigen unsere umgesetzten Projekte, die das Ergebnis intensiver, professioneller und kundenorientierte Arbeit darstellen.
                ', '
                Ein Unternehmen ist nur so gut wie seine Mitarbeiter, weshalb bei uns fachliche Qualifikation und hohes persönliches Leistungs- und Qualitätsbewusstsein an erster Stelle stehen. 
                ', '
                Neben Privatkunden betreuen wir auch diverse Industrie- und Gewerbeunternehmen wie Hotels und Gastronomie-Betriebe. Gerade deshalb stehen unsere Kunden als Mensch und Geschäftspartner im Mittelpunkt. 
                ');

                INSERT INTO Leistungen (leistung)
                VALUES 
                ('Gebäudemanagement'),
                ('Gebäudetechnik');

                INSERT INTO Arbeit (beschreibung, leistungen_leistung)
                VALUES 
                ('Neuinstallationen & Sanierungen', 'Gebäudemanagement'),
                ('Wartungen & Reparaturen', 'Gebäudemanagement'),
                ('technische Dokumentationen und Befunde', 'Gebäudemanagement'),
                ('Kälte- & Klimatechnische Anlagen', 'Gebäudetechnik'),
                ('Heizungs- & Lüftungstechnische Anlagen', 'Gebäudetechnik'),
                ('Sanitär- & Gastechnische Anlagen', 'Gebäudetechnik'),
                ('Solartechnik und nachhaltige Wärmetechnik', 'Gebäudetechnik');
                """)
        addVersion(0.2, 'basic tables creation')
    if lastVersionId["max"] != 0.2:
        with get_db_cursor() as cursor:
            cursor.execute("""

            """)