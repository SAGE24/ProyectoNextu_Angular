import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { TransactionsService } from './../transactions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  BlnValidation:boolean=false
  StrRetURL:string='home'

  constructor(
    private _Router : Router,
    private _AuthService: AuthService,
    private _ActiveRoute : ActivatedRoute,
    private _Trans: TransactionsService
  ) { }

  ngOnInit(): void {
    this._AuthService.FN_UserLogOut()
    this._ActiveRoute.queryParamMap.subscribe(Params => {
      this.StrRetURL = Params.get('retUrl')
    })
  }

  FN_Login(Frm:any):void{
    this._Trans.FN_GetRegister('Usuarios',Frm.value.Mail).subscribe(OResponse => {
      var OUser:any = OResponse.payload.data();
      if(OUser.Password == Frm.value.Password){
        this._AuthService.FN_Login(Frm.value.Mail)
        this._Router.navigate(['/home'])
      }
    })    
  }
}
