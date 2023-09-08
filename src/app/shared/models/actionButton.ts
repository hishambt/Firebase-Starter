export interface ActionButton<T> {
	visible: boolean;
	disabled: boolean;
	class: string;
	color: any;
	text: string;
	action?: T;
	submit?: boolean;
	isWaiting?: boolean;
	options?: Array<{
		text: string;
		action?: T;
	}>;
}
