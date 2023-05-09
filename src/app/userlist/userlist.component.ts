import { Component, Input, OnInit } from '@angular/core';
import { Team, UsersList, db } from '../db/db';
import { liveQuery } from 'dexie';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  teamsList: Team[] = [];
  usersList$ = liveQuery(() => db.usersList.toArray());
  teamsList$ = liveQuery(() => db.teams.toArray());
  teamLocal:Team  | any = -1;
  teamVisitante:Team | any = -1;
  puntosLocal:number = 0;
  puntosVisitante:number = 0;

  constructor(private modalService: NgbModal, private toastr: ToastrService, public router:Router) {}


  ngOnInit(): void {
      this.getTeams();
  }
  getTeams() {
    this.teamsList$.subscribe((res) => {
      this.teamsList = res;
      this.teamsList = this.teamsList.sort((a, b)=> a.wins > b.wins ? -1 : 1).sort((a, b)=> a.puntosFavor > b.puntosFavor ? -1 : 1)
    });
  }

  getGanador(teamLocalPoints:number, teamVisitantePoints:number){
    if (teamLocalPoints > teamVisitantePoints)
    {
      return 1;
    } else{
      return -1;
    }
  }

  resetValues(){
    this.teamLocal = -1;
    this.teamVisitante = -1;
    this.puntosLocal = 0;
    this.puntosVisitante = 0;
  }

  addMatch(){
    const resultLocal = this.getGanador(this.puntosLocal, this.puntosVisitante);
    const resultVisitante = this.getGanador(this.puntosVisitante, this.puntosLocal)
    if (this.teamLocal?.id != undefined)
    {
      db.teams.update(this.teamLocal.id, {
        "partidosJugados": this.teamLocal.partidosJugados +1,
        "wins": resultLocal > 0 ? this.teamLocal.wins +1 : this.teamLocal.wins,
        "loses": resultLocal < 0 ? this.teamLocal.loses +1 : this.teamLocal.loses,
        "puntosFavor": this.teamLocal.puntosFavor + this.puntosLocal,
        "puntosContra": this.teamLocal.puntosContra + this.puntosVisitante
      })
    } else{
      console.log("NO SE ACTUALIZO")
    }

    if (this.teamVisitante?.id != undefined)
    {
      db.teams.update(this.teamVisitante.id, {
        "partidosJugados": this.teamVisitante.partidosJugados + 1,
        "wins": resultVisitante > 0 ? this.teamVisitante.wins +1 : this.teamVisitante.wins,
        "loses": resultVisitante < 0 ? this.teamVisitante.loses +1 : this.teamVisitante.loses,
        "puntosFavor": this.teamVisitante.puntosFavor + this.puntosVisitante,
        "puntosContra": this.teamVisitante.puntosContra + this.puntosLocal
      })
    } else{
      console.log("NO SE ACTUALIZO")
    }

    this.getTeams();
    location.reload();

  }

}
