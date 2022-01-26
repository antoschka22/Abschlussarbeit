import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(projects: any[], filter: Object): any {
    if (!projects || !filter) {
        return projects;
    }

    return projects.filter(project => project.projektname.indexOf(filter) !== -1);
  }

}
