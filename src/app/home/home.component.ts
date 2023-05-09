import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { liveQuery } from 'dexie';
import { ToastrService } from 'ngx-toastr';
import { User, UsersList, db } from '../db/db';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  background: any;
  isAuth = false;
  userIdSelected = 0;
  nombre: string = '';
  apellido: string = '';
  password: string = '';
  codigo: string = '';
  asistir: any;
  kinito: any;
  showSecondStep = false;
  users: any;
  @ViewChild('audio') audio!: ElementRef;
  userSelected: any;
  newUser: User = {
    usersListId: 0,
    name: '',
    firstName: '',
  };
  date: any;
  now: any;
  targetDate: any = new Date(2023, 4, 13, 16);
  targetTime: any = this.targetDate.getTime();
  difference!: number;
  months: Array<string> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  userList: UsersList[] = [
    {
      id: 1,
      title: 'Home',
    },
  ];
  usersList$ = liveQuery(() => db.usersList.toArray());
  users$ = liveQuery(() => this.getUsers());
  admin:boolean = false;
  isMobile:boolean = false;
  currentTime: any = `${
    this.months[this.targetDate.getMonth()]
  } ${this.targetDate.getDate()}, ${this.targetDate.getFullYear()}`;

  @ViewChild('days', { static: true }) days!: ElementRef;
  @ViewChild('hours', { static: true }) hours!: ElementRef;
  @ViewChild('minutes', { static: true }) minutes!: ElementRef;
  @ViewChild('seconds', { static: true }) seconds!: ElementRef;
  @ViewChild('mdays', { static: true }) mdays!: ElementRef;
  @ViewChild('mhours', { static: true }) mhours!: ElementRef;
  @ViewChild('mminutes', { static: true }) mminutes!: ElementRef;
  @ViewChild('mseconds', { static: true }) mseconds!: ElementRef;
  @ViewChild('options') text!: ElementRef;
  @ViewChild('button') btn!: ElementRef;

  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private deviceDetector:DeviceDetectorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    if (this.activatedRoute.snapshot.params['admin'])
    {
      this.admin = true;
    }

  }

  ngAfterViewInit() {
    this.isMobile = this.checkIfMobile();
  }

  checkIfMobile(){
    return this.deviceDetector.isMobile();

  }

  comenzarFake(){
    this.audio.nativeElement.play();
      this.text.nativeElement.innerHTML = `autoplay: ${
        this.audio.nativeElement.autoplay ? 'on' : 'off'
      } loop: ${this.audio.nativeElement.loop} muted: ${
        this.audio.nativeElement.muted
      }`;

      this.btn.nativeElement.click();
      this.audio.nativeElement.play();
  }

  ngOnInit() {
    this.isMobile = this.checkIfMobile();
    console.log(this.isMobile);
    this.getListUsers();
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

  setUser(user: User) {
    this.userSelected = user;
    if (user.id) {
      this.userIdSelected = user.id;
    }
    if (user.assist) {
      this.asistir = user.assist;
      this.kinito = user.kinito;
    }
  }

  onSubmit() {
    let userSelected: any = {};
    let result = false;
    const userLogin = {
      nombre: this.nombre,
      apellido: this.apellido,
    };

    for (let user of this.users) {
      if (
        userLogin.nombre == user.name &&
        userLogin.apellido == user.firstName
      ) {
        result = true;
        userSelected = user;
        break;
      } else {
        result = false;
      }
    }
    if (result) {
      this.isAuth = true;

      this.showSecondStep = true;
      this.setUser(userSelected);
      this.toastr.success('Login con éxito');
    } else {
      this.toastr.error('No estás invitado');
    }
  }

  saveChanges() {
    console.log(this.asistir);
    db.users.update(this.userIdSelected, {
      assist: this.asistir,
      kinito: this.kinito,
    });

    this.toastr.success('Guardado con éxito');
  }

  goToParticipantes() {
    this.router.navigateByUrl('participantes');
  }

  loginAdmin() {
    this.users.forEach((user: User) => {
      if (
        user.name == this.nombre &&
        this.password == user.pw &&
        user.role == 'admin'
      ) {
        this.router.navigateByUrl('/admin');
        this.modalService.dismissAll();
      }
    });
  }

  recreateDB() {
    return db.delete().then(() => {
      db.open();
      this.toastr.success('Base de datos limpiada correctamente');
    });
  }
}
