import {ChangeDetectorRef, Component, DestroyRef, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Unit} from '../../../../data/models/models';
import {ServicesManagerService} from '../../../../data/services/services.manager.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';

@Component({
    selector: 'app-hierarchy',
    standalone: false,

    templateUrl: './hierarchy.component.html',
    styleUrls: ['./styles/hierarchy.component.css']
})
export class HierarchyComponent implements OnInit {
    treeNodes: Unit[] = [];
    scale = 1; // Начальный масштаб
    isDragging = false;
    startX = 0;
    startY = 0;
    translateX = 0;
    translateY = 0;
    expandedNodes = new Set<number>();

    @ViewChild('treeContainer', {static: true}) treeContainer!: ElementRef;

    constructor(
        private services: ServicesManagerService,
        private cdr: ChangeDetectorRef,
        private destroyRef: DestroyRef,
        private _router: Router,
    ) {
    }

    ngOnInit(): void {
        this.loadHierarchy(50);

        this.translateX = 0;
        this.translateY = 0;
        this.updateTransform();
    }

    loadHierarchy(depth: number = 50): void {
        // console.log(`loadHierarchy called with id: ${id}, depth: ${depth}`);

        this.services.getHierarchy(depth).pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((tree: Unit[]) => {
            this.treeNodes = tree;

            console.log(this.treeNodes);

            this.cdr.detectChanges();
        });
    }


    findNode(nodes: Unit[], id: number): Unit | null {
        for (const node of nodes) {
            if (node.id === id) {
                return node;
            } else if (node.children && node.children.length > 0) {
                const found = this.findNode(node.children, id);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    }


    toggleExpand(id: number): void {
        if (!this.expandedNodes.has(id)) {
            this.expandedNodes.add(id);

            // Найти узел по id и загрузить детей, если они не загружены
            const node = this.findNode(this.treeNodes, id);
            this.loadHierarchy(50);

        } else {
            this.expandedNodes.delete(id);
        }

        console.log(id);
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

    @HostListener('wheel', ['$event'])
    onWheel(event: WheelEvent): void {
        event.preventDefault();
        const delta = event.deltaY > 0 ? -0.1 : 0.1;
        this.scale = Math.min(Math.max(this.scale + delta, 0.2), 5); // Расширенный диапазон масштаба
        this.updateTransform();
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent): void {
        if (event.button === 0 || event.button === 1) { // Левая кнопка или колесико
            this.isDragging = true;
            this.startX = event.clientX - this.translateX;
            this.startY = event.clientY - this.translateY;
            document.body.style.cursor = 'grabbing'; // Меняем курсор
        }
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent): void {
        if (this.isDragging) {
            this.translateX = event.clientX - this.startX;
            this.translateY = event.clientY - this.startY;
            this.updateTransform();
        }
    }

    @HostListener('mouseup')
    @HostListener('mouseleave')
    onMouseUp(): void {
        this.isDragging = false;
        document.body.style.cursor = 'grab'; // Возвращаем курсор
    }

    @HostListener('window:resize', ['$event'])
    onResize(): void {
        this.updateTransform();
    }

    updateTransform(): void {
        const tree = this.treeContainer.nativeElement;
        tree.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
    }

    navigateToProfile(id: number): void {
        this._router.navigate(['profile/', id])
    }
}
