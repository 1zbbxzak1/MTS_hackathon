import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-view-list',
    standalone: false,

    templateUrl: './view-list.component.html',
    styleUrl: './styles/view-list.component.css'
})
export class ViewListComponent {
    @Input()
    public data: any[] = [];

    constructor(
        private router: Router,
    ) {
    }

    // Рекурсивная функция для получения пути
    // Функция для создания пути с изображениями стрелок
    protected getPath(item: any): { name: string, separator: boolean }[] {
        return item.path.map((segment: string, index: number, array: string[]) => {
            return {
                name: segment,
                separator: index < array.length - 1
            };
        });
    }

    protected navigateToProfile(id: number): void {
        this.router.navigate([`/profile/${id}`]);
    }
}
