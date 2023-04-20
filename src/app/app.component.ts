import { Component, Input, Output } from '@angular/core';
import { Tarefa } from './tarefa';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TODOapp';

  arrayDeTarefas: Tarefa[] = [];
  apiURL : string;

  constructor(private http: HttpClient){
    this.apiURL = 'http://localhost:3000'; // Cloud Link no lugar do Local Host
    this.READ_Tarefas();
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe(
    resultado => { console.log(resultado); this.READ_Tarefas(); });

    
  }

  READ_Tarefas(){
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`).subscribe(resultado => this.arrayDeTarefas = resultado);
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    var indice = this.arrayDeTarefas.indexOf(tarefaAserModificada);
    var id = this.arrayDeTarefas[indice]._id;
    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`,
    tarefaAserModificada).subscribe(
    resultado => { console.log(resultado); this.READ_Tarefas(); });
  }

  DELETE_tarefa(RemoverEssaTarefa: Tarefa){
    var indice = this.arrayDeTarefas.indexOf(RemoverEssaTarefa);
    var id = this.arrayDeTarefas[indice]._id;
    this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`).subscribe(
    resultado => { console.log(resultado); this.READ_Tarefas(); });
  }

  
   
}
