from core.security import *
from dao.dao_user import *

def get_username_by_name(username: str):
    try:
        return get_username_by_name_dao(username)
    except:
        return "An error has ocurred"
    
def update_user_access_token(username: str, token: str):
    try:
        return dao_update_user_access_token(username, token)
    except: 
        return "An error has ocurred"