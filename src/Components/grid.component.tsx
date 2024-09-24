import React, { Component } from "react";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { TableBody } from "@mui/material";
import arrow from '../arrow.svg';

interface GridComponentProps {
    /** size of table/matrix */
    boxSize: number;
    /** x coordinate */
    x: number;
    /** y coordinate */
    y: number;
    /** direction the object is facing */
    direction: string;
}

/** Ui component to locate coordinates and set object's(arrow) direction */
export default function GridComponent(params: GridComponentProps) {
    const boxLayout = [];
    const cellRefs: any = React.useRef([]);
    const [xyDirection, setXYDirection] = React.useState<[[number, number], string]>([[0,0], '']);

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
            switch(direction.toLowerCase()) {
                case 'north':
                    cell.children[0].children[0].style.transform = 'rotate(-0.25turn)';
                    break;
                case 'south':
                    cell.children[0].children[0].style.transform = 'rotate(90deg)';
                    break;
                case 'east':
                    cell.children[0].children[0].style.transform = 'rotate(0)';
                    break;
                case 'west':
                    cell.children[0].children[0].style.transform = 'rotate(3.142rad)';
                    break;
                default:
                    break;
            }
            cell.children[0].children[0].style.display = 'block';
        }
    };

    const refrestPreviousCell = (x:number, y:number, direction: string) => {
        const cell = cellRefs.current[`cell-${x},${y}`];
        if (cell) {
                cell.children[0].children[0].style.display = 'none';
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
                                        <img 
                                            src={arrow}
                                            style={{ width: '100%', height: '50px', display: 'none' }}
                                        />
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
