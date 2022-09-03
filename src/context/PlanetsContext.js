import React from 'react';

const PlanetsContext = React.createContext({
  planets: [],
  filterByName: '',
  filterByNumericValues: {},
  filters: [],
});

export default PlanetsContext;
