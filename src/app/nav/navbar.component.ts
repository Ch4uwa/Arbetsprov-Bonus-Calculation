import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavBarComponent {
    constructor(private router: Router) { }

    goToPage(pageName: string): void {
        this.router.navigate([`${pageName}`]);
    }
}
