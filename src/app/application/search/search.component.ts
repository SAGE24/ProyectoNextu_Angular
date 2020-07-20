import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsService } from 'src/app/transactions.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  constructor(
    private _Trans:TransactionsService,
    private _Route:Router,
    private _ActivRoute: ActivatedRoute
  ){
  }

  LstProduct:any[]=[]
  LstProductGen:any[]=[]
  LstShopping:any[]=[]

  ngOnInit(){
    this.FN_GetProduct()

    let ORequest:any={}
    ORequest.Count = this.LstShopping.length
    ORequest.LstShopping = []
    this._Trans.FN_SendData(ORequest) 
  }

  FN_GetProduct(){
    let OProduct:any;
    this._Trans.FN_Get('Productos').subscribe(OResponse => {
      this.LstProduct = []
      OResponse.forEach(Item=>{
        OProduct = Item.payload.doc.data();
        this.LstProduct.push({
          ID: Item.payload.doc.id,
          Name: OProduct.Name,
          Price: OProduct.Price, 
          Quantity: OProduct.Quantity,
          Image: OProduct.Image,
          Reserve: 1
        })
      })

      this.LstProduct = this.LstProduct.sort((n1,n2) => {
        if (n1.Name > n2.Name) {
            return 1
        }    
        if (n1.Name < n2.Name) {
            return -1
        }
        return 0
      })
      this.LstProductGen = this.LstProduct
    })
  }

  FN_Search(Event:any){
    let StrFact = Event.target.value
    if(StrFact == ''){
      this.LstProduct = this.LstProductGen
    }else{
      StrFact = StrFact.toUpperCase()
      this.LstProduct = this.LstProductGen
      this.LstProduct = this.LstProduct.filter(Item => {
        return Item.Name.toUpperCase().indexOf(StrFact) >= 0
      })
    }
  }

  FN_Register(Event:any){
    let StrID = Event.target.id
    this._Route.navigate(['./ProductComponent', StrID], {relativeTo: this._ActivRoute});
  }

  FN_Add(Event:any,Quantity:any){
    let ArrID:any[] = Event.target.id.split('_')
    let StrID = ArrID[1]
    let OProduct = this.LstProduct.filter(Item => Item.ID==StrID)[0]
    let IntQuantity = OProduct.Quantity - (OProduct.Reserve*1)

    this.LstProduct.filter(Item => Item.ID==StrID)[0].Quantity = IntQuantity

    if(this.LstShopping.filter(Item=>Item.StrID==StrID).length == 0){
      var OProd:any = {}
      OProd.StrID = StrID
      OProd.StrName = OProduct.Name
      OProd.DecPrice = OProduct.Price
      OProd.StrImage = OProduct.Image
      OProd.IntReserve = OProduct.Reserve*1
      OProd.IntQuantity = IntQuantity
      this.LstShopping.push(OProd)
    }else{
      let IntCount = this.LstShopping.filter(Item=>Item.StrID==StrID)[0].IntReserve
      this.LstShopping.filter(Item=>Item.StrID==StrID)[0].IntReserve = IntCount + (OProduct.Reserve*1)
    }
    
    let ORequest:any={}
    ORequest.Count = this.LstShopping.length
    ORequest.LstShopping = this.LstShopping
    this._Trans.FN_SendData(ORequest)    
  }

  FN_AddProd(Event:any){
    let ArrID = Event.target.id.split('_')
    let IntValue = Event.target.value
    let StrID = ArrID[1]
    
    this.LstProduct.filter(Item => Item.ID==StrID)[0].Reserve = IntValue
  }
}