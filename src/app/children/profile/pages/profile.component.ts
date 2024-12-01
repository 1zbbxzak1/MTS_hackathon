import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ServicesManagerService} from '../../../data/services/services.manager.service';
import {EmployeeDetails} from '../../../data/models/models';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-profile',
    standalone: false,

    templateUrl: './profile.component.html',
    styleUrl: './styles/profile.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
    public isClickedFirst: boolean = false;
    public isClickedSecond: boolean = false;
    public employeeDetails: EmployeeDetails | null = null;
    protected selectedEmployee: number = 0;

    constructor(
        private readonly _router: Router,
        private readonly _activatedRoute: ActivatedRoute,
        private readonly _destroyRef: DestroyRef,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _services: ServicesManagerService,
    ) {
    }

    public ngOnInit(): void {
        // Получение ID сотрудника из маршрута
        this._activatedRoute.params
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((params: Params): void => {
                this.selectedEmployee = Number(params['id']);
                this.fetchEmployeeData(this.selectedEmployee);
            });
    }

    protected navigateToProfile(id: number | undefined): void {
        this._router.navigate([`/profile/${id}`]);
    }

    // Метод загрузки данных сотрудника
    private fetchEmployeeData(employeeId: number): void {
        this._services.getEmployee(employeeId).subscribe({
            next: (data: EmployeeDetails): void => {
                this.employeeDetails = data;
                this._cdr.detectChanges();
            }
        });
    }
}
