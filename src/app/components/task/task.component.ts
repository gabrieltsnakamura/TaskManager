import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { HttpProviderService } from 'src/app/services/http-provider.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  editing: boolean;
  declare userTasks: Task[];
  newTask: Task = {
    description: '',
    date: '',
    user_id: 1,
    status: false
  };
  showForm: boolean;

  constructor(private httpProviderService: HttpProviderService) {
    this.showForm = false;
    this.editing = false;
  }

  ngOnInit(): void {
    this.getUserTasks();
  }

  async getUserTasks() {
    this.userTasks = await this.httpProviderService.getUserTasks().toPromise();
  }

  async deleteTask(task: Task) {
    if (!task.id) {
      throw new Error('UserTask id is undefined');
    }
    await this.httpProviderService.deleteUserTask(task.id).toPromise();
    await this.getUserTasks();
  }

  async updateTask(task: Task, event: Event) {
    if (event.type === 'change') {
      const isChecked = (event.target as HTMLInputElement).checked;
      task.status = isChecked ? true : false;
    }
    task.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    await this.httpProviderService.updateUserTask(task).toPromise();
    await this.getUserTasks();
  }

  async addNewTask() {
    this.newTask.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    await this.httpProviderService.createUserTask(this.newTask).toPromise();
    this.hideNewTaskForm();
    await this.getUserTasks();
  }
  
  showNewTaskForm() {
    this.showForm = true;
  }

  hideNewTaskForm() {
    this.showForm = false;
  }

}
