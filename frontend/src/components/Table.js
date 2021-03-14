import React, { Component } from 'react'

function Table() {
    const [bestellungen, setBestellungen] = React.useState([
        { nummer: 1, name: 'BACKENDOFFLINE', status: 'BACKENDOFFLINE'}
        ]);

    React.useEffect(() => {// equivalent to componentDidMount
        fetch("/orders")
            .then((res) => res.json())
            .then((data) => {        
            console.log(data.allOrders)
            setBestellungen(data.allOrders)
            });
    }, []);

    const renderTableHeader = () =>  {
        let header = Object.keys(bestellungen[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    const renderTableData = (dat) => {
       console.log("in dat")
       console.log(dat)
        return bestellungen.map((student, index) => {
            const {nummer, name, status} = student
            return (
                <tr key={nummer}>
                    <td>{nummer}</td>
                    <td>{name}</td>
                    <td>{status}</td>
                </tr>
            )
        })
    }

    return (
        <div>
            <h1 id='title'>ABHOLUNG</h1>
            <table id='students'>
                <tbody>
                    <tr>{renderTableHeader()}</tr>
                    {renderTableData("lol")}
                </tbody>
            </table>
        </div>
    )
    
}

export default Table