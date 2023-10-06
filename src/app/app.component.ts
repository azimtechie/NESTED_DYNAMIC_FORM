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
  jsonData = {
    templateId: 11,

    templateName: 'Ahmedabad Player Information',

    description: 'Ahmedabad Player Information for training',

    templateControls: [
      {
        controlId: 3,

        label: 'Full Name',

        controlValues: [
          {
            id: 0,

            value: null,
          },
        ],

        parentId: null,

        isRequired: true,

        sequence: 1,

        templateControls: [],
      },

      {
        controlId: 5,

        label: 'Date of Birth',

        controlValues: [
          {
            id: 0,

            value: null,
          },
        ],

        parentId: null,

        isRequired: true,

        sequence: 2,

        templateControls: [],
      },

      {
        controlId: 1,

        label: 'Gender',

        controlValues: [
          {
            id: 102,

            value: 'Male',
          },
        ],

        parentId: null,

        isRequired: true,

        sequence: 3,

        templateControls: [],
      },

      {
        controlId: 3,

        label: 'Contact Number',

        controlValues: [
          {
            id: 0,

            value: null,
          },
        ],

        parentId: null,

        isRequired: true,

        sequence: 4,

        templateControls: [
          {
            controlId: 3,

            label: 'Contact Number Secondary',

            controlValues: [
              {
                id: 0,

                value: null,
              },
            ],

            parentId: 76,

            isRequired: true,

            sequence: 5,

            templateControls: [],
          },
        ],
      },
    ],
  };
  sendValues(){
    this._form.patchValue(this.jsonData)
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
