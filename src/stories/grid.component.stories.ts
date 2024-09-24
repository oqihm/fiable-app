import React from "react";

import GridComponent from "../Components/grid.component";
import { StoryObj } from "@storybook/react/*";

const meta = {
    title: 'Grid Component',
    component: GridComponent,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],

}

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        boxSize: 5,
        x: 0,
        y: 0,
        direction: 'NORTH'
    }
}