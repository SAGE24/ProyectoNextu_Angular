import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './application/navbar/navbar.component';
import { SearchComponent } from './application/search/search.component';
import { ProductComponent } from './application/product/product.component';
import { BuyComponent } from './application/buy/buy.component';

import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { TransactionsService } from './transactions.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    SearchComponent,
    ProductComponent,
    BuyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AuthService,
    AuthGuardService,
    TransactionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
