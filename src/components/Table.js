import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const headers = ['Name', 'Rotation Period', 'Orbital Period',
  'Diameter', 'Climate', 'Gravity', 'Terrain', 'Surface Water',
  'Population'];

export default function Table() {
  const { planets, filterByName, filterByNumericValues,
    isNumericFilterActive, filters, setFilters } = useContext(PlanetsContext);
  const { column, comparison, value } = filterByNumericValues;

  const compareNumbers = (columnValue, filterValue, comparisonType) => {
    switch (comparisonType) {
    case 'igual a':
      return Number(columnValue) === Number(filterValue);
    case 'menor que':
      return Number(columnValue) < Number(filterValue);
    case 'maior que':
      return Number(columnValue) > Number(filterValue);
    default:
      return true;
    }
  };

  const addNewFilter = () => {
    const filterObject = {
      column,
      comparison,
      value,
    };

    if (column !== '' && comparison !== '') setFilters([...filters, filterObject]);
  };

  useEffect(addNewFilter, [column, comparison, value]);

  const doesPlanetSuitsAllFilters = (planet) => filters
    .every((filter) => compareNumbers(planet[filter.column],
      filter.value, filter.comparison));

  return (
    <table
      className="table w-3/4 table-light table-striped table-hover
      table-bordered table-align-middle mt-10"
    >
      <thead>
        <tr>{headers.map((header, index) => <th key={ index }>{header}</th>)}</tr>
      </thead>
      <tbody className="table-group-divider">
        {planets
          .filter((planet) => planet.name.toUpperCase()
            .includes(filterByName.toUpperCase()))
          .filter((planet) => !isNumericFilterActive
          || doesPlanetSuitsAllFilters(planet))
          .map((planet, index) => (
            <tr key={ index }>
              {Object.values(planet).map((info, index2) => (
                <td key={ index2 }>{info}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}
