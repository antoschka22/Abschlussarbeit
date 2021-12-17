from dao.dao_user import *

def get_username_by_name(username: str):
    try:
        return get_username_by_name_dao(username)
    except:
        return "An error has ocurred"