import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConsult } from './interfaces';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    unsub = new Subscription();
    baseUrl = 'http://localhost:3000';
    consultUrl = `${this.baseUrl}/consult/`;
    cModel: IConsult = {
        id: undefined,
        firstName: '',
        lastName: '',
        startDate: '',
        lojBonus: 0,
        workedHours: 0
    };

    constructor(private http: HttpClient) {
    }

    /**
     * Get all Consults
     */
    getAllConsults() {
        const url = `${this.consultUrl}`;

        return this.http.get<IConsult[]>(url);
    }

    /**
     * Get consult by id
     */
    getConsult(id: number) {
        const url = `${this.consultUrl}${id}`;

        this.http.get<IConsult>(url).pipe((resp) => {
            console.log(resp);
            return resp;
        });
    }

    /**
     * Add/Create new consult
     */
    addConsult(consult: IConsult) {
        const url = `${this.consultUrl}`;

        this.cModel = {...this.cModel, ...consult};

        return this.http.post<IConsult>(url, this.cModel).pipe(a => {
            console.log(`addConsult ${a}`);
            return a;
        });
    }

    /**
     * Update consult information
     */
    updateConsult(data: IConsult) {
        this.cModel = {...this.cModel, ...data};

        return this.http
            .put<IConsult>(this.consultUrl + `${this.cModel.id}`, this.cModel)
            .pipe((val) => {
                console.log('Update call successful, response');
                return val;
            });
    }

    /**
     * remove consult from db
     */
    removeConsult(id: number) {
        const url = `${this.consultUrl}/${id}`;

        return this.http.delete(url).pipe((r) => {
            console.log(`DELETE id: ${id}`);
            return r;
        });
    }

    ngOnDestroy(): void {
        if (!this.unsub.closed) {
            console.log('Closing subs');

            this.unsub.unsubscribe();
        }
    }
}
