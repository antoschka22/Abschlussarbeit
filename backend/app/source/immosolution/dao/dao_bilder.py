from .db import get_db_cursor

def dao_remove_bild(bild_id){
    with get_db_cursor() as cursor:
        cursor.execute("""
                    DELETE FROM bilder WHERE id=%s returning id, projektbilder
                       """, [bild_id])
        return cursor.fetchone()
}