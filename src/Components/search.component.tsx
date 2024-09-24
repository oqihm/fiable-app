import React from "react";
import { TextField, Button, TableBody, TableRow, TableCell, TableContainer, Table, Alert } from '@mui/material';

interface SearchComponentProps {
    onSubmit: (x: number, y: number, direction: string) => void;
    maxInput: number;
}

export default function SearchComponent(params: SearchComponentProps) {
    const [hasNumericalError, setHasNumericalError] = React.useState(false);
    const [hasDirectionError, setHasDirectionError] = React.useState(false);
    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const x = (event.target as any).xCoordinate.value;
        const y = (event.target as any).yCoordinate.value;
        const direction = (event.target as any).direction.value;

        const validDirections = ['north', 'south', 'east', 'west'];

        setHasNumericalError(false);
        setHasDirectionError(false);

        if(!x || !y || !x || !y) {
            setHasNumericalError(true);
            return;
        }
        if(x > 4 || y > 4 || x < 0 || y < 0) {
            setHasNumericalError(true);
            return;
        }
        if(validDirections.some(p => p === direction) == false) {
            setHasDirectionError(true);
            return;
        }

        params.onSubmit(x,y,direction.toLowerCase());
    };

    return (
        <form onSubmit={(handleOnSubmit)}>
            <TableContainer>
                <Table> 
                    <TableBody>
                        <TableRow >
                            <TableCell sx={{borderBottom: 'none'}}>
                                <TextField id="xCoordinate" label="X Coordinate" variant="outlined" type="number" ></TextField>
                                <TextField id="yCoordinate" label="Y Coordinate" variant="outlined" type="number"></TextField>
                                <TextField id="direction" label="Direction" variant="outlined" ></TextField>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{borderBottom: 'none'}}>
                            <TableCell>
                                <Button type="submit" variant="outlined">Submit</Button>
                            </TableCell>
                           
                            
                        </TableRow>
                        <TableRow>
                         {
                                hasNumericalError && (
                                    <TableCell>
                                        <Alert variant="filled" severity="error">
                                            Min and Max coordinates are 0  - {params.maxInput};

                                        </Alert>
                                    </TableCell>
                                )
                        }
                        {
                                hasDirectionError && (
                                    <TableCell>
                                        <Alert variant="filled" severity="error">
                                            Invalid direction
                                        </Alert>
                                    </TableCell>
                                )
                        }
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </form>
        );
}
