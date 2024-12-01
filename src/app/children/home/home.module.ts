import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {SearchComponent} from './children/search/search.component';
import {SegmentControlComponent} from './components/segment-control/segment-control.component';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ViewListComponent} from './children/search/components/view-list/view-list.component';


@NgModule({
    declarations: [
        SegmentControlComponent,
        SearchComponent,
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
