import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/admin/navbar/navbar.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { FacebookComponent } from './components/admin/facebook/facebook.component';
import { ToastrModule } from 'ngx-toastr';
import { IndexComponent } from './components/frontend/index/index.component';
import { LoginComponent } from './components/admin/login/login.component';
import { FormsModule } from '@angular/forms';
import { SocialMediaCardsComponent } from './components/admin/social-media-cards/social-media-cards.component';
import { BerechtigungenVerwaltenComponent } from './components/admin/berechtigungen-verwalten/berechtigungen-verwalten.component';
import { LaufendeprojekteComponent } from './components/frontend/laufendeprojekte/laufendeprojekte.component';
import { FertigeprojekteComponent } from './components/frontend/fertigeprojekte/fertigeprojekte.component';
import { NavbarFrontendComponent } from './components/frontend/navbar-frontend/navbar-frontend.component';
import { ContactFormComponent } from './components/frontend/contact-form/contact-form.component';
import { FooterIndexComponent } from './components/frontend/footer-index/footer-index.component';
import { InstagramComponent } from './components/admin/instagram/instagram.component';
import { WebseiteVerwaltenComponent } from './components/admin/webseite-verwalten/webseite-verwalten.component';
import { AnkuendigungModalComponent } from './components/admin/ankuendigung-modal/ankuendigung-modal.component';
import { UeberUnsModalComponent } from './components/admin/ueber-uns-modal/ueber-uns-modal.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TeamModelComponent } from './components/admin/team-model/team-model.component';
import { ProjekteModelComponent } from './components/admin/projekte-model/projekte-model.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    FacebookComponent,
    IndexComponent,
    LoginComponent,
    SocialMediaCardsComponent,
    BerechtigungenVerwaltenComponent,
    LaufendeprojekteComponent,
    FertigeprojekteComponent,
    NavbarFrontendComponent,
    ContactFormComponent,
    FooterIndexComponent,
    InstagramComponent,
    WebseiteVerwaltenComponent,
    AnkuendigungModalComponent,
    UeberUnsModalComponent,
    TeamModelComponent,
    ProjekteModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
