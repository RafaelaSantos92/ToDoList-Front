import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todolist } from 'src/app/models/todolist';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrls: ['./finalizados.component.css']
})
export class FinalizadosComponent implements OnInit {

  listFinished: Todolist[] = [];

  constructor(private service: TodoService, private router: Router){}

  ngOnInit(): void {
    this.findAll();
    
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
        resposta.forEach((todolist) => {
          if(todolist.finalizado) {
            this.listFinished.push(todolist);
          } 
        })
    }) 
  }

  voltar(): void{
    this.router.navigate([''])
  }
}
