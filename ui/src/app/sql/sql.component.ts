import { Component, OnInit, Input } from '@angular/core';
import { SqlService } from '../sql.service';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.css']
})
export class SqlComponent implements OnInit {

  @Input() inventory;
  @Input() tmp_product = {
    "ProductID" : "",
    "ProductName" : "",
    "Quantity" : 0,
    "Price" : 0
  };
  addFlag = 0;

  constructor(private sqlService: SqlService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.sqlService.getInventory ().subscribe (inv => {
      this.inventory = inv;
      console.log (inv);
    });
  }

  update (product): void {
    this.sqlService.updateProduct(product)
        .subscribe(res => {
          console.log (res);

          this.sqlService.getInventory ().subscribe (inv => {
            this.inventory = inv;
            console.log (inv);
          });
        });
    
  }

  delete (product): void {
    this.sqlService.deleteProduct(product.ProductID)
        .subscribe(res => {
          console.log (res);

          this.sqlService.getInventory ().subscribe (inv => {
            this.inventory = inv;
            console.log (inv);
          });
        });
  }

  displayAddForm (): void {
    this.addFlag = 1;
  }

  addProduct (): void {
    console.log (this.tmp_product);
    this.sqlService.addProduct(this.tmp_product)
        .subscribe(res => {
          console.log (res);

          this.tmp_product = {
            "ProductID" : "",
            "ProductName" : "",
            "Quantity" : 0,
            "Price" : 0
          };
          this.addFlag = 0;

          this.sqlService.getInventory ().subscribe (inv => {
            this.inventory = inv;
            // console.log (inv);
          });
        });

  }

  route (path): void {
    this.router.navigateByUrl (path);
  }

  logout (): void {
    this.loginService.logout ();
  }
}
