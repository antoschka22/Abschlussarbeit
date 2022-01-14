from .db import get_db_cursor

def dao_remove_bild(bild_id):
    with get_db_cursor() as cursor:
        cursor.execute("""
                    DELETE FROM bilder WHERE id=%s returning *
                       """, [bild_id])
        return cursor.fetchone()

def dao_add_image(bild):
    with get_db_cursor() as cursor:
        cursor.execute("""
                    INSERT INTO bilder (projektbilder, projekt_id)
                    VALUES (%s, %s) returning *
                    """, [bild['projektbilder'], bild['projektname']])
        return cursor.fetchone()
        
def dao_update_image(bild):
    with get_db_cursor() as cursor:
        cursor.execute("""
                    UPDATE bilder SET projektbilder = %s WHERE id=%s returning *
                    """, [bild['projektbilder'], bild['id']])
        return cursor.fetchone()