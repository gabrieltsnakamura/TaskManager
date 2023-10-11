import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Task } from '../models/task';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  private readonly apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getUserTasks(): Observable<Task[]> {
    const url = `${this.apiUrl}/user_tasks`;
    return this.http.get<Task[]>(url).pipe(
      map(tasks => {
        return tasks.map(task => {
          task.status = task.status ? true : false;
          return task;
        });
      }),
      catchError(error => {
        console.error('Error fetching user tasks:', error);
        throw error;
      })
    );
  }

  getUserTask(id: number): Observable<Task> {
    const url = `${this.apiUrl}/user_tasks/${id}`;
    return this.http.get<Task>(url).pipe(
      map(task => {
        task.status = task.status ? true : false;
        return task;
      }),
      catchError(error => {
        console.error(`Error fetching user task with id ${id}:`, error);
        throw error;
      })
    );
  }

  createUserTask(userTask: Task): Observable<Task> {
    const url = `${this.apiUrl}/user_tasks`;
    return this.http.post<any>(url, userTask).pipe(
      tap(response => {
        console.log(`Created user task with id ${JSON.stringify(response)}}`);
      }),
      catchError(error => {
        console.error('Error creating user task:', error);
        throw error;
      })
    );
  }

  updateUserTask(userTask: Task): Observable<Task> {
    const url = `${this.apiUrl}/user_tasks/${userTask.id}`;
    return this.http.put<Task>(url, userTask).pipe(
      tap(updatedUserTask => {
        console.log(`Updated user task with id ${updatedUserTask.id}`);
      }),
      catchError(error => {
        console.error(`Error updating user task with id ${userTask.id}:`, error);
        throw error;
      })
    );
  }

  deleteUserTask(id: number): Observable<Task> {
    const url = `${this.apiUrl}/user_tasks/${id}`;
    return this.http.delete<Task>(url).pipe(
      tap(deletedUserTask => {
        console.log(`Deleted user task with id ${deletedUserTask.id}`);
      }),
      catchError(error => {
        console.error(`Error deleting user task with id ${id}:`, error);
        throw error;
      })
    );
  }
}