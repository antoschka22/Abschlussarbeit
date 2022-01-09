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
    """
        pass the info and your token, if you are an admin the "Angebot" text will be changed
    """
    if is_admin(token_info):
        return dao_update_angebot(info), 200
    else:
        return "Wrong credentials", 401


def update_gruedung(info, token_info):
    """
        pass the info and your token, if you are an admin the "Gründung" text will be changed
    """
    if is_admin(token_info):
        return dao_update_gruedung(info), 200
    else:
        return "Wrong credentials", 401

def update_referenzprojekte(info, token_info):
    """
        pass the info and your token, if you are an admin the "Refernzprojekte" text will be changed
    """
    if is_admin(token_info):
        return dao_update_referenzprojekte(info), 200
    else:
        return "Wrong credentials", 401

def update_team(info, token_info):
    """
        pass the info and your token, if you are an admin the "Team" text will be changed
    """
    if is_admin(token_info):
        return dao_update_team(info), 200
    else:
        return "Wrong credentials", 401

def update_privatkunden(info, token_info):
    """
        pass the info and your token, if you are an admin the "Privatkunden" text will be changed
    """
    if is_admin(token_info):
        return dao_update_privatkunden(info), 200
    else:
        return "Wrong credentials", 401
    
def get_ankuendigungen():
    """
        get all the information about the "Ankündigung"
    """
    try:
        return dao_get_ankuendigungen(), 200
    except:
        return "An error ocurred", 404
    
def update_ankuendigung(ankuendigung, token_info):
    """
        update all the text "Ankündigung" and the activate/deactivate the Ankündigungen
    """
    if(is_admin(token_info)):
        try:
            return dao_update_ankuendigung(ankuendigung), 200
        except:
            return "An error ocurred", 404
    else:
        return "Wrong credentials", 401