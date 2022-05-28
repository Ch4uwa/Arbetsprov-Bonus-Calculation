import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ConsultData, IConsult } from '../shared/interfaces';

@Component({
    selector: 'bonus',
    templateUrl: './bonus.component.html',
    styleUrls: ['./bonus.component.css'],
})
export class BonusComponent implements OnInit, OnDestroy {
    private _unSubscribe: Subject<void> = new Subject();

    consultForm!: FormGroup;
    // consults: IConsult[] = [];
    consultsData!: IConsult[];

    @ViewChild('box') nettoRes!: ElementRef;

    constructor(
        private router: Router,
        private formbuilder: FormBuilder,
        private api: ApiService
    ) {
        this.consultForm = this.formbuilder.group({
            id: [null],
            firstName: [''],
            lastName: [''],
            startDate: [null],
            workedHours: [0],
            netResult: [0],
        });
    }

    ngOnInit(): void {
        this.api.getAllConsults().pipe(takeUntil(this._unSubscribe)).subscribe(res => {
            this.consultsData = res;
            console.log(this.consultsData);
        });
    }

    ngOnDestroy(): void {
        this._unSubscribe.next();
        this._unSubscribe.complete();
    }

    onEdit(idx: number) {
        // this.consultForm.patchValue({
        //     id: this.consults[idx].id
        // });
    }

    //EDIT hours in modal
    addHours() {
        const wh = this.consultForm.get('workedHours')?.value;

        // this.consults.filter(c => c.id === this.consultForm.get('id')?.value).map(c => {
        //     c.workedHours = wh;

        //     this.api.updateConsult(c);
        // });

    }

    /** räkna ut dagar sedan anställning (Bonus faktor column) */
    /**
     *
     * @param startDate
     * @returns lojFactor: number
     */
    calculateLojFactor(startDate: string): number {
        const dateStart = new Date(startDate).getTime(); // hämtar startdatum för konsult
        const dateToday = Date.now(); // hämtar dagens datum i millisec
        const daysDiff = Math.abs(dateToday - dateStart); // räknar ut skillnaden i dagar mellan anställningsdatum och dagensdatum
        const days = Math.floor(daysDiff / 86400000); // Calculate days (1000*3600*24=86400000)

        // IF-statement checks lojalty factor from starting date
        if (days < 365)
            // > Anställd mindre än 1 år
            return 1;
        else if (days >= 365 && days < 730)
            // Anställd 1 år
            return 1.1;
        else if (days >= 730 && days < 1095)
            // Anställd 2 år
            return 1.2;
        else if (days >= 1095 && days < 1460)
            // Anställd 3 år
            return 1.3;
        else if (days >= 1460 && days < 1825)
            // Anställd 4 år
            return 1.4;
        else return 1.5; // Anställd 5 år eller längre
    }

    // calculate bonus in percent (Bonus % column)
    calculateBonusPercent(data: {lojFactor:number, hours:number}, totalBonusHours=100) {
        return ((data.lojFactor * data.hours) / totalBonusHours).toFixed(3);
    }

    // calculate bonus in SEK (Bonus SEK column)
    // interpolation of bonusPott {{bonusPott}} in HTML
    calculateConsultantBonus(hours: number) {
        // this.bonusPott = Number(this.displayNetResult) * this.bonusPercentage; // calculates BonusPott
        // const KonsultBonusSEK = Math.round(
        //     ((this.lojFactor * hours) / this.totalBonusHours) * this.bonusPott
        // );
        // return KonsultBonusSEK;

    }
}
