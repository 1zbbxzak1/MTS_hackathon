import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeDetails, EmployeeHierarchy, SearchResult, Unit, UnitHierarchy} from '../models/models';
import {environment} from '../../../environments/environment';

@Injectable()
export class ServicesService {

    private baseUrl = environment.url; // Replace with your backend URL

    private http: HttpClient = inject(HttpClient);

    searchFilters(searchText: string): Observable<SearchResult[]> {
        return this.http.get<SearchResult[]>(`${this.baseUrl}/search/filters/${searchText}`);
    }

    searchByFilters(filters: { value: string, type: string }[]): Observable<UnitHierarchy[]> {
        return this.http.post<UnitHierarchy[]>(`${this.baseUrl}/search`, {filters});
    }

    getHierarchy(depth = 50): Observable<Unit[]> {
        return this.http.get<Unit[]>(`${this.baseUrl}/hierarchy?depth=${depth}`);
    }

    getEmployee(employeeId: number): Observable<EmployeeDetails> {
        return this.http.get<EmployeeDetails>(`${this.baseUrl}/employee/${employeeId}`);
    }

    getEmployeeBranch(employeeId: number): Observable<EmployeeHierarchy> {
        return this.http.get<EmployeeHierarchy>(`${this.baseUrl}/employee/${employeeId}/hierarchy`);
    }
}
