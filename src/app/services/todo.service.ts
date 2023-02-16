import { validateVerticalPosition } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todolist } from '../models/todolist';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findAll(): Observable<Todolist[]> {
    return this.http.get<Todolist[]>(this.baseUrl);
  }

  findById(id: any): Observable<Todolist>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Todolist>(url);
  }

  update(todolist: Todolist): Observable<Todolist> {
    const url = `${this.baseUrl}/${todolist.id}`
    return this.http.put<Todolist>(url, todolist);
  }

  delete(id: any): Observable<void>{
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<void>(url);
  }

  create(todolist: Todolist): Observable<Todolist>{
    return this.http.post<Todolist>(this.baseUrl, todolist);
  }
  message(msg: String): void {
    this.snack.open(`${msg}`, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}