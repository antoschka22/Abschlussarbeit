from dao.dao_projects import *

def get_projects_undone():
    try:
        projekt = get_projectnames_dao()
        projekt['projektbilder'] = get_images_by_project_dao(projekt['id']) 
        return projekt, 200
    except:
        return "An error ocurred while fetching the projects", 404

def get_projects_done():
    try:
        return get_projects_done_dao(), 200
    except:
        return "An error ocurred while fetching the projects", 404
    
    