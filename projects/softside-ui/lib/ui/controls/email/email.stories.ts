import { moduleMetadata, type Meta, type StoryObj, applicationConfig } from '@storybook/angular';
import { IonicModule } from '@ionic/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { importProvidersFrom } from '@angular/core';

import { SSEmailComponent } from './email.component';
import { SSInputComponent } from '../_input/_input.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<SSEmailComponent> = {
    title: 'UI Components/Email',
    component: SSEmailComponent,
    tags: ['autodocs'],
    render: (args) => ({ props: args }),
    decorators: [
        moduleMetadata({
            declarations: [],
            imports: [IonicModule, SSInputComponent, ReactiveFormsModule, CommonModule],
            providers: [Validators],

        }), applicationConfig({
            providers: [importProvidersFrom([IonicModule.forRoot()])],
        }),
    ],

};

export default meta;

type Story = StoryObj<SSEmailComponent>;

const formGroup = new FormGroup({
    email: new FormControl(''),
});

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args
export const Primary: Story = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (args: any): {} => {
        return {
            props: {
                ...args,

                form: formGroup,

            },
            template: `<form [formGroup]="form"> 				
                            <ss-email></ss-email>
                        </form>`,
        };
    },
    args: {

    },
};
