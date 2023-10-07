import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadTaskComponent } from './read-task/read-task.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'read-task' },
  { path: 'read-task', component: ReadTaskComponent },
  { path: 'create-task', component: CreateTaskComponent },
  { path: 'update-task/:id', component: UpdateTaskComponent },
  { path: 'delete-task/:id', component: DeleteTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
