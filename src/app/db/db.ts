// db.ts
import Dexie, { Table } from 'dexie';

export interface UsersList {
  id?: number;
  title: string;
}

export interface Team {
  id?: number;
  playerOne: User;
  playerTwo:User;
  name?:string;
  logoUrl?:string;
  wins: number;
  loses:number;
  puntosFavor:number;
  puntosContra:number;
  partidosJugados: number;
  eliminado?:boolean;
}
export interface User {
  id?: number;
  usersListId: number;
  name: string;
  firstName:string;
  assist?: any;
  role?: any;
  acompaniante?:any;
  photo?:string;
  kinito?:any;
  pw?:any
}

export class AppDB extends Dexie {
  users!: Table<User, number>;
  teams!:Table<Team, number>;
  usersList!: Table<UsersList, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      usersList: '++id',
      users: '++id, usersListId',
      teams: '++id'
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    const usersListId = await db.usersList.add({
      title: 'UsersList',
    });
    await db.users.bulkAdd([
      {
        usersListId,
        name: 'Mario',
        firstName: 'Díaz',
        role: 'admin',
        pw: 'kinitoMaster',
        photo: 'assets/fotos/mario.png'
      },
      {
        usersListId,
        name: 'Miguel',
        firstName: 'Arenal',
        role: 'user',
        photo: 'assets/fotos/migui.jpeg'
      },
      {
        usersListId,
        name: 'Dani',
        firstName: 'Estrada',
        role: 'user',
        photo: 'assets/fotos/dani.png'
      },
      {
        usersListId,
        name: 'Aroa',
        firstName: 'Cayón',
        role: 'user',
        photo: 'assets/fotos/aroa.png'
      },
      {
        usersListId,
        name: 'Benja',
        firstName: 'Fernandez',
        role: 'user',
        photo: 'assets/fotos/benja.png'
      },
      {
        usersListId,
        name: 'Erik',
        firstName: 'Velazquez',
        role: 'user',
        photo: 'assets/fotos/erik.png'
      },
      {
        usersListId,
        name: 'David',
        firstName: 'Rumoroso',
        role: 'user',
        photo: 'assets/fotos/fiti.png'
      },
      {
        usersListId,
        name: 'Manu',
        firstName: 'Fernandez',
        role: 'user',
        photo: 'assets/fotos/manu.png'
      },
      {
        usersListId,
        name: 'Mar',
        firstName: 'García',
        role: 'user',
        photo: 'assets/fotos/mar.png'
      },
      {
        usersListId,
        name: 'Maria',
        firstName: 'Herrero',
        role: 'user',
        photo: 'assets/fotos/maria.png'
      },
      {
        usersListId,
        name: 'Javier',
        firstName: 'Maza',
        role: 'user',
        photo: 'assets/fotos/maza.png'
      },
      // {
      //   usersListId,
      //   name: 'Pablo',
      //   firstName: 'Rodriguez',
      //   role: 'user',
      //   photo: 'assets/fotos/rodri.png'
      // },
      {
        usersListId,
        name: 'Tomás',
        firstName: 'Inglés',
        role: 'user',
        photo: 'assets/fotos/tommy.png'
      },
      // {
      //   usersListId,
      //   name: 'Javier',
      //   firstName: 'Fernandez',
      //   role: 'user',
      //   photo: 'assets/fotos/javi.png'
      // },
    ]);

    await db.teams.bulkAdd([]);
  }
}

export const db = new AppDB();
