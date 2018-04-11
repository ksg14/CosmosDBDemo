import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  sessions;

  constructor(private tableService: TableService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.getSessionData ();
  //   var d = new Date();
  //         let curSession = {
  //           'Timestamp' : d.toString(),
  //           'Name' : 'ksg'
  //         };
  //   this.addSession (curSession);
  }

  getSessionData (): void {
    this.tableService.getAllSessionData()
        .subscribe(sessions => {
          this.sessions = sessions;

          console.log (this.sessions);
        });
  }

  addSession (session): void {
    this.tableService.addSession(session)
        .subscribe(res => {
          console.log (res);
          this.getSessionData ();
        });
  }

  route (path): void {
    this.router.navigateByUrl (path);
  }

  logout (): void {
    this.loginService.logout ();
  }
}
