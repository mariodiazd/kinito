import { Component, OnInit } from '@angular/core';
import { Team, db } from '../db/db';
import { liveQuery } from 'dexie';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  teamsList$ = liveQuery(() => db.teams.toArray());
  teamsList: Team[] = [];
  primero!:Team;
  segundo!:Team;
  tercero!:Team;
  cuarto!:Team;
  quinto!:Team;
  sexto!:Team;
  ganadorTerceroVsSexto!:Team;
  ganadorCuartoVsQuinto!:Team;
  ganadorSemifinalDos!:Team;
  ganadorSemifinalUno!:Team;
  campeon!:Team;


  constructor() { }

  ngOnInit(): void {
    this.getTeams();
    console.log(this.teamsList);
  }

  parseTeams(){
    this.primero = this.teamsList[0];
    this.segundo = this.teamsList[1];
    this.tercero = this.teamsList[2];
    this.cuarto = this.teamsList[3];
    this.quinto = this.teamsList[4];
    this.sexto = this.teamsList[5];
  }

  setGanadorCuartoVsQuinto(team:Team, perdedor:Team){
    this.ganadorCuartoVsQuinto = team;
    perdedor.eliminado = true;
  }

  setGanadorTerceroVsSexto(ganador:Team, perdedor:Team){
    this.ganadorTerceroVsSexto = ganador;
    perdedor.eliminado = true;
  }

  setGanadorSemifinalUno(ganador:Team, perdedor:Team){
    this.ganadorSemifinalUno = ganador;
    perdedor.eliminado = true;
  }

  setGanadorSemifinalDos(ganador:Team, perdedor:Team){
    this.ganadorSemifinalDos = ganador;
    perdedor.eliminado = true;
  }

  setCampeon(ganador:Team, perdedor:Team){
    this.campeon = ganador;
    perdedor.eliminado = true;
  }

  getTeams() {
    this.teamsList$.subscribe((res) => {
      this.teamsList = res;
      this.teamsList = this.teamsList.sort((a, b)=> a.wins > b.wins ? -1 : 1).sort((a, b)=> a.puntosFavor > b.puntosFavor ? -1 : 1);
      this.parseTeams();
    });
  }

}
