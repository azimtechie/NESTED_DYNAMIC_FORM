import { NonNullAssert } from '@angular/compiler';
import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  Descriptionvalue?: string;
  _form: FormGroup = this.fb.group({
    templateId: 0,
    templateName: null,
    description: null,
    templateControls: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {
    this._createForm();
  }

  _addGroup() {
    this._groupsFormArray.push(
      this.fb.control({
        controlValues: [],
        parentId: 0,
        isRequired: true,
        sequence: 0,
        templateControls: [],
      })
    );
  }

  _delete(index: number) {
    this._groupsFormArray.removeAt(index);
  }

  get _groupsFormArray(): FormArray {
    return this._form.get('templateControls') as FormArray;
  }

  private _createForm() {
    this._form = this.fb.group({
      templateId: 0,
      templateName: null,
      description: null,
      templateControls: this.fb.array([]),
    });
  }
}
