from .db import get_db_cursor

def get_all_projects():
    with get_db_cursor() as cursor:
        cursor.execute("SELECT * FROM projekte")
        return cursor.fetchall()

def get_projects_undone_dao():
    with get_db_cursor() as cursor:
        cursor.execute("""
                    SELECT manuellerPost, herzeigeprojekte, projektname FROM projekte
                        WHERE herzeigeprojekte = 'f'
                       """)
        return cursor.fetchall()
    
def get_projects_done_dao():
    with get_db_cursor() as cursor:
        cursor.execute("""
                    SELECT manuellerPost, herzeigeprojekte, projektname FROM projekte
                        WHERE herzeigeprojekte = 't'
                       """)
        return cursor.fetchall()
    
def get_images_by_project_dao(projektid: str):
    with get_db_cursor() as cursor:
        cursor.execute("""
                    SELECT projektbilder FROM bilder WHERE projekt_id = %s
                       """, [projektid])
        return cursor.fetchall()

def dao_add_Project(project):
    with get_db_cursor() as cursor:
        cursor.execute("""
                    INSERT INTO projekte (projektname, herzeigeprojekte, kunden_kundenname, manuellerPost)
                    VALUES (%s, %s, %s, %s) returning *
                       """, [project['projektname'], project['herzeigeprojekte'], project['kunden_kundenname'], project['manuellerPost']])
        return cursor.fetchone()