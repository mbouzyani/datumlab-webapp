import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import * as $ from 'jquery'


@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  connexion(){
    let user = $("#userName_connex").val();
    let pwd = $("#pwd_connex").val();

    if(user == "MKI_Datum" && pwd == "Mki@20**!"){
      localStorage.setItem('token-teamMI','9-QCsjE1Xg:^GZaX>#}@,~JTpRyG~[MFZ.ji:j..^|l3[6Fg8Hw{)3S4{##>2%]D');
      this._router.navigate(['/dashboard']);
        setTimeout(() => {
          localStorage.removeItem('token-teamMI')
          this._router.navigate(['']);
        }, 20*60*1000);
    }else{

    }

  }

}
