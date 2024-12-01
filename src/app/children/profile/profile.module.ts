import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ProfileComponent} from './pages/profile.component';
import {HomeModule} from '../home/home.module';


@NgModule({
    declarations: [
        ProfileComponent,
    ],
    imports: [
        CommonModule,
        HomeModule,
        NgOptimizedImage
    ]
})
export class ProfileModule {
}
