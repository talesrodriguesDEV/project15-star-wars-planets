import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testing application general behavior', () => {
  it('should filter by name', async () => {
    render(<App />);

    const nameInput = screen.getByTestId('name-filter');
    const alderaan = await screen.findByText('Alderaan');
    userEvent.type(nameInput, 'Tatooine')

    await waitFor(() => expect(alderaan).not.toBeInTheDocument());

    const tableRolls = screen.getAllByRole('row');
    expect(tableRolls.length).toBe(2);
  });

  it('should filter by numeric features (menor que)', async () => {
    render(<App />);

    const alderaan = await screen.findByText('Alderaan');
    expect(alderaan).toBeInTheDocument()
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '2');
    userEvent.click(filterButton);

    const tableRolls = screen.getAllByRole('row');
    expect(tableRolls.length).toBe(3);
  });

  it('should filter by numeric features (maior que)', async () => {
    render(<App />);

    const alderaan = await screen.findByText('Alderaan');
    expect(alderaan).toBeInTheDocument()
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '5000');
    userEvent.click(filterButton);

    const tableRolls = screen.getAllByRole('row');
    expect(tableRolls.length).toBe(2);
  });

  it('should filter by numeric features (igual a)', async () => {
    render(<App />);

    const alderaan = await screen.findByText('Alderaan');
    expect(alderaan).toBeInTheDocument()
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter, '24');
    userEvent.click(filterButton);

    const tableRolls = screen.getAllByRole('row');
    expect(tableRolls.length).toBe(4);
  });

  it('should remove a filter', async () => {
    render(<App />);

    const alderaan = await screen.findByText('Alderaan');
    expect(alderaan).toBeInTheDocument()
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'rotation_period');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter, '24');
    userEvent.click(filterButton);

    const removeButton = screen.getByRole('button', {name: 'X'});
    userEvent.click(removeButton);

    const tableRolls = screen.getAllByRole('row');
    expect(tableRolls.length).toBe(11);
  });
});
