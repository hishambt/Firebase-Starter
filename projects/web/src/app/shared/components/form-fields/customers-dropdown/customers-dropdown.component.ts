// import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
// import { MatSelect } from '@angular/material/select';
// import { Customer } from 'projects/app-api/src/model/customer';
// import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';

// import { AppFormSharingService } from '../../../services/app-form-sharging.service';

// @Component({
// 	selector: 'app-customers-dropdown',
// 	templateUrl: './customers-dropdown.component.html',
// 	styleUrls: ['./customers-dropdown.component.scss'],
// })
// export class CustomersDropdownComponent implements OnInit, AfterViewInit, OnDestroy {
// 	@ViewChild('customersDropdown', { static: true }) customersDropdown!: MatSelect;
// 	@ViewChild('customersDropdown') customersDropdownRef!: ElementRef;

// 	@Input() label!: string;
// 	@Input() parentForm!: FormGroup;
// 	@Input() controlName: string = '';

// 	@Output() focusOut = new EventEmitter<string>();
// 	@Output() valueChange = new EventEmitter();
// 	@Output() openDrawer = new EventEmitter<string>();

// 	bankFilterCtrl: FormControl<string | null> = new FormControl<string>('');

// 	public filteredBanks: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
// 	protected _onDestroy = new Subject<void>();

// 	constructor(@Inject(AppFormSharingService) private appFormSharingService: AppFormSharingService) {}
// 	public options = [
// 		{ name: 'Customer 1', id: '00001' },
// 		{ name: 'Customer 2', id: '00002' },
// 		{ name: 'Customer 3', id: '00003' },
// 		{ name: 'Customer 4', id: '00004' },
// 		{ name: 'Customer 5', id: '00005' },
// 	];

// 	ngOnInit(): void {
// 		this.filteredBanks.next(this.options.slice());

// 		this.bankFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
// 			this.filterBanks();
// 		});

// 		//TODO: missing un subscribe
// 		this.appFormSharingService.onCloseComponentInDrawer$.subscribe((data: any) => {
// 			if (data) {
// 				this.options.unshift({ name: data.firstName, id: '00006' });
// 				this.filteredBanks.next(this.options.slice());
// 			}
// 		});
// 	}

// 	ngAfterViewInit(): void {
// 		this.setInitialValue();
// 	}

// 	onCreateNew(): void {
// 		this.customersDropdown.toggle();
// 		// this.openDrawer.emit(this.bankFilterCtrl.value ?? '');
// 		const customer: Customer = {
// 			firstName: this.bankFilterCtrl.value ?? '',
// 			lastName: 'test',
// 		};
// 		const component = import('projects/web/src/app/features/customers/feature/customer-add/customer-add.component').then(
// 			(m) => m.CustomerAddComponent,
// 		);

// 		// TODO: openComponentInDrawer should return the index of the target opened component
// 		// that represent the index of the opened Drawer
// 		// this index should be used to check if(retrived index is equal to the provided index by onCloseComponentInDrawer)
// 		this.appFormSharingService.openComponentInDrawer(component, customer, 'add');
// 	}

// 	//TODO: move dialog call to a shared component
// 	onCreateNew1(): void {
// 		const customer: Customer = {
// 			firstName: this.bankFilterCtrl.value ?? '',
// 			lastName: 'test',
// 		};
// 		// const component = import('projects/web/src/app/features/customers/customer-form/customer-form.component').then(
// 		// 	(m) => m.CustomerFormComponent
// 		// );
// 		const component = import('projects/web/src/app/features/orders/order-form/order-form.component').then((m) => m.OrderFormComponent);

// 		this.appFormSharingService.openComponentInDialog(component, 'add', customer);
// 	}

// 	onSelectionChange(event: any): void {
// 		this.valueChange.emit(event);
// 	}

// 	/**
// 	 * Sets the initial value after the filteredBanks are loaded initially
// 	 */
// 	protected setInitialValue(): void {
// 		this.filteredBanks.pipe(take(1), takeUntil(this._onDestroy)).subscribe(() => {
// 			// setting the compareWith property to a comparison function
// 			// triggers initializing the selection according to the initial value of
// 			// the form control (i.e. _initializeSelection())
// 			// this needs to be done after the filteredBanks are loaded initially
// 			// and after the mat-option elements are available
// 			this.customersDropdown.compareWith = (a: any, b: any) => a && b && a.id === b.id;
// 		});
// 	}

// 	protected filterBanks(): void {
// 		if (!this.options) {
// 			return;
// 		}

// 		// get the search keyword
// 		let search = this.bankFilterCtrl.value;

// 		if (!search) {
// 			this.filteredBanks.next(this.options.slice());

// 			return;
// 		} else {
// 			search = search.toLowerCase();
// 		}

// 		// filter the banks
// 		this.filteredBanks.next(this.options.filter((bank) => bank.name.toLowerCase().indexOf(search!) > -1));
// 	}

// 	ngOnDestroy(): void {
// 		this._onDestroy.next();
// 		this._onDestroy.complete();
// 	}
// }
