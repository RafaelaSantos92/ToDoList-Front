import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todolist } from 'src/app/models/todolist';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  todolist: Todolist = {
    title: '',
    description: '',
    deadLine: new Date(),
    finalizado: false
  }
  constructor(private router: Router, private service: TodoService, private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.todolist.id = this.route.snapshot.paramMap.get("id")!;
    this.findById()
  }

  findById(): void {
    this.service.findById(this.todolist.id).subscribe((resposta) => {
      this.todolist = resposta;
    })
  }

  update(): void {
    this.service.update(this.todolist).subscribe((resposta) => {
      this.service.message('Informações atualizadas com sucesso!');
      this.router.navigate([''])
    }, err => {
      this.service.message('Falha ao atualizar!');
      this.router.navigate([''])
    })
  }

  cancel(): void {
    this.router.navigate([''])
  }

  formataData(): void {
    let data = new Date(this.todolist.deadLine)
    this.todolist.deadLine = `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`
  }
}

