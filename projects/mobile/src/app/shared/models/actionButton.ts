export interface ActionButton<T> {
	visible: boolean;
	disabled: boolean;
	class: string;
	color: string;
	text: string;
	action?: T;
	submit?: boolean;
	isWaiting?: boolean;
	options?: Array<{
		text: string;
		action?: T;
	}>;
}
