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
    TemplateId: 0,
    TemplateName: null,
    Description: null,
    TemplateControls: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {
    this._createForm();
  }
  jsonData = {
    TemplateId: 13,
    TemplateName: 'Jamnagar Player Information',
    Description: 'Jamnagar Player Information for training',
    TemplateControls: [
      {
        ControlId: 3,
        ControlName: 'Textbox',
        Label: 'Full Name',
        ControlValues: [],
        Id: 138,
        ParentId: null,
        IsRequired: true,
        Sequence: 1,
        Childs: [],
      },
      {
        ControlId: 5,
        ControlName: 'datetime',
        Label: 'Date of Birth',
        ControlValues: [],
        Id: 139,
        ParentId: null,
        IsRequired: true,
        Sequence: 2,
        Childs: [],
      },
      {
        ControlId: 1,
        ControlName: 'Dropdown',
        Label: 'Gender',
        ControlValues: [
          { Id: 180, Values: 'Male' },
          { Id: 181, Values: 'Female' },
          { Id: 182, Values: 'Other' },
        ],
        Id: 140,
        ParentId: null,
        IsRequired: true,
        Sequence: 3,
        Childs: [],
      },
      {
        ControlId: 3,
        ControlName: 'Textbox',
        Label: 'Contact Number',
        ControlValues: [],
        Id: 141,
        ParentId: null,
        IsRequired: true,
        Sequence: 4,
        Childs: [
          {
            ControlId: 3,
            ControlName: 'Textbox',
            Label: 'Contact Number Secondary',
            ControlValues: [],
            Id: 142,
            ParentId: 141,
            IsRequired: true,
            Sequence: 17,
            Childs: [],
          },
          {
            ControlId: 3,
            ControlName: 'Textbox',
            Label: 'Phone Number',
            ControlValues: [],
            Id: 143,
            ParentId: 141,
            IsRequired: true,
            Sequence: 18,
            Childs: [
              {
                ControlId: 3,
                ControlName: 'Textbox',
                Label: 'Contact Number Secondary',
                ControlValues: [],
                Id: 144,
                ParentId: 143,
                IsRequired: true,
                Sequence: 19,
                Childs: [],
              },
            ],
          },
        ],
      },
    ],
  };
  sendValues() {
    this._form.patchValue(this.jsonData);
  }
  _addGroup() {
    this._groupsFormArray.push(
      this.fb.control({
        ControlValues: [],
        ParentId: 0,
        IsRequired: true,
        Sequence: 0,
        Childs: [],
      })
    );
  }

  _delete(index: number) {
    this._groupsFormArray.removeAt(index);
  }

  get _groupsFormArray(): FormArray {
    return this._form.get('TemplateControls') as FormArray;
  }

  private _createForm() {
    this._form = this.fb.group({
      TemplateId: 0,
      TemplateName: null,
      Description: null,
      TemplateControls: this.fb.array([]),
    });
  }
}
