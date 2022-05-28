import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { IConsult } from '../shared/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { taggedTemplate } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'konsult-dashboard',
    templateUrl: './konsult-dashboard.component.html',
    styleUrls: ['./konsult-dashboard.component.css'],
})
export class KonsultDashboardComponent implements OnInit, OnDestroy {
    private _unSubscribe: Subject<void> = new Subject();

    consults: IConsult[] = [];
    consultEdit!: IConsult;
    isShowAdd = true;

    constructor(private router: Router, private api: ApiService) {}

    ngOnInit(): void {
        this.getAllConsult();
    }

    ngOnDestroy(): void {
        this._unSubscribe.next();
        this._unSubscribe.complete();
    }

    getAllConsult() {
        this.api
            .getAllConsults()
            .pipe(takeUntil(this._unSubscribe))
            .subscribe((resp) => {
                if (resp) {
                    this.consults = resp;
                }
            });
    }

    /**
     * Add new cunsultant
     */
    addNewConsult(data: IConsult) {
        this.api
            .addConsult(data)
            .pipe(takeUntil(this._unSubscribe))
            .subscribe((s) => {
                this.consults.push(s);
                return s;
            });
    }

    /**
     * Delete consultant
     */
    removeConsult(id?: number) {
        if (id) {
            this.api
                .removeConsult(id)
                .pipe(takeUntil(this._unSubscribe))
                .subscribe(
                    () =>
                        (this.consults = this.consults.filter(
                            (c) => c.id !== id
                        ))
                );
        }
    }

    /**
     * Edit consultant
     */
    onEdit(consult: IConsult) {
        this.consultEdit = consult;
    }

    updateConsult(consult: IConsult) {
        this.api
            .updateConsult(consult)
            .pipe(takeUntil(this._unSubscribe))
            .subscribe((s) => {
                const idx = this.consults.findIndex(c => c.id === s.id);
                this.consults[idx] = consult;
                return s;
            });
    }
}
