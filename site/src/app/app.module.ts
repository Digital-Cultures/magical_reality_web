import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
//import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
// import { WalksComponent } from './walks';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';

import { DragScrollModule } from 'ngx-drag-scroll';;
import { WalkportalComponent } from './walkportal/walkportal.component'

//material stuff
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        DragScrollModule,
        BrowserAnimationsModule,
        MatButtonModule, 
        FormsModule,
        MatCheckboxModule,
        AgmCoreModule.forRoot({
            apiKey: 'XXX'
        }),
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        // WalksComponent,
        LoginComponent,
        RegisterComponent,
        WalkportalComponent    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
       // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }