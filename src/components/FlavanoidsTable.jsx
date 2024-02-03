import React from 'react';
import './FlavanoidsTable.css';
import data from '../Wine-Data.json'

import { calculateMean, calculateMedian, calculateMode } from '../utils/calculations'

const FlavanoidsTable = () => {
  const properties = ['Mean', 'Median', 'Mode'];
  const alcoholClasses = Array.from(new Set(data.map(item => item["Alcohol"])));

  const tableData = properties.map((property, index) => {
    const propertyValues = alcoholClasses.map((alcoholClass) => {
      const flavanoidsValues = data
        .filter(item => item["Alcohol"] === alcoholClass)
        .map(item => Number(item['Flavanoids']));

        switch (property) {
        case 'Mean':
          return calculateMean(flavanoidsValues).toFixed(3);
        case 'Median':
          return calculateMedian(flavanoidsValues).toFixed(3);
        case 'Mode':
          return calculateMode(flavanoidsValues).toFixed(3);
        default:
          return '';
      }
    });

    return { property, values: propertyValues };
  });

  return (
    <div className="table-container"> {/* Added a container div */}
      <table className="flavanoids-table">
        <thead>
          <tr>
            <th></th>
            {alcoholClasses.map((alcoholClass, index) => (
              <th key={index}>{`Class ${alcoholClass}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{`Flavanoids ${row.property}`}</td>
              {row.values.map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlavanoidsTable;
