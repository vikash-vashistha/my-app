import React from 'react';
import './FlavanoidsTable.css';

import data from '../Wine-Data.json'

const calculateMean = (array) => array.reduce((acc, val) => acc + val, 0) / array.length || 0

const calculateMedian = (array) => {
  const sortedArray = array.slice().sort((a, b) => a - b);
  const middle = Math.floor(sortedArray.length / 2);
  return sortedArray.length % 2 === 0 ? (sortedArray[middle - 1] + sortedArray[middle]) / 2 : sortedArray[middle];
};

const calculateMode = (array) => {
  const frequencyMap = {};
  array.forEach((value) => {
    frequencyMap[value] = (frequencyMap[value] || 0) + 1;
  });
  const mode = Object.keys(frequencyMap).reduce((a, b) => frequencyMap[a] > frequencyMap[b] ? a : b);
  return parseFloat(mode);
};

const FlavanoidsTable = () => {
  const properties = ['Mean', 'Median', 'Mode'];
  const alcoholClasses = Array.from(new Set(data.map(item => item["Alcohol"])));

  const tableData = properties.map((property, index) => {
    const propertyValues = alcoholClasses.map((alcoholClass) => {
      const flavanoidsValues = data
        .filter(item => item["Alcohol"] === alcoholClass)
        .map(item => item['Flavanoids']);

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
              <td>{row.property}</td>
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
