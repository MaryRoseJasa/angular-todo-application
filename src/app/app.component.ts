import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { provideAnimations } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { TodoComponent } from './components/todo/todo.component';


interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  editing?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    RouterOutlet, 
    CommonModule, 
    MatCardModule,
    HttpClientModule, 
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-todo-jsonplaceholder';
  showSuccess: boolean = false;
  todos: Todo[] = [];
  newTodoTitle = '';

    constructor(private http: HttpClient){}
    
    ngOnInit() {
      this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .subscribe(data => this.todos = data);
    }

    addTodo() {
      const newTodo = {
      userId: 1,
      title: this.newTodoTitle,
      completed: false
    };

    this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', newTodo)
    .subscribe({
      next: (created) => {
        this.todos.unshift(created);
        this.newTodoTitle = '';
        this.showSuccess = true;
      },
      error: (err) => console.error('API Error:', err)
    });
}

    enableEdit(todo: any): void {
    todo.editing = true;
    }
    
    updateTodo(todo: Todo): void {
  todo.editing = false;
  this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo)
    .subscribe((updated) => {
      console.log('Updated:', updated);
    });
}

   deleteTodo(id: number): void {
  this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== id);
    });
}

    toggleComplete(todo: { completed: boolean }) {
    todo.completed = !todo.completed;

    this.todos = [...this.todos];
  }
    get activeTodos() {
    return this.todos.filter(todo => !todo.completed);
  }

  get completedTodos() {
    return this.todos.filter(todo => todo.completed);
  }
removeAllCompleted(): void {
  this.todos = this.todos.filter(todo => !todo.completed);
}

}


// Since AppComponent is standalone, you don't need an NgModule to bootstrap it.
// Remove the @NgModule code and directly bootstrap the standalone component in main.ts.


