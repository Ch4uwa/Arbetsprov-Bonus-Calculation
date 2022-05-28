import { DatePipe } from '@angular/common';

export interface IConsult {
    id?: number;
    firstName: string;
    lastName: string;
    startDate: string;
    workedHours?: number;
    lojBonus?: number
}

export class ConsultData {
    private datePipe: DatePipe = new DatePipe('en_US');

    private _id: number | undefined;
    private _firstName: string | undefined;
    private _lastName: string | undefined;
    private _startDate: string | number | Date;
    private _workedHours: number | undefined;
    private _lojBonus = 0;
    private _bonusFactor = 0;

    public get lojBonus() {
        return this._lojBonus;
    }
    public set lojBonus(value) {
        this._lojBonus = value;
    }

    constructor() {
        this._startDate = this.datePipe.transform(Date.now(), 'yyyy-MM-dd') ?? '';
    }


    public get id(): number | undefined {
        return this._id;
    }
    public set id(value: number | undefined) {
        this._id = value;
    }

    public get firstName(): string | undefined {
        return this._firstName;
    }

    public set firstName(value: string | undefined) {
        this._firstName = value;
    }

    public get lastName(): string | undefined {
        return this._lastName;
    }

    public set lastName(value: string | undefined) {
        this._lastName = value;
    }

    public get startDate(): string | number | Date {
        return this._startDate;
    }

    public set startDate(value: string | number | Date) {
        this._startDate = this.datePipe.transform(value, 'yyyy/MM/dd') ?? '';
    }

    public get workedHours() {
        return this._workedHours;
    }

    public set workedHours(value) {
        this._workedHours = value;
    }

    /**
     * Get bonus factor calculated from years as consult.
     * @returns bonusfactor
     */
    public bonusFactor() {
        const dateToday = Date.now();
        const sDate = new Date(this.startDate).getTime();

        const daysDiff: number = Math.floor((dateToday - sDate) / (1000 * 60 * 60 * 24)); // days as consult
        const years: number = Math.floor(daysDiff / 365);

        // if 5 or more years always use 1.5
        const bonusfactor = years < 5 ? (1 + (years * 0.1)) : 1.5;
        console.log(bonusfactor);
        this._bonusFactor = bonusfactor;
        return this._bonusFactor;
    }
}
