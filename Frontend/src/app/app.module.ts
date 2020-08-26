import { navBarAdminComponent } from './navbaradmin.component';
import { navBarAccountComponent } from './navbaraccount.component';
import { navBarMainComponent } from './navbarmain.component';
import { navBarLoginComponent } from './navbarlogin.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { SessionexpiredComponent } from './sessionexpired/sessionexpired.component';
import { SetnewtransactionpasswordComponent } from './setnewtransactionpassword/setnewtransactionpassword.component';
import { OffersComponent } from './offers/offers.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SessionexpiredComponent,
    SetnewtransactionpasswordComponent,
    navBarMainComponent,
    navBarLoginComponent,
    navBarAccountComponent,
    navBarAdminComponent,
    OffersComponent
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
