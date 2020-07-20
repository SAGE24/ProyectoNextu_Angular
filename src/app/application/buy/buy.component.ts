import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/transactions.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-Buy',
  templateUrl: './buy.component.html'
})
export class BuyComponent implements OnInit {
    OData:Subscription
    LstShopping:any[]=[]
    DecTotal:number

    constructor(
        private _Route:Router,
        private _Trans: TransactionsService,
        private _ActivRoute: ActivatedRoute
    ){
        
    }
    ngOnInit(){
        this.LstShopping = JSON.parse(sessionStorage.getItem('LstBuy'))
        this.DecTotal = 0
        this.LstShopping.forEach(Item => {
            this.DecTotal += Item.DecPrice*Item.IntReserve
        })
    }

    FN_Save(){
        let ORequest:any={
            Quantity : this.LstShopping.length,
            Total : this.DecTotal
        }
        this._Trans.FN_Post('BuyHead',ORequest).then(OResponse => {
            this.FN_SaveDetail(OResponse.id)
        }).catch(OError => {
            console.log(OError)
        }).finally(() => {
            this._Route.navigate(['../'], {relativeTo: this._ActivRoute})
        })
    }
    FN_SaveDetail(StrID:string){
        this.LstShopping.forEach(Item =>{
            let ORequest:any={
                ID:StrID,
                Price:Item.DecPrice,
                ProductID:Item.StrID,
                ProductName:Item.StrName,
                Reserve:Item.IntReserve,
                Total:(Item.DecPrice*Item.IntReserve)
            }
            this._Trans.FN_Post('Buy',ORequest).then(OResponse=>{
                ORequest={}
                ORequest={
                    Quantity:Item.IntQuantity,
                    Image:Item.StrImage,
                    Name:Item.StrName,
                    Price:Item.DecPrice
                }
                this._Trans.FN_Put('Productos',Item.StrID,ORequest).then(()=>{})
            })
        })
    }
    FN_Cancel(){
        this._Route.navigate(['../'], {relativeTo: this._ActivRoute})
    }
}