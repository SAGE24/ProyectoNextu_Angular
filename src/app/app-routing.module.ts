import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AuthGuardService } from './auth-guard.service';

//Hijos
import { SearchComponent } from './application/search/search.component';
import { ProductComponent } from './application/product/product.component';
import { BuyComponent } from './application/buy/buy.component';

const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'home', component: HomeComponent, canActivate:[AuthGuardService],
    children:[
      { path:'', component: SearchComponent },
      { path:'SearchComponent', component:SearchComponent },
      { path:'ProductComponent/:id', component:ProductComponent },
      { path:'BuyComponent',component:BuyComponent }
    ]
  },
  { path:'**', redirectTo:'',pathMatch:'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
