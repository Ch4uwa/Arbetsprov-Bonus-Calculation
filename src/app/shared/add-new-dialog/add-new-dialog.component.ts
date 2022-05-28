import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IConsult } from '../interfaces';

@Component({
    selector: 'app-add-new-dialog',
    templateUrl: './add-new-dialog.component.html',
    styleUrls: ['./add-new-dialog.component.css'],
})
export class AddNewDialogComponent implements OnInit {
    @Input() showBtn = false;
    @Input() consultToEdit!: IConsult;
    @Output() add = new EventEmitter<IConsult>();
    @Output() update = new EventEmitter<IConsult>();

    inputForm!: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.inputForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            startDate: ['', Validators.required],
        });
    }

    onUpdate() {
        const data: IConsult = {
            id: this.consultToEdit.id,
            firstName: this.inputForm.get('firstName')?.value,
            lastName: this.inputForm.get('lastName')?.value,
            startDate: this.inputForm.get('startDate')?.value
        };

        this.update.emit(data);
    }

    onAdd() {
        const data: IConsult = {
            firstName: this.inputForm.get('firstName')?.value,
            lastName: this.inputForm.get('lastName')?.value,
            startDate: this.inputForm.get('startDate')?.value
        };

        this.add.emit(data);
    }
}
