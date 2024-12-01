export interface Unit {
    id: number;
    name: string;
    unit_type: string;
    employees: EmployeesUnit[],
    parent?: number;
    children?: Unit[];
    children_count?: number;
}

export interface EmployeesUnit {
    id: number;
    name: string;
    phone: string;
    city: string;
    address: string;
    email: string | null; // The email can be null
    position: Position;
}

export interface Employee {
    id: number;
    name: string;
    phone: string;
    city: string;
    address: string;
    email: string | null; // The email can be null
    position: Position;
    unit: Unit;
}

export interface Position {
    id: number;
    name: string;
    employee_role: string;
}

export interface EmployeeDetails {
    id: number;
    name: string;
    phone: string;
    city: string;
    address: string;
    email: string | null; // The email can be null
    position: Position;
    unit: Unit;
    functional_manager?: Manager;
    direct_managers?: Manager[];
}

export interface Manager {
    id: number;
    name: string;
    position: string;
}

export interface EmployeeHierarchy {
    id: number;
    name: string;
    unit_type: string,
    managers: Manager[],
    children?: EmployeeHierarchy[],
}

export interface SearchResult {
    value: string;
    type: string;
}

export interface UnitHierarchy {
    path: string[];
    employees: Employee[];
}
