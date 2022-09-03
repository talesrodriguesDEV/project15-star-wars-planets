import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Filter() {
  const { setFilterName, setColumn, setComparison,
    setValue, activateFilter, filters, setFilters } = useContext(PlanetsContext);

  const [localColumn, setLocalColumn] = useState('population');
  const [localComparison, setLocalComparison] = useState('maior que');
  const [localValue, setLocalValue] = useState(0);

  const columnFilterValuesArray = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [columnFilterValues, setColumnFilterValues] = useState(columnFilterValuesArray);

  const updateColumnFilters = () => {
    const newColumnFilterValues = columnFilterValuesArray
      .filter((item) => filters.every((filter) => filter.column !== item));
    setColumnFilterValues(newColumnFilterValues);
  };

  useEffect(() => {
    updateColumnFilters();
  }, [filters]);

  const removeFilter = (filter) => {
    const newFiltersArray = filters.filter((item) => item !== filter);
    if (newFiltersArray.length === 0) activateFilter(false);
    setFilters(newFiltersArray);
  };

  return (
    <div className="mt-3 w-3/4 flex justify-around smaller-container rounded-lg">
      <div className="h-60 flex flex-col justify-around p-2">
        <input
          data-testid="name-filter"
          onChange={ ({ target }) => setFilterName(target.value) }
          placeholder="Planet Name"
          className="form-control"
        />
        <select
          data-testid="column-filter"
          onChange={ ({ target }) => setLocalColumn(target.value) }
          className="form-select"
        >
          {columnFilterValues.map((filterValue, index) => (
            <option
              value={ filterValue }
              key={ index }
            >
              {filterValue}
            </option>))}
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ ({ target }) => setLocalComparison(target.value) }
          className="form-select"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          onChange={ ({ target }) => setLocalValue(target.value) }
          defaultValue="0"
          className="form-control"
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            activateFilter(true);
            setColumn(localColumn);
            setComparison(localComparison);
            setValue(localValue);
          } }
          className="btn btn-success form-control"
        >
          Filter
        </button>
      </div>
      <div className="flex flex-col justify-around w-56">
        {filters.length !== 0 ? filters.map(((filter, index) => (
          <div
            data-testid="filter"
            key={ index }
            className="flex justify-between text-white"
          >
            {`${filter.column} ${filter.comparison} ${filter.value}`}
            <button
              type="button"
              onClick={ () => {
                removeFilter(filter);
                updateColumnFilters();
              } }
              className="btn btn-warning text-white"
            >
              X
            </button>
          </div>
        ))) : <p className="text-center text-white">No filters yet</p>}
        {filters.length !== 0 && (
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => {
              setFilters([]);
              setColumnFilterValues(columnFilterValuesArray);
              activateFilter(false);
            } }
            className="btn btn-danger"
          >
            Remove All Filters
          </button>)}
      </div>
    </div>
  );
}
