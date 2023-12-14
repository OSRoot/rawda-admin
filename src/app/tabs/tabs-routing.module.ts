import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path:'users',
        loadChildren: () => import('../pages/users/users.module').then( m => m.UsersPageModule)
      },

      {
        path:"contacts",
        loadChildren: () => import('../pages/settings/settings.module').then( m => m.SettingsPageModule)
      },

      {
        path:"suggestions",
        loadChildren: () => import('../pages/suggestions/suggestions.module').then( m => m.SuggestionsPageModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
