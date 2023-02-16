import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todolist } from 'src/app/models/todolist';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  todolist: Todolist = {
    title: '',
    description: '',
    deadLine: new Date(),
    finalizado: false
  }
  constructor(private router: Router, private service: TodoService){ }

  ngOnInit(): void {

  }

  create(): void {
    this.formataData();
    this.service.create(this.todolist).subscribe((resposta) => {
      this.service.message('task criada com sucesso!');
      this.router.navigate(['']);
    }, err => {
      this.service.message('Falha ao criar task!');
      this.router.navigate(['']);
    } )
    
  }

  cancel(): void {
    this.router.navigate([''])
  }

  formataData(): void {
    let data = new Date(this.todolist.deadLine)
    this.todolist.deadLine = `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`
  }

}
