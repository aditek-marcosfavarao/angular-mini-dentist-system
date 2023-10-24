import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EditorComponent } from './modules/editor/editor.component';
import { LoginComponent } from './modules/login/login.component';
import { AvatarComponent } from './core/components/avatar/avatar.component';
import { ModalComponent } from './core/components/modal/modal.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { HeaderComponent } from './core/layouts/header/header.component';

import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { DefaultLayoutComponent } from './modules/default-layout/default-layout.component';
registerLocaleData(localePT);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EditorComponent,
    LoginComponent,
    AvatarComponent,
    ModalComponent,
    PageNotFoundComponent,
    HeaderComponent,
    DefaultLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-br' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
