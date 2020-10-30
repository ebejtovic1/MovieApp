import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesViewComponent } from 'src/app/movies/movies-view/movies-view.component';
import { TvsViewComponent } from 'src/app/tvs/tvs-view/tvs-view.component';
import { MshowMoreComponent} from 'src/app/movies/mshow-more/mshow-more.component';
import { TshowMoreComponent} from 'src/app/tvs/tshow-more/tshow-more.component';
const routes: Routes = [
  {
    path: 'Movies', component: MoviesViewComponent
  },
  {
    path: 'showMore/:movieId',
    component: MshowMoreComponent,
  },
  {
    path: 'showMoreTV/:tvId',
    component: TshowMoreComponent,
  },
  {
    path: '',
    component: TvsViewComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
