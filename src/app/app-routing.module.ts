import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditNoteComponent } from './pages/add-edit-note/add-edit-note.component';
import { AuthorComponent } from './pages/author/author.component';
import { NotesComponent } from './pages/notes/notes.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'notes',
    component: NotesComponent,
  },
  {
    path: 'add',
    component: AddEditNoteComponent,
  },
  {
    path: 'edit/:id',
    component: AddEditNoteComponent,
  },
  {
    path: 'author',
    component: AuthorComponent,
  },
  {
    path: '',
    redirectTo: '/notes',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
