import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import Navbar from './navbar.js';
import './App.css';
import './output.css';

function App() {
  const [data, setData] = useState([]); // Store the original data
  const [filteredData, setFilteredData] = useState([]); // Store the filteredData
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog box visibility
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    minRevenue: '',
    maxRevenue: '',
    minNetIncome: '',
    maxNetIncome: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [sortConfig, setSortConfig] = useState({
    key: '', // Key to sort by (date, revenue, netIncome)
    direction: 'asc', // Sort direction (asc or desc)
  });

  const API_KEY = process.env.REACT_APP_FAPI_KEY;

  useEffect(() => {
    axios
      .get(
        `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${API_KEY}`
      )
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to load data. Please try again later.');
      })
  }, []);

  const toggleDialog = () => {
    if (isDialogOpen) {
      // Reset filter inputs
      setFilter({
        startDate: '',
        endDate: '',
        minRevenue: '',
        maxRevenue: '',
        minNetIncome: '',
        maxNetIncome: '',
      });
    }
    setIsDialogOpen(!isDialogOpen);
  };

  const applyFilters = () => {

    // Validation for filter inputs
    if (filter.startDate && !/^\d{4}$/.test(filter.startDate)) {
      alert("Start Date must be a valid year (e.g., 2023).");
      return;
    }

    if (filter.endDate && !/^\d{4}$/.test(filter.endDate)) {
      alert("End Date must be a valid year (e.g., 2023).");
      return;
    }

    if (filter.startDate && filter.endDate && parseInt(filter.startDate) > parseInt(filter.endDate)) {
      alert("Start Date cannot be greater than End Date.");
      return;
    }

    if (filter.startDate && !filter.endDate) {
      alert("Please fill both Start Date and End Date.");
      return;
    }

    if (filter.endDate && !filter.startDate) {
      alert("Please fill both Start Date and End Date.");
      return;
    }

    if (
      filter.minRevenue &&
      (isNaN(filter.minRevenue) || parseInt(filter.minRevenue) < 0)
    ) {
      alert("Min Revenue must be a non-negative number.");
      return;
    }

    if (
      filter.maxRevenue &&
      (isNaN(filter.maxRevenue) || parseInt(filter.maxRevenue) < 0)
    ) {
      alert("Max Revenue must be a non-negative number.");
      return;
    }

    if (filter.minRevenue && filter.maxRevenue && parseInt(filter.minRevenue) > parseInt(filter.maxRevenue)) {
      alert("Min Revenue cannot be greater than Max Revenue.");
      return;
    }

    if (filter.minRevenue && !filter.maxRevenue) {
      alert("Please fill both Min Revenue and Max Revenue.");
      return;
    }

    if (filter.maxRevenue && !filter.minRevenue) {
      alert("Please fill both Min Revenue and Max Revenue.");
      return;
    }

    if (
      filter.minNetIncome &&
      (isNaN(filter.minNetIncome) || parseInt(filter.minNetIncome) < 0)
    ) {
      alert("Min Net Income must be a non-negative number.");
      return;
    }

    if (
      filter.maxNetIncome &&
      (isNaN(filter.maxNetIncome) || parseInt(filter.maxNetIncome) < 0)
    ) {
      alert("Max Net Income must be a non-negative number.");
      return;
    }

    if (filter.minNetIncome && filter.maxNetIncome && parseInt(filter.minNetIncome) > parseInt(filter.maxNetIncome)) {
      alert("Min Net Income cannot be greater than Max Net Income.");
      return;
    }

    if (filter.minNetIncome && !filter.maxNetIncome) {
      alert("Please fill both Min Net Income and Max Net Income.");
      return;
    }

    if (filter.maxNetIncome && !filter.minNetIncome) {
      alert("Please fill both Min Net Income and Max Net Income.");
      return;
    }

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

    setFilteredData(filtered);
    toggleDialog();
  };

  

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

  // Change sort icon
  const renderSortIcon = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  // Number formating
  const formatNumber = (num) => {
    if (num >= 1e9) {
      return `$${(num / 1e9).toFixed(1)}B`;
    }
    if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(1)}M`;
    }
    return `$${num.toLocaleString()}`;
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const handleItemsPerPage = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-white min-h-screen bg-pattern-bg">
      <Navbar />
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <header className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-lg p-6 rounded-md flex items-center justify-center mb-6">
        <h1 className="text-3xl font-bold italic text-white">
        Annual income statements of AAPL
        </h1>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg" 
          alt="Apple Logo" 
          className="w-8 h-8 ml-3"
        />
        </header>
        <div className="flex justify-end">
        <button
          onClick={toggleDialog}
          className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white px-6 py-2 rounded-full mb-6 flex items-center space-x-2 hover:from-blue-600 hover:to-blue-400 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.5 4.75A.75.75 0 013.25 4h13.5a.75.75 0 01.53 1.28l-4.72 5.1v3.87a.75.75 0 01-.22.53l-3 3a.75.75 0 01-1.28-.53v-6.47l-4.72-5.1a.75.75 0 01.47-1.28z" />
          </svg>
          Filter Data
        </button>
        </div>

        {/* Dialog box */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Filter Options</h3>
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
          <table className="table-auto w-full border-collapse shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th
                  className="border px-6 py-3 text-left text-sm font-semibold cursor-pointer"
                  onClick={() => sortData('date')}
                >
                  <div className="flex items-center">
                    Date
                    {renderSortIcon('date')}
                  </div>
                </th>
                <th
                  className="border px-6 py-3 text-left text-sm font-semibold cursor-pointer"
                  onClick={() => sortData('revenue')}
                >
                  <div className="flex items-center">
                    Revenue
                    {renderSortIcon('revenue')}
                  </div>
                </th>
                <th
                  className="border px-6 py-3 text-left text-sm font-semibold cursor-pointer"
                  onClick={() => sortData('netIncome')}
                >
                  <div className="flex items-center">
                    Net Income
                    {renderSortIcon('netIncome')}
                  </div>
                </th>
                <th className="border px-6 py-3 text-left text-sm font-semibold">
                  Gross Profit
                </th>
                <th className="border px-6 py-3 text-left text-sm font-semibold">
                  EPS (Earnings Per Share)
                </th>
                <th className="border px-6 py-3 text-left text-sm font-semibold">
                  Operating Income
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No data matches your filter criteria.
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-blue-50 transition duration-300`}
                  >
                    <td className="border px-6 py-4 text-sm text-gray-700 font-medium">{item.date}</td>
                    <td className="border px-6 py-4 text-sm text-gray-700">
                      {item.revenue.toLocaleString()} <span className="font-medium">({formatNumber(item.revenue)})</span>
                    </td>
                    <td className="border px-6 py-4 text-sm text-gray-700">
                      {item.netIncome.toLocaleString()} <span className="font-medium">({formatNumber(item.netIncome)})</span>
                    </td>
                    <td className="border px-6 py-4 text-sm text-gray-700">
                      {item.grossProfit.toLocaleString()} <span className="font-medium">({formatNumber(item.grossProfit)})</span>
                    </td>
                    <td className="border px-6 py-4 text-sm text-gray-700">${item.eps}</td>
                    <td className="border px-6 py-4 text-sm text-gray-700">
                      {item.operatingIncome.toLocaleString()} <span className="font-medium">({formatNumber(item.operatingIncome)})</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                ◀
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => goToPage(number)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === number
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
