import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'startsida',
    templateUrl: './startsida.component.html',
    styleUrls: ['./startsida.component.css']
})
export class StartsidaComponent {

    constructor(private router: Router) { }

    goToPage(pageName: string): void {
        this.router.navigate([`${pageName}`]);
    }
}
