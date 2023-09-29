import {
  Component,
  OnDestroy,
  Input,
  Output,
  forwardRef,
  EventEmitter,
  OnInit
} from "@angular/core";
import {
  ControlValueAccessor,
  FormGroup,
  FormBuilder,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export interface ConditionFormComponentData {
  variable: any;
}

@Component({
  selector: "app-condition-form",
  templateUrl: "./condition-form.component.html",
  styleUrls: ["./condition-form.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConditionFormComponent),
      multi: true
    }
  ]
})
export class ConditionFormComponent

  implements ControlValueAccessor, OnDestroy, OnInit {
    checkOptions = [
      { label: 'Apple', value: 'Apple', checked: true },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' }
    ];
    items = [
      'Short Answer',
      'Paragraph',
      'Multiple Choices',
      'CheckBoxes',
      'Dropdown',
      'File Upload',
      'Linear scal',
      'Multiple choise grid',
      'Checkbox Grid',
      'Date',
      'time',
    ];
    shortAnswer:any
    multiple_choices:any
    selectedCheckboxes:any
    selectedDropdown:any
  @Input()
  formLabel: string | number = "Label";

  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();

  _form: FormGroup = this._fb.group({
    conjunctor: null,
    conditions: this._fb.array([]),
    groups: this._fb.array([]),
  });

  private _onChange !: (
    value: ConditionFormComponentData | null | undefined
  ) => void;
  selectedValue = null
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _fb: FormBuilder) {}

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

  writeValue(value: ConditionFormComponentData): void {
    if (!value) {
      return;
    }

    this._form.patchValue(value);
  }
  registerOnChange(
    fn: (v: ConditionFormComponentData | null | undefined) => void
  ): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // TODO: implement this method
    // throw new Error("registerOnTouched not implemented");
  }

  setDisabledState(isDisabled: boolean): void {
    // TODO: implement this method
    // throw new Error("setDisabledState not implemented");
  }

  private _createFormGroup() {
    this._form = this._fb.group({
      variable: null
    });
  }

  private _setupObservables() {
    this._form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      if (this._onChange) {
        this._onChange(value);
      }
    });
  }
}
