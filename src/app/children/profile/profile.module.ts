import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ProfileComponent} from './pages/profile.component';
import {HomeModule} from '../home/home.module';
import { HierarchyEmployeeComponent } from './components/hierarchy-employee/hierarchy-employee.component';


@NgModule({
    declarations: [
        ProfileComponent,
        HierarchyEmployeeComponent,
    ],
    imports: [
        CommonModule,
        HomeModule,
        NgOptimizedImage
    ]
})
export class ProfileModule {
}
