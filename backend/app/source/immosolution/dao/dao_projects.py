from .db import get_db_cursor

def get_all_projects():
    with get_db_cursor() as cursor:
        cursor.execute("SELECT * FROM projekte")
        return cursor.fetchall()

def get_projects_undone_dao():
    with get_db_cursor() as cursor:
        cursor.execute("""
                    SELECT * FROM projekte
                        WHERE herzeigeprojekte = 'f'
                       """)
        return cursor.fetchall()
    
def get_projects_done_dao():
    with get_db_cursor() as cursor:
        cursor.execute("""
                    SELECT * FROM projekte
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
                    INSERT INTO projekte (projektname, herzeigeprojekte, manuellerpost)
                    VALUES (%s, %s, %s) returning *
                       """, [project['projektname'], project['herzeigeprojekte'], project['manuellerPost']])
        return cursor.fetchone()
    
def dao_remove_project(projektname: str):
    with get_db_cursor() as cursor:
        cursor.execute("""
                    DELETE FROM projekte WHERE projektname=%s returning *
                       """, [projektname])
        return cursor.fetchone()
    
def dao_update_project(project, projektname):
    with get_db_cursor() as cursor:
        cursor.execute("""
                    UPDATE projekte SET projektname = %s, herzeigeprojekte= %s WHERE projektname=%s returning *
                       """, [project['projektname'], project['herzeigeprojekte'], projektname])
        return cursor.fetchone()