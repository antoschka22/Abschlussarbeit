from .db import get_db_cursor

def get_user_by_credentials(credentials):
    """
        get the information of the user by credentials (username, password)
    """
    with get_db_cursor() as cursor:
        cursor.execute("select * from users where username = %s and password = %s", [credentials['username'], credentials['password']])
        return cursor.fetchone()