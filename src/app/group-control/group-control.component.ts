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
import { ConditionFormComponentData } from '../condition-form/condition-form.component';
import { NzUploadListComponent } from 'ng-zorro-antd/upload';

export interface GroupControlComponentData {
  conjunctor: null;
  conditions: ConditionFormComponentData[];
  groups: GroupControlComponentData[];
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
  switchValue = false
  @Input()
  formLabel: string | number = 'Label';

  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();

  _form: FormGroup = this._fb.group({
    conjunctor: null,
    conditions: this._fb.array([]),
    groups: this._fb.array([]),
  });
  
  private _onChange!: (
    value: GroupControlComponentData | null | undefined
  ) => void;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _fb: FormBuilder) {}
  selectedValue = null

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
    this._conditionsFormArray.push(this._fb.control({ variable: null }));
  }

  _deleteGroupFromArray(index: number) {
    this._groupsFormArray.removeAt(index);
  }

  _addGroup() {
    this._groupsFormArray.push(
      this._fb.control({
        conditions: [],
        groups: [],
      })
    );
  }

  get _conditionsFormArray(): FormArray {
    return this._form.get('conditions') as FormArray;
  }

  get _groupsFormArray(): FormArray {
    return this._form.get('groups') as FormArray;
  }

  private _createFormGroup() {
    this._form = this._fb.group({
      conjunctor: null,
      conditions: this._fb.array([]),
      groups: this._fb.array([]),
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
