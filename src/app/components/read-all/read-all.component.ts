import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todolist } from 'src/app/models/todolist';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {

  closed = 0;

  list: Todolist[] = []
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
          } else{
            this.list.push(todolist);
          }
        })
        this.closed = this.listFinished.length;
    }) 
  }

  finalizar(item: Todolist): void{
    item.finalizado = true;
    this.service.update(item).subscribe(() => {
      this.service.message('Task finalizada com Sucesso!');
      this.list = this.list.filter((todolist) => todolist.id !== item.id);  
      this.closed++;
    })
    console.log(item.finalizado)
  }

  delete(id: any): void{
    this.service.delete(id).subscribe((resposta) =>{
      if(resposta === null){
        this.service.message('Task Deletada com Sucesso!');
        this.list = this.list.filter(todolist => todolist.id !== id);
      }
    })
  }

  navegarParaFinalizados(){
    this.router.navigate(['finalizados'])
  }

 
}
