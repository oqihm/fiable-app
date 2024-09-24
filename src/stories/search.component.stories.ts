import React from "react";

import { StoryObj } from "@storybook/react/*";
import SearchComponent from "../Components/search.component";
import { fn } from '@storybook/test';

const meta = {
    title: 'Search Component',
    component: SearchComponent,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs']

}

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        onSubmit: fn(),
        maxInput: 4,
    }
}