from .db import get_db_cursor

def get_projectnames_dao():
    with get_db_cursor() as cursor:
        cursor.execute("""
                    SELECT * FROM bilder 
                    WHERE herzeigeprojekte = 'f'
                       """)
        return cursor.fetchall()
    
def get_projects_done_dao():
    with get_db_cursor() as cursor:
        cursor.execute("""
                    SELECT projektbilder, projektname FROM bilder 
                    join projekte on projekt_id = projekte.id
                    WHERE herzeigeprojekte = 't'
                       """)
        return cursor.fetchall()
    
def get_images_by_project_dao(projektid: str):
    with get_db_cursor() as cursor:
        cursor.execute("""
                    SELECT projektbilder FROM bilder WHERE projektid = %s
                       """, [projektid])
        return cursor.fetchall()