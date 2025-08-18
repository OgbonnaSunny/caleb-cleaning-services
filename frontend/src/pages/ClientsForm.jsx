import React, {useState, useEffect} from 'react'
import axios from 'axios'

const ClientsForm = () => {
    const [tableName, setTableName] = useState('');
    const [columns, setColumns] = useState([{category: '', type:''}])

    const handleAddColumn = () => {
        setColumns([...columns, {category:'', type:''}])
    }

    const handleColumnChange = (index, field, value) => {
        const newColumns = [...columns]
        newColumns[index][field] = value
        setColumns(newColumns)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const response = await fetch('/clients', {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({tableName, columns}),
           });

        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }}>
            <form onSubmit={handleSubmit} >
                <label>
                    Table Name:
                    <input type="text" onChange={(e) => setTableName(e.target.value)} value={tableName} required />
                </label>
                <h3>Columns:</h3>
                {columns.map((column, index) => (
                    <div key={index}>
                        <input
                            type='text'
                            placeholder={column.category}
                            onChange={(e) => handleColumnChange(index,'name', e.target.value)}
                            value={column.category}
                            required
                        />
                        <input
                            type='text'
                            placeholder='Data type (e.g, INT, VARCHAR(255))' //replace with the column type using column.type
                            value={column.type}
                            onChange={(e) => handleColumnChange(index,'type', e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button type={'button'} onClick={handleAddColumn}>Add column</button>
                <button type={'submit'} onClick={handleSubmit}>Create Table</button>
            </form>
        </div>
    )

}
export default ClientsForm;