from .db import get_db_cursor

def dao_get_angebot():
    """
        get the angebot text stored in the db
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT angebot, ueberuns_image FROM infos")
        return cursor.fetchone()

def dao_get_gruendung():
    """
        get the gruendung text stored in the db
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT gruedung FROM infos")
        return cursor.fetchone()

def dao_get_referenzprojekte():
    """
        get the referenzprojekte text stored in the db
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT referenzprojekte FROM infos")
        return cursor.fetchone()

def dao_get_mitarbeiter():
    """
        get the mitarbeiter text stored in the db
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT mitarbeiter FROM infos")
        return cursor.fetchone()

def dao_get_privatkunden():
    """
        get the privatkunden text stored in the db
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT privatkunden FROM infos")
        return cursor.fetchone()
    
def dao_get_all_infos():
    """
        get all the data in the infos table
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT * FROM infos")
        return cursor.fetchone()
    
def dao_update_angebot(info):
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE infos SET angebot=%s, ueberuns_image=%s returning angebot, ueberuns_image", [info['UberUnsText'], info['UberUnsImage']])
        return cursor.fetchone()
    
def dao_update_gruedung(info):
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE infos SET gruedung=%s returning gruedung", [info['gruendungText']])
        return cursor.fetchone()
    
def dao_update_referenzprojekte(info):
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE infos SET referenzprojekte=%s returning referenzprojekte", [info['referenzprojekteText']])
        return cursor.fetchone()
    
def dao_update_team(info):
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE infos SET mitarbeiter=%s returning mitarbeiter", [info['teamText']])
        return cursor.fetchone()
    
def dao_update_privatkunden(info):
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE infos SET privatkunden=%s returning privatkunden", [info['privatkundenText']])
        return cursor.fetchone()
    
def dao_get_ankuendigungen():
    with get_db_cursor() as cursor:
        cursor.execute("SELECT switchankuendigung, ankuendigung, ankuendigung_image FROM infos")
        return cursor.fetchone()
    
def dao_update_ankuendigung(ankeundigung):
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE infos SET ankuendigung=%s, switchankuendigung=%s, ankuendigung_image=%s returning ankuendigung,switchankuendigung,ankuendigung_image", [ankeundigung['ankuendigung'], ankeundigung['switchAnkuendigung'], ankeundigung['ankuendigung_image']])
        return cursor.fetchone()