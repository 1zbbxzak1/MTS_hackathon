import {Routes} from '@angular/router';
import {SearchComponent} from './children/home/children/search/search.component';
import {HierarchyComponent} from './children/home/children/hierarchy/hierarchy.component';
import {ProfileComponent} from './children/profile/pages/profile.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home/search', pathMatch: 'full'
    },
    {
        path: 'home/search',
        component: SearchComponent,
    },
    {
        path: 'home/hierarchy',
        component: HierarchyComponent,
    },
    {
        path: 'profile/:id',
        component: ProfileComponent,
        data: {renderMode: 'dynamic'}
    },
];
