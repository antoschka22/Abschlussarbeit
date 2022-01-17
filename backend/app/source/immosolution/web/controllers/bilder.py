from dao.dao_bilder import *
from core.security import *



def remove_bild(images_id, token_info):
    if is_admin(token_info):
        try:
            return dao_remove_bild(images_id), 202
        except:
            return "An error ocurred", 404
    else:
        return "Wrong credentials", 401

def add_image(bild, token_info):
    if is_admin(token_info):
        try:
            return dao_add_image(bild), 201
        except:
            return "An error ocurred", 404
    else:
        return "Wrong credentials", 401

def update_image(bild, token_info):
    if is_admin(token_info):
        try:
            return dao_update_image(bild), 200
        except:
            return "An error ocurred", 404
    else:
        return "Wrong credentials", 401