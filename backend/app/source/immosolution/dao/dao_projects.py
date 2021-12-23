from .db import get_db_cursor

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