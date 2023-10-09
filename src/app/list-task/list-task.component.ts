import { Component, OnInit } from '@angular/core';
import { UserTask } from '../service/user-task';
import { HttpProviderService } from '../service/http-provider.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-read-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  declare userTasks: UserTask[];
   newTask: UserTask = {
    user_id: 1,
    description: '',
    date: '',
    status: 'Incomplete'
  };
  editing: boolean;
  newTaskModalCheck: boolean = false;

  constructor(private httpProviderService: HttpProviderService) {
    this.editing = false;
   }

  ngOnInit(): void {
    this.getUserTasks();
  }

  getUserTasks(): void {
    this.httpProviderService.getUserTasks()
      .subscribe(userTasks => {
        this.userTasks = userTasks;
        console.log(this.userTasks);
      });
  }

  deleteTask(userTask: UserTask): void {
    if (userTask.id) {
    this.httpProviderService.deleteUserTask(userTask.id)
      .subscribe(() => this.getUserTasks());
    } else {
      throw new Error('UserTask id is undefined');
    }
  }

  updateTask(userTask: UserTask, event: Event): void {
    console.log(event)
    if (event.type === 'change') {
      const isChecked = (event.target as HTMLInputElement).checked;
      userTask.status = isChecked ? 'Completed' : 'Pending';
    }
    userTask.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.httpProviderService.updateUserTask(userTask)
      .subscribe(() => this.getUserTasks());
  }

  openNewTaskModal() {
    const modal = document.getElementById('newTaskModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
  
  addNewTask() {
    const newTask = {
      user_id: 1,
      description: this.newTask.description,
      date: this.newTask.date,
      status: 'Incomplete'
    };
    this.httpProviderService.createUserTask(newTask)
      .subscribe(() => {
        this.userTasks.push(newTask);
        this.closeNewTaskModal();
      });
  }
  
  closeNewTaskModal() {
    const modal = document.getElementById('newTaskModal');
    if (modal) {
      modal.style.display = 'none';
      this.newTask = {
        description: '',
        date: '',
        user_id: 1,
        status: 'Incomplete'
      };
    }
  }
}