import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterName] = useState('');
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState(0);
  const [isNumericFilterActive, activateFilter] = useState(false);
  const [filters, setFilters] = useState([]);

  const fetchPlanetsInfo = () => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((planet) => {
          delete planet.residents;
          delete planet.films;
          delete planet.url;
          delete planet.created;
          delete planet.edited;
        });
        setPlanets(json.results);
      });
  };

  useEffect(() => fetchPlanetsInfo(), []);

  return (
    <PlanetsContext.Provider
      value={ {
        planets,
        filterByName,
        setFilterName,
        filterByNumericValues: { column, comparison, value },
        setColumn,
        setComparison,
        setValue,
        isNumericFilterActive,
        activateFilter,
        filters,
        setFilters,
      } }
    >
      <div
        className="big-container"
      >
        {children}
      </div>
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
