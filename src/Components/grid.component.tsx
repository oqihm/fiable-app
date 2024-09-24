import React, { Component } from "react";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { TableBody } from "@mui/material";

interface GridComponentProps {
    boxSize: number;
    x: number;
    y: number;
    direction: string;
}

export default function GridComponent(params: GridComponentProps) {
    const boxLayout = [];
    const cellRefs: any = React.useRef([]);
    const [xyDirection, setXYDirection] = React.useState<[[number, number], string]>([[0,0], 'north']);

    for(let rowIndex = params.boxSize - 1; rowIndex >= 0; rowIndex--) {
        const row = [];
        for (let colIndex = 0; colIndex < params.boxSize; colIndex++) {
           row.push(`${rowIndex},${colIndex}`);
        }
        boxLayout.push(row);
    }

    const locateCell = (x:number, y:number, direction: string) => {
        const cell = cellRefs.current[`cell-${x},${y}`];
        if (cell) {
            switch(direction) {
                case 'north':
                    cell.children[0].style.borderTop = "2px solid red";
                    break;
                case 'south':
                    cell.children[0].style.borderBottom = "2px solid red";
                    break;
                case 'east':
                    cell.children[0].style.borderRight = "2px solid red";
                    break;
                case 'west':
                    cell.children[0].style.borderLeft = "2px solid red";
                    break;
                default:
                    break;
            }
        }
    };

    const refrestPreviousCell = (x:number, y:number, direction: string) => {
        const cell = cellRefs.current[`cell-${x},${y}`];
        if (cell) {
                cell.children[0].style.border = "1px dashed grey";
        }
    };

    React.useEffect(() => {
        const [coordinates, direction] = xyDirection;
        refrestPreviousCell(coordinates[0], coordinates[1], direction);
        setXYDirection([[params.x, params.y],params.direction]);

    }, [params]);

    React.useEffect(() => {
        const [coordinates, direction] = xyDirection;
        locateCell(coordinates[0], coordinates[1], direction);

    }, [xyDirection]);

    return (  
        <TableContainer>
            <Table>
                <TableBody>
                    {
                        Array.from(boxLayout).map((row, rowIndex) => (
                            <TableRow key={`row-${rowIndex}`}>
                            {
                                Array.from(row).map((col, colIndex) => (
                                    <TableCell key={`cell-${col}`}
                                        ref={el => cellRefs.current[`cell-${col}`] = el}>
                                        <Box sx={{ p: 2, border: '1px dashed grey' }}>
                                            {col}
                                        </Box>
                                    </TableCell>
                                ))
                            }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
