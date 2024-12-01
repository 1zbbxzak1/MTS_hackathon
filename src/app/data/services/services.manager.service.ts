import {ErrorHandler, inject, Injectable} from '@angular/core';
import {catchError, NEVER, Observable, of} from 'rxjs';
import {EmployeeDetails, EmployeeHierarchy, SearchResult, Unit, UnitHierarchy} from '../models/models';
import {ServicesService} from './services.service';

@Injectable()
export class ServicesManagerService {

    private readonly _servicesService: ServicesService = inject(ServicesService);
    private readonly _errorHandler: ErrorHandler = inject(ErrorHandler);

    public searchFilters(searchText: string): Observable<SearchResult[]> {
        return this._servicesService.searchFilters(searchText).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return of([]);
            })
        );
    }

    public searchByFilters(filters: { value: string, type: string }[]): Observable<UnitHierarchy[]> {
        return this._servicesService.searchByFilters(filters).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return of([]);
            })
        );
    }

    public getHierarchy(depth: number = 50): Observable<Unit[]> {
        return this._servicesService.getHierarchy(depth).pipe(
            catchError(err => {
                this._errorHandler.handleError(err);
                return of([]);
            })
        );
    }

    public getEmployee(employeeId: number): Observable<EmployeeDetails> {
        return this._servicesService.getEmployee(employeeId).pipe(
            catchError(error => {
                this._errorHandler.handleError(error);
                return NEVER;
            })
        );
    }

    public getEmployeeBranch(employeeId: number): Observable<EmployeeHierarchy | null> {
        return this._servicesService.getEmployeeBranch(employeeId).pipe(
            catchError(error => {
                this._errorHandler.handleError(error);
                return of(null);
            })
        );
    }
}
