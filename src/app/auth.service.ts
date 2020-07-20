import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { TransactionsService } from './transactions.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BlnLoggedIn:boolean
  private StrUserName:string
  private StrKey:string

  constructor(
    private _Trans:TransactionsService
  ) { 
    this.BlnLoggedIn=false
  }

  FN_Login(StrUser:string){        
    this.BlnLoggedIn=true
    this.StrUserName=StrUser
    sessionStorage.setItem('KeyUser',StrUser)
    sessionStorage.setItem('KeySession','1')
  }

  Fn_UserLoggedIn():boolean{
    this.StrUserName = sessionStorage.getItem('KeyUser')
    this.StrKey = sessionStorage.getItem('KeySession')
    if (this.StrKey != undefined && this.StrKey == '1'){
      this.BlnLoggedIn = true
    }else {
      this.BlnLoggedIn = false
    }
    return this.BlnLoggedIn
  }

  FN_UserLogOut():void{
    this.BlnLoggedIn=false
    sessionStorage.removeItem('KeyUser');
    sessionStorage.removeItem('KeySession');
    sessionStorage.removeItem('LstBuy')
  }
}
