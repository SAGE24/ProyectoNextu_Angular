import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { TransactionsService } from 'src/app/transactions.service';

@Component({
  selector: 'product-search',
  templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {
  StrID:string
  OProduct:any = {
    Name:'',
    Price:0,
    Quantity:0,
    Image:''
  }

  constructor(
    private _Route:Router,
    private _Trans: TransactionsService,
    private _ActivRoute: ActivatedRoute
  ) {
    
  }
  ngOnInit(){
    this._ActivRoute.params.subscribe(params => {
      this.StrID = params.id
      this.FN_Register(this.StrID)
    })
  }

  FN_Register(StrID:string){
    this._Trans.FN_GetRegister('Productos',StrID).subscribe(OResponse => {
      this.OProduct = OResponse.payload.data()
    })
  }

  FN_Return(){
    this._Route.navigate(['../../'], {relativeTo: this._ActivRoute})
  }
}