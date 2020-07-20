import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    private http:HttpClient,
    private firestore: AngularFirestore
  ) {}

  FN_GetRegister(StrCollection:string,StrID:string) {
    return this.firestore.collection(StrCollection).doc(StrID).snapshotChanges()
  }

  FN_Get(StrCollection:string) {
    return this.firestore.collection(StrCollection).snapshotChanges()
  }

  FN_Post(StrCollection:string,ORequest:any){
    return this.firestore.collection(StrCollection).add(ORequest)
  }

  FN_Put(StrCollection:string,StrID:string,ORequest:any){
    return this.firestore.collection(StrCollection).doc(StrID).set(ORequest)
  }

  private SubData = new Subject<any>();
  
  FN_SendData(ORequest){
    this.SubData.next(ORequest)
  }
  FN_ReceiveData():Observable<any>{
    return this.SubData.asObservable()
  }
}
