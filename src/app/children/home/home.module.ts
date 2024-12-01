import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {SegmentControlComponent} from './components/segment-control/segment-control.component';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ViewListComponent} from './children/search/components/view-list/view-list.component';


@NgModule({
    declarations: [
        SegmentControlComponent,
        ViewListComponent,
    ],
    exports: [
        SegmentControlComponent
    ],
    imports: [
        CommonModule,
        RouterLink,
        NgOptimizedImage,
        FormsModule,
    ]
})
export class HomeModule {
}
