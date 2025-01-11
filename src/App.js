import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import Navbar from './navbar.js';
import './App.css';
import './output.css';

function App() {
  const [data, setData] = useState([]); // Store the original data
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog box visibility
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    minRevenue: '',
    maxRevenue: '',
    minNetIncome: '',
    maxNetIncome: '',
  });

  const [sortConfig, setSortConfig] = useState({
    key: '',  // Key to sort by (date, revenue, netIncome)
    direction: 'asc',  // Sort direction (asc or desc)
  });

  const API_KEY = 'QcugEOGcctEtUxtRKPZmhZU564Evp4AT';

  useEffect(() => {
    axios
      .get(`https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${API_KEY}`)
      .then((response) => {
        setData(response.data); // Set the original data
        setFilteredData(response.data); // Initially set filtered data to all data
      })
      .catch((error) => console.error(error));
  }, []);

  // Function to toggle dialog box
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  // Function to apply filters and update filteredData
  const applyFilters = () => {
    const filtered = data.filter((item) => {
      const isDateInRange =
        (filter.startDate === '' || item.date >= filter.startDate) &&
        (filter.endDate === '' || item.date <= filter.endDate);

      const isRevenueInRange =
        (filter.minRevenue === '' || item.revenue >= parseInt(filter.minRevenue)) &&
        (filter.maxRevenue === '' || item.revenue <= parseInt(filter.maxRevenue));

      const isNetIncomeInRange =
        (filter.minNetIncome === '' || item.netIncome >= parseInt(filter.minNetIncome)) &&
        (filter.maxNetIncome === '' || item.netIncome <= parseInt(filter.maxNetIncome));

      return isDateInRange && isRevenueInRange && isNetIncomeInRange;
    });

    setFilteredData(filtered); // Update the filtered data state
    toggleDialog(); // Close the dialog box
  };

  // Function to sort the data based on the selected column
  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredData(sortedData);
  };

  // Change sort icon based on the current sort configuration
  const renderSortIcon = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Financial Data Filtering App
        </h1>

        {/* Filter Button */}
        <button
          onClick={toggleDialog}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6"
        >
          Filter
        </button>

        {/* Dialog Box */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Filter Options</h3>
              
              {/* Date Range Filter */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-700">Date Range</h4>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Start Date (YYYY)"
                    className="border p-2 w-full"
                    value={filter.startDate}
                    onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="End Date (YYYY)"
                    className="border p-2 w-full"
                    value={filter.endDate}
                    onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Revenue Range Filter */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-700">Revenue Range</h4>
                <div className="flex space-x-4">
                  <input
                    type="number"
                    placeholder="Min Revenue"
                    className="border p-2 w-full"
                    value={filter.minRevenue}
                    onChange={(e) => setFilter({ ...filter, minRevenue: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Max Revenue"
                    className="border p-2 w-full"
                    value={filter.maxRevenue}
                    onChange={(e) => setFilter({ ...filter, maxRevenue: e.target.value })}
                  />
                </div>
              </div>

              {/* Net Income Range Filter */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-700">Net Income Range</h4>
                <div className="flex space-x-4">
                  <input
                    type="number"
                    placeholder="Min Net Income"
                    className="border p-2 w-full"
                    value={filter.minNetIncome}
                    onChange={(e) => setFilter({ ...filter, minNetIncome: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Max Net Income"
                    className="border p-2 w-full"
                    value={filter.maxNetIncome}
                    onChange={(e) => setFilter({ ...filter, maxNetIncome: e.target.value })}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={toggleDialog}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={applyFilters}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th
                  className="border px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                  onClick={() => sortData('date')}
                >
                  <div className="flex items-center">
                    Date
                    {renderSortIcon('date')}
                  </div>
                </th>
                <th
                  className="border px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                  onClick={() => sortData('revenue')}
                >
                  <div className="flex items-center">
                    Revenue
                    {renderSortIcon('revenue')}
                  </div>
                </th>
                <th
                  className="border px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                  onClick={() => sortData('netIncome')}
                >
                  <div className="flex items-center">
                    Net Income
                    {renderSortIcon('netIncome')}
                  </div>
                </th>
                <th className="border px-6 py-3 text-left text-sm font-semibold text-gray-700">Gross Profit</th>
                <th className="border px-6 py-3 text-left text-sm font-semibold text-gray-700">EPS (Earnings Per Share)</th>
                <th className="border px-6 py-3 text-left text-sm font-semibold text-gray-700">Operating Income</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">No data matches your filter criteria.</td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                  >
                    <td className="border px-6 py-4 text-sm text-gray-600">{item.date}</td>
                    <td className="border px-6 py-4 text-sm text-gray-600">{item.revenue.toLocaleString()}</td>
                    <td className="border px-6 py-4 text-sm text-gray-600">{item.netIncome.toLocaleString()}</td>
                    <td className="border px-6 py-4 text-sm text-gray-600">{item.grossProfit.toLocaleString()}</td>
                    <td className="border px-6 py-4 text-sm text-gray-600">{item.eps}</td>
                    <td className="border px-6 py-4 text-sm text-gray-600">{item.operatingIncome.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
