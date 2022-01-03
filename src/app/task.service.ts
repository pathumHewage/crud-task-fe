import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config.service';
import TaskModel from './models/taskModel';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import TaskListModel from './models/taskListModel';



@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfigService: ApiConfigService) { }

  getAllTaskLists()  {
    return this.apiConfigService.get('tasklists');
  }

  createTaskList(title: string){
    let data = {'title': title};
    return this.apiConfigService.post('tasklists',data);

  }

  getAllTasksForATaskList(taskListId: string) {
    return this.apiConfigService.get(`tasklists/${taskListId}/tasks`);
  }
  createTaskInsideTaskList(taskListId: string, title: string){
    return this.apiConfigService.post(`tasklists/${taskListId}/tasks`,{title});

  }

  deleteTaskList(taskListId: string){
    return this.apiConfigService.delete(`tasklists/${taskListId}`);
  }

  deleteAtaskInsideTaskList(taskListId: string, taskId: string){
    return this.apiConfigService.delete(`tasklists/${taskListId}/tasks/${taskId}`);
  }
  updateTaskStatus(taskListId: string, taskObject: TaskModel){
    let updateData = {'completed': !taskObject.completed};
    return this.apiConfigService.patch(`tasklists/${taskListId}/tasks/${taskObject._id}`,updateData)
  }

}
