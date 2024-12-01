import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-segment-control',
    standalone: false,

    templateUrl: './segment-control.component.html',
    styleUrl: './styles/segment-control.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentControlComponent {
    protected statesSegmentControl: Record<string, boolean> = {
        isSearchClicked: true,
        isHierarchyClicked: false,
    };

    constructor(
        private readonly _router: Router,
        private readonly _destroyRef: DestroyRef,
        private readonly _cdr: ChangeDetectorRef,
    ) {
        this.initStatesSidebar();
        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            takeUntilDestroyed(this._destroyRef)
        )
            .subscribe((): void => {
                this.initStatesSidebar();
            });
    }

    private initStatesSidebar(): void {
        const url: string = this._router.url;
        this.resetStates(this.statesSegmentControl);
        if (url.includes('home/search')) {
            this.statesSegmentControl['isSearchClicked'] = true;
        } else if (url.includes('home/hierarchy')) {
            this.statesSegmentControl['isHierarchyClicked'] = true;
        }
    }

    private resetStates(state: Record<string, boolean>): void {
        for (const key in state) {
            if (Object.prototype.hasOwnProperty.call(state, key)) {
                state[key] = false;
            }
        }
    }

    // protected onSearch(): void {
    //     this.isSearchActive = true;
    //     this.isHierarchyActive = false;
    //
    //     this._cdr.detectChanges();
    //
    //     this._router.navigate(['/home/search']);
    // }
    //
    // protected onHierarchy(): void {
    //     this.isSearchActive = false;
    //     this.isHierarchyActive = true;
    //
    //     this._cdr.detectChanges();
    //
    //     this._router.navigate(['/home/hierarchy']);
    // }
}
