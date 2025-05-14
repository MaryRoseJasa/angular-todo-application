import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  newTodoTitle = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void{
    this.todoService.getTodos().subscribe(data => this.todos = data.slice(0, 10));
  }

  addTodo() {
    const newTodo = {
      id: Date.now(),
      title: this.newTodoTitle,
      completed: false 
    };
    this.todos.unshift(newTodo);
    this.newTodoTitle = '';
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleComplete(todo: any) {
    todo.completed = !todo.completed;
  }
}
