from dao.dao_projects import *
from core.security import *

def get_projects_undone():
    try:
        projekt = get_projects_undone_dao()
        for projektname in projekt:
            projektname['projektbilder'] = get_images_by_project_dao(projektname['projektname'])
        return projekt, 200
    except:
        return "An error ocurred while fetching the projects", 404

def get_projects_done():
    try:
        projekt = get_projects_done_dao()
        for projektname in projekt:
            projektname['projektbilder'] = get_images_by_project_dao(projektname['projektname'])
        return projekt, 200
    except:
        return "An error ocurred while fetching the projects", 404
    
def add_project(project, token_info):
    if is_admin(token_info):
        all_projects = get_all_projects()
        for projectName in all_projects:
           if projectName['projektname'] == project['projektname']:
               return "Projektname already exists"
        else:
            return dao_add_Project(project), 201
    else:
        return "Wrong credentials", 401

def remove_project(projektname, token_info):
    if is_admin(token_info):
        try:
            return dao_remove_project(projektname), 202
        except:
            return "An error ocurred", 404
    else:
        return "Wrong credentials", 401
    
def update_project(project, projektname, token_info):
    if is_admin(token_info):
        try:
            return dao_update_project(project, projektname), 200
        except:
            return "An error ocurred", 404
    else:
        return "Wrong credentials", 401
    
def get_foldercount():
    try:
        return dao_get_foldercount(), 200
    except:
        return "An error ocurred", 404