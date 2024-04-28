import React, { useState, useEffect } from 'react';
import jsonData from './data.json';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
import './TableApp.css';
import { search } from './Utils';


function TableApp() {



  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([]);





  useEffect(() => {
    // Kada se komponenta renderuje preko setTableData učitavamo sve podatke
    setTableData(jsonData);
    // defaultnih 5 kolona iz data učitavamo prilikom inicijalnog renderovanja
    setSelectedColumns(Object.keys(jsonData[0]).slice(0, 5));
    // također postavljamo ostale kolone u available
    setAvailableColumns(Object.keys(jsonData[0]).slice(5));
  }, []);




  const handleSearch = () => {
    //generička search metoda iz Utils-a koja se može koristiti na više komponenti
    search(jsonData, searchTerm, setTableData); 
  };




  //reaguje na onChange prilikom ukusa teksta u search bar, sa svakim eventom se ponovo trigeruje
  const handleChange = (event) => {
    setSearchTerm(event.target.value);

    // ako je broj karaktera iznad 3, pokreni search preko handleSearch() -> search() 
    if (event.target.value.length >= 3) {
      handleSearch();
    } else {
      // ponovo koristimo setTableData kao da se komponenta ponovo renderovala
      setTableData(jsonData);
    }
  };




  //u ovisnosti da li se double click na selected ili na available, iz liste kolona gdje se event desio, 
  //izbacuje se iz liste ta kolona i dodaje se u drugu listu
  //na kraju se komponenta ponovo re-renderuje
  const handleDoubleClick = (column, fromList) => {
    if (fromList === 'selected') {
      setSelectedColumns(selectedColumns.filter(col => col !== column));
      setAvailableColumns([...availableColumns, column]);
    } else {
      setSelectedColumns([...selectedColumns, column]);
      setAvailableColumns(availableColumns.filter(col => col !== column));
    }
  };








  return (
    <>
      <div className="container">

        <div className="search">
          <span className="search-icon"></span>
          <input type="text" placeholder="Pretraži..." size="50" value={searchTerm} onChange={handleChange} />
        </div>


        <div className="table">
          <Grid
            rows={tableData}
            columns={selectedColumns.map(column => ({ name: column, title: column }))}
          >
            <Table />
            <TableHeaderRow />
          </Grid>
        </div>


        <div className="columns">
          <div className="red-div">
            <ul>
              {availableColumns.map((column, index) => (
                <li key={index} onDoubleClick={() => handleDoubleClick(column, 'available')}>
                  <span className="available-columns">{column}</span>
                </li>
              ))}
            </ul>
          </div>


          <div className="separator"></div>


          <div className="green-div">
            <ul>
              {selectedColumns.map((column, index) => (
                <li key={index} onDoubleClick={() => handleDoubleClick(column, 'selected')}>
                  <span className="selected-columns">{column}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}

export default TableApp;
