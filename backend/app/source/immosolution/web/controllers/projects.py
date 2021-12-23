from dao.dao_projects import *

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
    
    