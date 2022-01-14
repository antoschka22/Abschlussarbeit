from dao.dao_bilder import *
from core.security import *



def remove_bild(bilder, token_info):
    if is_admin(token_info):
        for bild in bilder:
            try:
                dao_remove_bild(bild)
            except: 
                return "An error ocurred", 404
    else:
        return "Wrong credentials", 401