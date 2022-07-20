import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, TaskPelis } from '../interface/task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private api = 'https://api-python-jwt.azurewebsites.net/api/Gettoken';
  private apiPelis = 'https://try2asd.azurewebsites.net';
  constructor(private http:HttpClient) { }

  createTask(task: Task) {
    const path = this.api;
    return this.http.post(path, task);
  }

  getAllTasks() {
    const path = `${this.apiPelis}/api/peliculas`;
    return this.http.get<TaskPelis[]>(path);
  }

  deleteTask(id: number) {
    const path = `${this.apiPelis}/api/peliculas/${id}`;
    return this.http.delete(path);
  }

  getTask(id: number) {
    const path = `${this.apiPelis}/api/peliculas/${id}`;
    return this.http.get<TaskPelis>(path);
  }

  createTaskFormPelis(task: TaskPelis) {
    const path = `${this.apiPelis}/api/peliculas`;
    return this.http.post(path, task);
  }

  updateTask(task: TaskPelis) {
    const path = `${this.apiPelis}/api/peliculas/${task.ID}`;
    return this.http.put<TaskPelis>(path, task);
  }
}
