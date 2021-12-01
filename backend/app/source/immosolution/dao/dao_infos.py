from .db import get_db_cursor

def dao_get_angebot():
    """
        get the angebot text stored in the db
    """
    with get_db_cursor() as cursor:
        cursor.execute("SELECT angebot FROM infos")
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