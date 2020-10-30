import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesViewComponent } from './movies/movies-view/movies-view.component';
import { MshowMoreComponent } from './movies/mshow-more/mshow-more.component';
import { TvsViewComponent } from './tvs/tvs-view/tvs-view.component';
import { TshowMoreComponent } from './tvs/tshow-more/tshow-more.component';
import { HttpClientModule } from '@angular/common/http'
@NgModule({
  declarations: [
    AppComponent,
    MoviesViewComponent,
    MshowMoreComponent,
    TvsViewComponent,
    TshowMoreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
