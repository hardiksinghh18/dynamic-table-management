import React, { useState } from 'react';

type Row = {
  [key: string]: string | number | string[];
};

const DynamicTable: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [columns, setColumns] = useState<{ name: string; type: 'string' | 'number' }[]>([]);
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState<'string' | 'number'>('string');

  const addColumn = () => {
    if (newColumnName.trim()) {
      setColumns([...columns, { name: newColumnName, type: newColumnType }]);
      setNewColumnName('');
    }
  };

  const addRow = () => {
    const newRow: Row = {};
    columns.forEach((col) => {
      newRow[col.name] = col.type === 'string' ? [''] : 0; // Initialize based on column type
    });
    setRows([...rows, newRow]);
  };

  const updateCell = (rowIndex: number, columnName: string, value: string | number | string[]) => {
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [columnName]: value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div>
        <h2 className="text-lg mb-2">Dynamic Table Management</h2>
        <input
          type="text"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          placeholder="Column Name"
          className="border border-gray-600 p-1 mr-2 text-black bg-white"
        />
        <select
          value={newColumnType}
          onChange={(e) => setNewColumnType(e.target.value as 'string' | 'number')}
          className="border border-gray-600 p-1 mr-2 text-black bg-white"
        >
          <option value="string">String</option>
          <option value="number">Number</option>
        </select>
        <button onClick={addColumn} className="bg-blue-500 text-white p-1">Add Column</button>
      </div>
      <button onClick={addRow} className="bg-green-500 text-white p-1 mt-2">Add Row</button>

      <table className="mt-4 border-collapse border border-gray-700 w-full">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="border border-gray-600 p-2 bg-black">{col.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col.name} className="border border-gray-600 p-2 bg-black">
                  <input
                    type={col.type === 'number' ? 'number' : 'text'}
                    value={row[col.name] as any}
                    onChange={(e) => updateCell(rowIndex, col.name, col.type === 'string' ? [e.target.value] : Number(e.target.value))}
                    className="bg-gray-900 text-white border border-gray-900 p-1 w-full"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
