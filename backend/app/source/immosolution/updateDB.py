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
    if lastVersionId["max"] < 0.2:
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
                VALUES ('Als kompetentes und motiviertes Unternehmen bieten wir all unseren Kunden sorgsam abgestimmte Lösungen im Bereich Gebäudemanagement und Gebäudetechnik an. Daher liegen unsere Kernkompetenzen in der Planung und Installation sowie im Betrieb und in der Wartung von gebäudetechnischen Anlagen in den Bereichen Heizung, Kälte/Klima, Lüftung und Sanitär.', 
                'Seit der Gründung des Unternehmens im Jahr 2002 steht Immosolution für Service und Dienstleistungen in Handschlagqualität. Als junges und dynamisches Team, werden wir nun seit Anfang 2020 in neuer Konstellation erfolgreich den gewohnten Ansprüchen aller Bestands- und Neukunden gerecht', 
                'Referenzprojekte sind immer der beste und zuverlässigste Beweis für die Leistungsfähigkeit eines Unternehmens. Einige ausgewählte Beispiele zeigen unsere umgesetzten Projekte, die das Ergebnis intensiver, professioneller und kundenorientierte Arbeit darstellen.',
                'Ein Unternehmen ist nur so gut wie seine Mitarbeiter, weshalb bei uns fachliche Qualifikation und hohes persönliches Leistungs- und Qualitätsbewusstsein an erster Stelle stehen. ', 
                'Neben Privatkunden betreuen wir auch diverse Industrie- und Gewerbeunternehmen wie Hotels und Gastronomie-Betriebe. Gerade deshalb stehen unsere Kunden als Mensch und Geschäftspartner im Mittelpunkt.');

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
        
    if lastVersionId["max"] < 0.3:
        with get_db_cursor() as cursor:
            cursor.execute("""
                INSERT INTO Kunden (firmenname, plz, ort, strasse)
                VALUES  
                ('Fleck Elektroinstallationen GmbH', '1120', 'Wien', 'Wienerbergstraße 25B'),
                ('WEVIG Wohnungseigentumsverwaltungs- und Immobilientreuhand GmbH', '1150', 'Wien', 'Märzstraße 1'),
                ('WIEBE Wiener Bauträger- und EntwicklungsgesmbH', '1150', 'Wien', 'Märzstraße 1'),
                ('Familienwohnbau gemeinnützige Bau- und Siedlungsgesellschaft m.b.H.', '1150', 'Wien', 'Märzstraße 1'),
                ('Hottinger Bruel & Kjaer Austria GmbH', '1230', 'Wien', 'Lemböckgasse 63/2'),
                ('Institut für medizinische u. chemische Labordiagnostik Gesellschaft m.b.H', 'diverse Labore', 'diverse Labore', 'diverse Labore'),
                ('BHB Boutique Hotel Betriebs GmbH THE GUEST HOUSE VIENNA', '1010', 'Wien', 'Führichgasse 10'),
                ('Zentralverband der Hausbesitzer – Hausbesitzerhilfsverein', '1010', 'Wien', 'Landesgerichtsstraße 6'),
                ('Hofer Richard GmbH', '7423', 'Pinkfeld', 'Julius-Raab-Straße 11'),
                ('DG-Ausbau', '1010', 'Wien', 'Stubenring 22'),
                ('Manner Shop', '1010', 'Wien', 'Stephansplatz 7'),
                ('iSi Automotive Austria GmbH', '1210', 'Wien', 'Scheydgasse 30-32'),
                ('Wohnhausanlage samt Solar/Heizung', '1210', 'Wien', 'Donaufelderstraße 91'),
                ('Wohnhausanlage Vöslauerstraße 74', '2500', 'Baden', 'Vöslauerstraße 74'),
                ('Sanierung eines Privathauses', '5084', 'Großgmain', 'Großgmain 487'),
                ('Bankfilialen (Raiffeisenbank)', 'Österreich', 'Österreich', 'Österreich'),
                ('Hotel König von Ungarn GmbH', '1010', 'Wien', 'Schulerstraße 10'),
                ('Meininger Hotel Wien', '1020', 'Wien', 'Rembrandtstraße 21'),
                ('Hotel Landhaus Moserhof GmbH', '2352', 'Gumpodslkirchen', 'Wienerstraße 53'),
                ('Electronic Partner Austria GmbH', '2351', 'Wiener Neudorf', 'Industriezentrum NÖ-SÜD'),
                ('Privatstiftung zur Unterstützung und Bildung von Arbeitnehmer/Innen', '1060', 'Wien', 'Kaunitzgasse 2/8'),
                ('Brix Zaun + Tor GmbH', '7201', 'Neudörfl', 'Fabriksgelände'),
                ('Diverse Ordinationen und Apotheken', 'Wien und Niederösterreich', 'Wien und Niederösterreich', 'Wien und Niederösterreich');
                
                INSERT INTO Projekte (projektname, herzeigeprojekte, kunden_kundenname)
                VALUES
                ('DG Ausbau', true, 'DG-Ausbau'),
                ('Austausch der Klimaanlage', true, 'Manner Shop'),
                ('Solar- und Heizungsanlage', true, 'Wohnhausanlage samt Solar/Heizung'),
                ('Eigenheim-Sanierung', true, 'Sanierung eines Privathauses'),
                ('Sanierung von Gaskesselanlage auf Fernwärmestation', true, 'Wohnhausanlage Vöslauerstraße 74');
            """)
        addVersion(0.3, 'Kunden implementiert')
    if lastVersionId["max"] < 0.4:
        with get_db_cursor() as cursor:
            cursor.execute("""
                create type rolesENUM as enum('ADMIN');
                CREATE TABLE IF NOT EXISTS users(
                    username VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    role rolesENUM,
                    PRIMARY KEY (username)
                );
                INSERT INTO users (username, password, role)
                VALUES ('admin', '$2a$10$EuMetZvSiZfX.TI33ohhhuqvld6WLby2LXqDIKU37EvmNbXiNi9oK', 'ADMIN');
            """)
        addVersion(0.4, 'create users table')
    