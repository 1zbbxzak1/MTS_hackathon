import {ChangeDetectorRef, Component, DestroyRef, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {EmployeeHierarchy, Unit} from '../../../../data/models/models';
import {ServicesManagerService} from '../../../../data/services/services.manager.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-hierarchy-employee',
    standalone: false,

    templateUrl: './hierarchy-employee.component.html',
    styleUrl: './styles/hierarchy-employee.component.css'
})
export class HierarchyEmployeeComponent implements OnInit {
    treeNodes: EmployeeHierarchy[] | null = null;
    expandedNodes = new Set<number>();
    @Input()
    id: number = 0;

    @ViewChild('treeContainer', {static: true}) treeContainer!: ElementRef;

    constructor(
        private services: ServicesManagerService,
        private cdr: ChangeDetectorRef,
        private destroyRef: DestroyRef,
    ) {
    }

    ngOnInit(): void {
        this.loadHierarchyEmployee(this.id);
    }

    // Преобразуем объект в массив
    loadHierarchyEmployee(id: number): void {
        this.services.getEmployeeBranch(id).pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((tree: EmployeeHierarchy | null): void => {
            // Преобразуем объект в массив, если это необходимо
            if (tree) {
                this.treeNodes = Array.isArray(tree) ? tree : [tree];
            }

            console.log(this.treeNodes);

            this.cdr.detectChanges();
        });
    }

    addExpandState(nodes: Unit[]): void {
        nodes.forEach(node => {
            if (node) {
                if (node.children && node.children.length > 0) {
                    this.addExpandState(node.children);
                }
            }
        });
    }
}
