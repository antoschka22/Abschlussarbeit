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
    
    if lastVersionId["max"] < 0.5:
        with get_db_cursor() as cursor:
            cursor.execute("""
                INSERT INTO projekte (projektname, herzeigeprojekte, kunden_kundenname)
                VALUES 
                ('Austausch der Kältetechnischen Anlage in einer großen Schokoladenmanufaktur in der Wiener Innenstadt', true, 'Fleck Elektroinstallationen GmbH'),
                ('Eigenheim Sanierung samt Errichtung der haustechnischen anlagen in Salzburg', true, 'WEVIG Wohnungseigentumsverwaltungs- und Immobilientreuhand GmbH'),
                ('Errichtung der kältetechnischen Anlage für ein Bürogebäude am Wiener Neubaugürtel', true, 'WIEBE Wiener Bauträger- und EntwicklungsgesmbH'),
                ('Errichtung einer Solaranlage auf dem Dach einer Wohnhausanlage in Wien Donaustadt', true, 'Familienwohnbau gemeinnützige Bau- und Siedlungsgesellschaft m.b.H.'),
                ('Montage einer Fußbodenheizung in einer Wohnung in Simmering', true, 'Hottinger Bruel & Kjaer Austria GmbH'),
                ('Sanierung Zinshaus samt Dachgeschossausbau am Ring', true, 'Institut für medizinische u. chemische Labordiagnostik Gesellschaft m.b.H'),
                ('Neu Errichtung einer Wohnhausanlage mit 19 Wohneinheiten in Hernals', false, 'BHB Boutique Hotel Betriebs GmbH THE GUEST HOUSE VIENNA'),
                ('Sanierung von 5 Operationssälen im Militärkrankenhaus in Ulaanbaatar', false, 'Zentralverband der Hausbesitzer – Hausbesitzerhilfsverein'),
                ('Umbau der gasbetriebenen Heizhausanlage auf Fernwärmeversorgung einer Wohnhausanlage in Baden bei Wien', false, 'Hofer Richard GmbH'),
                ('Zubau am Bürogebäude der Firma Fleck', false, 'DG-Ausbau');
            """)
        addVersion(0.5, 'insert all the images')
    if lastVersionId["max"] < 0.6:
        with get_db_cursor() as cursor:
            cursor.execute("""
                INSERT INTO bilder (projektbilder, projekt_id)
                VALUES 
                ('1.jpg', 'c5849770-6114-4571-b2f8-5f0b92818c35'),
                ('2.jpg', 'c5849770-6114-4571-b2f8-5f0b92818c35'),
                ('3.jpg', 'c5849770-6114-4571-b2f8-5f0b92818c35'),
                ('4.jpg', 'c5849770-6114-4571-b2f8-5f0b92818c35'),
                ('5.jpg', 'c5849770-6114-4571-b2f8-5f0b92818c35'),
                ('6.jpg', 'c5849770-6114-4571-b2f8-5f0b92818c35'),
                ('7.jpg', 'c5849770-6114-4571-b2f8-5f0b92818c35'),
                ('1.jpg', 'e963083f-20af-4dfa-a532-d34b1243148a'),
                ('2.jpg', 'e963083f-20af-4dfa-a532-d34b1243148a'),
                ('5.jpg', 'e963083f-20af-4dfa-a532-d34b1243148a'),
                ('6.jpg', 'e963083f-20af-4dfa-a532-d34b1243148a'),
                ('7.jpg', 'e963083f-20af-4dfa-a532-d34b1243148a'),
                ('8.jpg', 'e963083f-20af-4dfa-a532-d34b1243148a'),
                ('9.jpg', 'e963083f-20af-4dfa-a532-d34b1243148a'),
                ('10.jpg', 'e963083f-20af-4dfa-a532-d34b1243148a'),
                ('11.jpg', 'e963083f-20af-4dfa-a532-d34b1243148a'),
                ('12.jpg', 'e963083f-20af-4dfa-a532-d34b1243148a'),
                ('13.jpg', 'e963083f-20af-4dfa-a532-d34b1243148a'),
                ('14.jpg', 'e963083f-20af-4dfa-a532-d34b1243148a'),
                ('15.jpg', 'e963083f-20af-4dfa-a532-d34b1243148a'),
                ('2.jpg', 'c374d4d7-1739-4ce1-bb16-8125d66d6a93'),
                ('4.jpg', 'c374d4d7-1739-4ce1-bb16-8125d66d6a93'),
                ('6.jpg', 'c374d4d7-1739-4ce1-bb16-8125d66d6a93'),
                ('7.jpg', 'c374d4d7-1739-4ce1-bb16-8125d66d6a93'),
                ('8.jpg', 'c374d4d7-1739-4ce1-bb16-8125d66d6a93'),
                ('9.jpg', 'c374d4d7-1739-4ce1-bb16-8125d66d6a93'),
                ('10.jpg', 'c374d4d7-1739-4ce1-bb16-8125d66d6a93'),
                ('11.jpg', 'c374d4d7-1739-4ce1-bb16-8125d66d6a93'),
                ('12.jpg', 'c374d4d7-1739-4ce1-bb16-8125d66d6a93'),
                ('13.jpg', 'c374d4d7-1739-4ce1-bb16-8125d66d6a93'),
                ('14.jpg', 'c374d4d7-1739-4ce1-bb16-8125d66d6a93'),
                ('15.jpg', 'c374d4d7-1739-4ce1-bb16-8125d66d6a93'),
                ('1.jpg', 'f8604130-96ff-4ec4-80ea-fa26d5013633'),
                ('2.jpg', 'f8604130-96ff-4ec4-80ea-fa26d5013633'),
                ('3.jpg', 'f8604130-96ff-4ec4-80ea-fa26d5013633'),
                ('4.jpg', 'f8604130-96ff-4ec4-80ea-fa26d5013633'),
                ('5.jpg', 'f8604130-96ff-4ec4-80ea-fa26d5013633'),
                ('6.jpg', 'f8604130-96ff-4ec4-80ea-fa26d5013633'),
                ('1.jpg', 'ed9f447d-bd8d-489f-9c36-9c1f0c867bb8'),
                ('2.jpg', 'ed9f447d-bd8d-489f-9c36-9c1f0c867bb8'),
                ('3.jpg', 'ed9f447d-bd8d-489f-9c36-9c1f0c867bb8'),
                ('4.jpg', 'ed9f447d-bd8d-489f-9c36-9c1f0c867bb8'),
                ('5.jpg', 'ed9f447d-bd8d-489f-9c36-9c1f0c867bb8'),
                ('6.jpg', 'ed9f447d-bd8d-489f-9c36-9c1f0c867bb8'),
                ('7.jpg', 'ed9f447d-bd8d-489f-9c36-9c1f0c867bb8'),
                ('1.jpg', 'c8db8253-8f34-4e42-9f62-a5ea38afb731'),
                ('2.jpg', 'c8db8253-8f34-4e42-9f62-a5ea38afb731'),
                ('3.jpg', 'c8db8253-8f34-4e42-9f62-a5ea38afb731'),
                ('4.jpg', 'c8db8253-8f34-4e42-9f62-a5ea38afb731'),
                ('5.jpg', 'c8db8253-8f34-4e42-9f62-a5ea38afb731'),
                ('6.jpg', 'c8db8253-8f34-4e42-9f62-a5ea38afb731'),
                ('7.jpg', 'c8db8253-8f34-4e42-9f62-a5ea38afb731'),
                ('8.jpg', 'c8db8253-8f34-4e42-9f62-a5ea38afb731'),
                ('9.jpg', 'c8db8253-8f34-4e42-9f62-a5ea38afb731'),
                ('1.jpg', '08bde1e5-8fb8-4f7f-9779-2b98257e002d'),
                ('2.jpg', '08bde1e5-8fb8-4f7f-9779-2b98257e002d'),
                ('3.jpg', '08bde1e5-8fb8-4f7f-9779-2b98257e002d'),
                ('4.jpg', '08bde1e5-8fb8-4f7f-9779-2b98257e002d'),
                ('5.jpg', '08bde1e5-8fb8-4f7f-9779-2b98257e002d'),
                ('1.jpg', 'a63acf02-4726-46a1-aa1a-ff413d1e61b1'),
                ('2.jpg', 'a63acf02-4726-46a1-aa1a-ff413d1e61b1'),
                ('3.jpg', 'a63acf02-4726-46a1-aa1a-ff413d1e61b1'),
                ('4.jpg', 'a63acf02-4726-46a1-aa1a-ff413d1e61b1'),
                ('1.jpg', '5877aed5-d7a3-4c96-af09-ee227b7667fe'),
                ('2.jpg', '5877aed5-d7a3-4c96-af09-ee227b7667fe'),
                ('1.jpg', '820f493f-ae1a-43c5-b5bd-6d8d024e83f5'),
                ('2.jpg', '820f493f-ae1a-43c5-b5bd-6d8d024e83f5')
                ;
            """)
        addVersion(0.6, 'insert all the images')
    