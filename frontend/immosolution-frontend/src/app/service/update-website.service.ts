import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ankuendigung } from 'src/models/ankuendigungen';
import { Globals } from 'src/global/global';
import { gruendung } from 'src/models/gruendung';
import { privatkunden } from 'src/models/privatkunden';
import { projekte } from 'src/models/projekte';
import { team } from 'src/models/team';
import { ueberUns } from 'src/models/ueberUns';
import { projectImage } from 'src/models/projectImage';
import { project } from 'src/models/project';

@Injectable({
  providedIn: 'root'
})
export class UpdateWebsiteService {

  private baseUri: string = this.globals.backendUri

  constructor(private http: HttpClient,
              private globals: Globals) { }

  setAnkuendigung(ankuendigungSwitch: string){
    localStorage.setItem('switchAnkuendigung', ankuendigungSwitch);
  }

  getSwitchAnkuendigung(): string | null {
    return localStorage.getItem('switchAnkuendigung');
  }

  updateAnkuendigung(ankuendigung: ankuendigung){
    return this.http.put(this.baseUri + '/infos/ankuendigung', ankuendigung);
  }

  updateUeberUns(ueberUns: ueberUns){
    return this.http.put(this.baseUri + '/infos/ueberUns', ueberUns);
  }

  updatePrivatkunden(privatkunden: privatkunden){
    return this.http.put(this.baseUri + '/infos/privatkunden', privatkunden);
  }

  updateGruendung(gruendung: gruendung){
    return this.http.put(this.baseUri + '/infos/gruendung', gruendung);
  }

  updateTeam(team: team){
    return this.http.put(this.baseUri + '/infos/team', team);
  }

  updateProjektText(projektText: projekte){
    return this.http.put(this.baseUri + '/infos/projekte', projektText)
  }

  getDoneProjects(){
    return this.http.get(this.baseUri + '/doneProjects')
  }

  getUndoneProjects(){
    return this.http.get(this.baseUri + '/projectsInWork')
  }

  deleteProject(projectName: string){
    return this.http.delete(this.baseUri + '/projects/' + projectName)
  }

  updateProject(projectID: string, project: project){
    return this.http.put(this.baseUri + '/projects/' + projectID, project)
  }

  addProjectImage(image: projectImage){
    return this.http.post(this.baseUri + '/projects/images', image)
  }

  addProject(project: project){
    return this.http.post(this.baseUri + '/projects', project)
  }

  getLastFoldername(){
    return this.http.get(this.baseUri + '/projects/foldercount');
  }

  deleteImage(image_id: string){
    return this.http.delete(this.baseUri + '/projects/images/' + image_id)
  }


}
