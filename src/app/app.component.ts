import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: false,

    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    public title: string = 'MTS_hackathon';
}
