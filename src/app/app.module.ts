import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule} from "@angular/material/button"
import { MatToolbarModule} from "@angular/material/toolbar"
import { MatCardModule} from "@angular/material/card"
import { LoginComponent } from './auth/login/login.component'
import { MatFormField, MatFormFieldModule} from "@angular/material/form-field"
import { MoviesViewComponent } from './movies/movies-view/movies-view.component';
import { MshowMoreComponent } from './movies/mshow-more/mshow-more.component';
import { TvsViewComponent } from './tvs/tvs-view/tvs-view.component';
import { TshowMoreComponent } from './tvs/tshow-more/tshow-more.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthInterceptor } from './auth/auth-interceptor';
import { AuthGuard } from './auth/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    MoviesViewComponent,
    MshowMoreComponent,
    TvsViewComponent,
    TshowMoreComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
