from .db import get_db_cursor

def dao_get_angebot():
    with get_db_cursor() as cursor:
        cursor.execute("SELECT angebot, ueberuns_image FROM infos")
        return cursor.fetchone()

def dao_get_gruendung():
    with get_db_cursor() as cursor:
        cursor.execute("SELECT gruedung FROM infos")
        return cursor.fetchone()

def dao_get_referenzprojekte():
    with get_db_cursor() as cursor:
        cursor.execute("SELECT referenzprojekte, projekte_image FROM infos")
        return cursor.fetchone()

def dao_get_mitarbeiter():
    with get_db_cursor() as cursor:
        cursor.execute("SELECT mitarbeiter, team_image FROM infos")
        return cursor.fetchone()

def dao_get_privatkunden():
    with get_db_cursor() as cursor:
        cursor.execute("SELECT privatkunden FROM infos")
        return cursor.fetchone()
    
def dao_get_all_infos():
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
        cursor.execute("UPDATE infos SET referenzprojekte=%s, projekte_image=%s returning referenzprojekte, projekte_image", [info['referenzprojekte'], info['projekte_image']])
        return cursor.fetchone()
    
def dao_update_team(info):
    with get_db_cursor() as cursor:
        cursor.execute("UPDATE infos SET mitarbeiter=%s, team_image=%s returning mitarbeiter, team_image", [info['mitarbeiter'], info['team_image']])
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
        cursor.execute("""
                       UPDATE infos SET ankuendigung=%s, switchankuendigung=%s, ankuendigung_image=%s returning ankuendigung,switchankuendigung,ankuendigung_image
                       """, [ankeundigung['ankuendigung'], ankeundigung['switchAnkuendigung'], ankeundigung['ankuendigung_image']])
        return cursor.fetchone()