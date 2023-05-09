import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Team, User, UsersList, db } from '../db/db';
import Dexie, { liveQuery } from 'dexie';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kinito',
  templateUrl: './kinito.component.html',
  styleUrls: ['./kinito.component.scss'],
})
export class KinitoComponent implements OnInit {
  background: any;
  isAuth = false;
  userIdSelected = 0;
  teams: Team[] = [];
  participantesIn: User[] = [];
  nombre: string = '';
  apellido: string = '';
  codigo: string = '';
  showComenzar: boolean = false;
  showSortear: boolean = true;
  showTeams: boolean = false;
  showParticipantes: boolean = true;
  asistir: any;
  kinito: any;
  showSecondStep = false;
  users: any;
  userSelected: any;
  @ViewChild('modalPareja', { static: true }) modalPareja!: ElementRef;
  selectedPareja:any;
  newUser: User = {
    usersListId: 0,
    name: '',
    firstName: '',
  };

  teamNames:any[] =[
    {
      name:'Aniquiladores',
      logoUrl:'assets/logos/aniquiladores.png',

    },
    {
      name:'Saiyans',
      logoUrl:'assets/logos/saiyans.png',

    },
    {
      name:'Porcinos',
      logoUrl:'assets/logos/porcinos.png',

    },
    {
      name:'Ultimate Móstoles',
      logoUrl:'assets/logos/mostoles.png',

    },
    {
      name:'PIO',
      logoUrl:'assets/logos/pio.png',

    },
    {
      name:'Jijantes',
      logoUrl:'assets/logos/jijantes.png',

    },
    {
      name:'Los troncos',
      logoUrl:'assets/logos/troncos.png',

    },
    {
      name:'Rayo de Barcelona',
      logoUrl:'assets/logos/rayo.png',

    },
    {
      name:'Xbuyer TEAM',
      logoUrl:'assets/logos/xbuyer.png',

    },
    {
      name:'1K',
      logoUrl:'assets/logos/1k.png',

    },
    {
      name:'Kuni Kinitosport',
      logoUrl:'assets/logos/kuni.png',

    },
  ];

  userList: UsersList[] = [
    {
      id: 1,
      title: 'Home',
    },
  ];
  teamsList: Team[] = [];
  usersList$ = liveQuery(() => db.usersList.toArray());
  teamsList$ = liveQuery(() => db.teams.toArray());
  users$ = liveQuery(() => this.getUsers());

  constructor(private modalService: NgbModal, private toastr: ToastrService, public router:Router) {}

  ngOnInit() {
    this.getListUsers();
    this.getTeams();
  }

  getTeams() {
    this.teamsList$.subscribe((res) => {
      this.teamsList = res;
      console.log(this.teamsList);
    });
  }

  getListUsers() {
    this.usersList$.subscribe((res) => {
      this.userList = res;
      console.log(this.userList);
      this.getUsers();
    });
  }

  async getUsers() {
    const users = await db.users
      .where({
        usersListId: this.userList[0].id,
      })
      .toArray();
    this.users = users;
    console.log(this.users);
  }

  resetDb() {
    db.delete()
      .then(() => {
        console.log('DB deleted successfully');
      })
      .finally(() => {
        console.log('reinitializing DB');
        db.close();
      });
    db.open();
  }

  getRandomUsers(arr: User[], n: number) {
    let result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError('getRandom: more elements taken than available');
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  removeItemOnce(array: User[], value: User) {
    const index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
      return array;
    } else {
      return array;
    }
  }

  sortearPareja(): Team {
    const randomUsers: User[] = this.getRandomUsers(this.users, 2);
    const newTeam: Team = {
      playerOne: randomUsers[0],
      playerTwo: randomUsers[1],
      puntosContra:0,
      puntosFavor:0,
      partidosJugados:0,
      wins:0,
      loses:0,
      name: '',
      logoUrl:''
    };
    this.users = this.removeItemOnce(this.users, randomUsers[0]);
    this.users = this.removeItemOnce(this.users, randomUsers[1]);

    return newTeam;
  }

  openModal(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {});
  }

  mostrarParticipantes(){
    this.showParticipantes = true;
    this.showTeams = false;
  }

  mostrarEquipos(){
    this.showParticipantes = false;
    this.showTeams = true;
  }

  sorteo() {
    {
      if (this.users.length % 2) {
        alert('el numero de participantes debe ser par');
      } else {
        const team: Team = this.sortearPareja();
        this.teams.push(team);
        if (this.users.length === 0) {
          this.showComenzar = true;
          this.showSortear = false;
          this.showTeams = true;
          this.showParticipantes = false;
        }
          this.selectedPareja = team;
          console.log(this.selectedPareja);
          this.modalService.open(this.modalPareja, { windowClass: 'dark-modal' });
      }
    }
  }

  async addUser() {
    if (this.userList[0].id) {
      await db.users
        .add({
          name: this.newUser.name,
          firstName: this.newUser.firstName,
          usersListId: this.userList[0]?.id,
          photo: 'assets/fotos/user.jpeg'
        })
        .then((data) => {
          this.getUsers();
          this.toastr.success('Usuario creado correctamente');
          this.modalService.dismissAll();
        });
    }
  }

  async saveTeam(team:Team) {{
      await db.teams
        .add({
          name: team.name,
          playerOne: team.playerOne,
          playerTwo: team.playerTwo,
          puntosContra:0,
          puntosFavor:0,
          partidosJugados:0,
          wins:0,
          loses:0,

        })
        .then((data) => {
          this.getTeams();
          this.toastr.success('Equipo creado correctamente');
          this.modalService.dismissAll();
        });
    }
  }

  goToClasificacion(){
    this.router.navigateByUrl('clasi');
  }

  async deleteUser(userId:number){
    if (userId)
    await db.users
    .delete(userId)
    .then((data) => {
      this.getUsers();
      this.toastr.success('Usuario borrado correctamente');
      this.modalService.dismissAll();
    });
  }

}
