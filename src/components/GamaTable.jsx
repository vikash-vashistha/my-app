import React from 'react';
import './FlavanoidsTable.css'; // Import the same CSS file for styling
import data from '../Wine-Data.json';

import { calculateMean, calculateMedian, calculateMode, calculateGamma } from '../utils/calculations'

const GammaTable = () => {
  const properties = ['Mean', 'Median', 'Mode'];
  const alcoholClasses = Array.from(new Set(data.map(item => item["Alcohol"])));

  const tableData = properties.map((property, index) => {
    const propertyValues = alcoholClasses.map((alcoholClass) => {
      const gammaValues = data
        .filter(item => item["Alcohol"] === alcoholClass)
        .map(calculateGamma);

      switch (property) {
        case 'Mean':
          return calculateMean(gammaValues).toFixed(3);
        case 'Median':
          return calculateMedian(gammaValues).toFixed(3);
        case 'Mode':
          return calculateMode(gammaValues).toFixed(3);
        default:
          return '';
      }
    });

    return { property, values: propertyValues };
  });

  return (
    <div className="table-container">
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
              <td>{`Gamma ${row.property}`}</td>
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

export default GammaTable;
