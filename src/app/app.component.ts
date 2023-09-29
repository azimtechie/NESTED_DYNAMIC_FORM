import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedValue = null;
  Descriptionvalue?: string;
  _form: FormGroup = this.fb.group({
    groups: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {
    this._createForm();
  }

  _addGroup() {
    this._groupsFormArray.push(
      this.fb.control({
        conditions: [],
        groups: [],
      })
    );
  }

  _delete(index: number) {
    this._groupsFormArray.removeAt(index);
  }

  get _groupsFormArray(): FormArray {
    return this._form.get('groups') as FormArray;
  }

  private _createForm() {
    this._form = this.fb.group({
      groups: this.fb.array([]),
    });
  }
}
