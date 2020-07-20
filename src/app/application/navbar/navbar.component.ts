import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransactionsService } from './../../transactions.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavBarComponent implements OnInit {
    BlnVisible:boolean=false
    IntCount:number=0
    OData:Subscription
    LstShopping:any[]=[]
    
    constructor(
        private _Router:Router,
        private _Trans:TransactionsService,
        private _ActivRoute: ActivatedRoute
    ){
        this.OData = this._Trans.FN_ReceiveData().subscribe(OResponse =>{
            this.IntCount = OResponse.Count
            if(OResponse.Count>0){
                this.LstShopping = OResponse.LstShopping
                this.BlnVisible = true
                sessionStorage.setItem('LstBuy',JSON.stringify(this.LstShopping))
            }else{
                this.BlnVisible = false
            }
        })
    }

    ngOnInit(){
        
    }

    FN_Close():void{
        this._Router.navigate(['/login'])
    }

    FN_Buy(){
        this._Router.navigate(['./BuyComponent'], {relativeTo: this._ActivRoute});
    }
}