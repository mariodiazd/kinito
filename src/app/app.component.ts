
import { Component, VERSION } from '@angular/core';
import { User, UsersList, db } from './db/db';
import { liveQuery } from 'dexie';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router, RouterOutlet } from '@angular/router';
import { routeFadeAnimation, EnterExitRight} from './animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[routeFadeAnimation, EnterExitRight]
})


export class AppComponent {

  prepareRoute(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState'];
   }



}

