import React from 'react';
import logo from './logo.svg';
import './App.css';
import GridComponent from './Components/grid.component';
import SearchComponent from './Components/search.component';

function App() {
  const [gridParam, setGridParam] = React.useState<[[number, number], string]>([[0,0], 'north']);

  const handleOnSubmit = (x: number, y: number, direction: string) => {
    setGridParam([[x, y], direction]);
  };

  const [[xParam, yParam], direction] = gridParam;

  return (
    <div className="App">
      <SearchComponent onSubmit={handleOnSubmit} maxInput={4}></SearchComponent>
      <GridComponent boxSize={5} x={xParam} y={yParam} direction={direction}/>
    </div>
  );
}

export default App;
