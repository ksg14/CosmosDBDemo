import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TableService } from '../table.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() userName: string;
  @Input() password: string;

  constructor(private tableService: TableService,
              private loginService: LoginService) { }

  ngOnInit() {
  }

  login ():void {
    if (this.password == 'root') {
      
      var d = new Date();
      let curSession = {
        'Timestamp' : d.toString(),
        'Name' : this.userName
      };

      this.tableService.addSession(curSession)
        .subscribe(res => {
          console.log (res);

          console.log ('logged in');
          this.loginService.login ();
        });
    }
  }

  logout ():void {
    this.loginService.logout ();
  }

}
