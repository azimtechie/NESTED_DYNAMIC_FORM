import {
  Component,
  Input,
  forwardRef,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface GroupControlComponentData {
  controlId: null;
  label: null;
  templateControls: GroupControlComponentData[];
}

@Component({
  selector: 'app-group-control',
  templateUrl: './group-control.component.html',
  styleUrls: ['./group-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GroupControlComponent),
      multi: true,
    },
  ],
})
export class GroupControlComponent
  implements ControlValueAccessor, OnDestroy, OnInit
{
  switchValue = false;
  @Input()
  formLabel: string | number = 'Label';
  @Input()
  controlId!: string;

  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();
  checkboxItems: { value: string }[] = [];
  selectedCheckboxValues: string[] = [];
  removeCheckboxOption(index: number) {
    this.checkOptions.splice(index, 1);
  }
  addCheckboxItem(value: string) {
    if (value.trim() !== '') {
      console.log('value :::::::::::>>>>>>>>> ', value);
      this.checkOptions.push({ label: value, value: value });
    }
  }

  checkOptions = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];
  values = this.checkOptions.map((e) => e.value);
  items = [
    { label: 'Dropdown', id: 1 },
    { label: 'Checkbox', id: 2 },
    { label: 'Textbox', id: 3 },
    { label: 'Multiline textbox', id: 4 },
    { label: 'Date time', id: 5 },
    { label: 'Yes/No', id: 6 },
  ];

  shortAnswer: any;
  multiple_choices: any;
  selectedCheckboxes: any;
  selectedDropdown: any;
  textInputs: { value: string }[] = [{ value: 'New Text Input' }];
  listOfItem = ['jack', 'lucy'];
  index = 0;
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (this.listOfItem.indexOf(value) === -1) {
      this.listOfItem = [
        ...this.listOfItem,
        input.value || `New item ${this.index++}`,
      ];
    }
  }
  handleTextInputChange(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    const controlValuesArray = this._form.get('controlValues') as FormArray;
    controlValuesArray.at(index).patchValue({ id: 0, value });
  }
  addNewOption() {
    if (this.selectedValue === 2 || this.selectedValue === 1) {
      const controlValuesArray = this._form.get('controlValues') as FormArray;
      controlValuesArray.push(this._fb.group({ id: 0, value: null }));
      this.textInputs.push({ value: 'New Text Input' });
    }
  }
  removeTextInput(index: number) {
    const controlValuesArray = this._form.get('controlValues') as FormArray;
    controlValuesArray.removeAt(index);
    this.textInputs.splice(index, 1);
  }
  _form: FormGroup = this._fb.group({
    controlId: null,
    label: null,
    controlValues: this._fb.array([]),
    templateControls: this._fb.array([]),
  });

  private _onChange!: (
    value: GroupControlComponentData | null | undefined
  ) => void;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _fb: FormBuilder) {}
  selectedValue = null;

  ngOnInit() {
    this._createFormGroup();

    this._setupObservables();
  }

  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  writeValue(value: GroupControlComponentData | null | undefined): void {
    if (!value) {
      return;
    }

    this._form.patchValue(value);
  }

  registerOnChange(
    fn: (value: GroupControlComponentData | null | undefined) => void
  ): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // TODO: implement this method
    // throw new Error('registerOnTouched not implemented');
  }

  setDisabledState(isDisabled: boolean): void {
    // TODO: implement this method
    // throw new Error('setDisabledState not implemented');
  }

  _deleteCondition(index: number) {
    this._conditionsFormArray.removeAt(index);
  }

  _addCondition() {
    this._conditionsFormArray.push(this._fb.control({ id: 0, value: null }));
  }

  _deleteGroupFromArray(index: number) {
    this._groupsFormArray.removeAt(index);
  }
  onDropdownChange() {
    console.log('Selected option:', this.selectedValue);
  }
  _addGroup() {
    this._groupsFormArray.push(
      this._fb.control({
        controlValues: [],
        parentId: 0,
        isRequired: true,
        sequence: 0,
        templateControls: [],
      })
    );
  }

  get _conditionsFormArray(): FormArray {
    return this._form.get('controlValues') as FormArray;
  }

  get _groupsFormArray(): FormArray {
    return this._form.get('templateControls') as FormArray;
  }

  private _createFormGroup() {
    this._form = this._fb.group({
      controlId: null,
      label: null,
      controlValues: this._fb.array([]),
      parentId: 0,
      isRequired: true,
      sequence: 0,
      templateControls: this._fb.array([]),
    });

    // add one condition on the next tick, after the form creation
    setTimeout(() => this._addCondition());
  }

  private _setupObservables() {
    this._form.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((value) => {
        if (this._onChange) {
          this._onChange(value);
        }
      });
  }
}
