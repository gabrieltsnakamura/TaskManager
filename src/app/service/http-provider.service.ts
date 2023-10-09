import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserTask } from './user-task';

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getUserTasks(): Observable<UserTask[]> {
    const url = `${this.apiUrl}/user_tasks`;
    return this.http.get<UserTask[]>(url);
  }

  getUserTask(id: number): Observable<UserTask> {
    const url = `${this.apiUrl}/user_tasks/${id}`;
    return this.http.get<UserTask>(url);
  }

  createUserTask(userTask: UserTask): Observable<UserTask> {
    const url = `${this.apiUrl}/user_tasks`;
    return this.http.post<UserTask>(url, userTask);
  }

  updateUserTask(userTask: UserTask): Observable<UserTask> {
    const url = `${this.apiUrl}/user_tasks/${userTask.id}`;
    return this.http.put<UserTask>(url, userTask);
  }

  deleteUserTask(id: number): Observable<UserTask> {
    const url = `${this.apiUrl}/user_tasks/${id}`;
    return this.http.delete<UserTask>(url);
  }
}