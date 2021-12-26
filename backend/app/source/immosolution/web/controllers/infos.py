from dao.dao_infos import *
from core.security import *

def get_angebot():
    """
        get the description about the angebot of Immosolution
    """
    try:
        return dao_get_angebot(), 200
    except:
        return "An error ocurred while fetching the angebot text", 404
    
def get_gruendung():
    """
        get the description about the gruendung of Immosolution
    """
    try:
        return dao_get_gruendung(), 200
    except:
        return "An error ocurred while fetching the gruendung text", 404

def get_referenzprojekte():
    """
        get the description about the referenzprojekte of Immosolution
    """
    try: 
        return dao_get_referenzprojekte(), 200
    except:
        return "An error ocurred while fetching the referenzprojekte text", 404

def get_mitarbeiter():
    """
        get the description about the mitarbeiter of Immosolution
    """
    try:
        return dao_get_mitarbeiter(), 200
    except:
        return "An error ocurred while fetching the mitarbeiter text", 404
    
def get_privatkunden():
    """
        get the description about the privatkunden of Immosolution
    """
    try: 
        return dao_get_privatkunden(), 200
    except:
        return "An error ocurred while fetching the privatkunden text", 404
    
def get_all_infos():
    """
        get all the informations needed for the index
    """
    try:
        return dao_get_all_infos(), 200
    except:
        return "An error ocurred while fetching all the infos", 404
    
def update_angebot(info, token_info):
    if is_admin(token_info):
        return "true"
    else:
        return token_info