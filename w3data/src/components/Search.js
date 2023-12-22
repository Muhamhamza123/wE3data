import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/search.css';
import { useParams } from 'react-router-dom';
import MetadataDownload from '../global-components/filtereddata';
import DataDownload from '../global-components/csvdata';



import {
  fetchMeasurements,
  fetchFields,
  searchData,
  deleteData,
  MyMetadata,
} from '../api-services/searchService';
function Search() {
  const { username } = useParams();
    const [measurements, setMeasurements] = useState([]);
    const [selectedMeasurement, setSelectedMeasurement] = useState('');
    const [fields, setFields] = useState([]);
    const [selectedFields, setSelectedFields] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [dataCreator, setDataCreator] = useState('');
    const [location, setlocation] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [metadata, setMetadata] = useState([]);
    const [filteredMetadata, setFilteredMetadata] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState("");   


  useEffect(() => {
    fetchMeasurements(setMeasurements);
  }, [setMeasurements]);

  const handleMetadata = () => {
    MyMetadata(projectName, setMetadata, setFilteredMetadata, selectedVersion, toast);
  };

  const handleMeasurementChange = (event) => {
    const selectedMeasurement = event.target.value;
    setSelectedMeasurement(selectedMeasurement);
    if (selectedMeasurement) {
      fetchFields(selectedMeasurement, setFields);
    } else {
      setFields([]);
    }
  };

  const handleVersionChange = (event) => {
    const selectedVersion = event.target.value;
    setSelectedVersion(selectedVersion);
    const filteredMetadata = metadata.filter((item) => item.version === selectedVersion);
    setFilteredMetadata(filteredMetadata);
  };

  const handleFieldChange = (event) => {
    const selectedField = event.target.value;
    if (event.target.checked) {
      setSelectedFields([...selectedFields, selectedField]);
    } else {
      setSelectedFields(selectedFields.filter((field) => field !== selectedField));
    }
  };

  const handleprojectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleDataCreatorChange = (event) => {
    setDataCreator(event.target.value);
  };

  const handlelocationChange = (event) => {
    setlocation(event.target.value);
  };

  const handleSearch = () => {
    searchData(
      selectedMeasurement,
      selectedFields,
      projectName,
      location,
      dataCreator,
      startDate,
      endDate,
      setSearchResults,
      toast
    );
  };

  const handleDelete = () => {
    deleteData(username, selectedMeasurement, startDate, endDate, dataCreator, location, toast);
  };


  return (
    <div style={{ width: '80%', height: 'fit-content', marginLeft: '15%', marginBottom: '50px' }}>
      <div>
        {/* ... (existing code) */}
        <ToastContainer
          position="top-center"
          autoClose={5000} // Adjust the autoClose duration as needed
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <div className='search_main_container'>
        <div className='child_one'>
          <label htmlFor="measurementSelect">Select a Measurement:</label>
          <select id="measurementSelect" value={selectedMeasurement} onChange={handleMeasurementChange}>
            <option value="">-- Select Measurement --</option>
            {measurements.map((measurement, index) => (
              <option key={index} value={measurement}>
                {measurement}
              </option>
            ))}
          </select>
          <div className='feilds_search'>
            <label >Select Fields:</label>
            {fields.map((field, index) => (
              <div key={index}>
                <label>
                  <input
                    className=''
                    type="checkbox"
                    name='feilds'
                    value={field}
                    checked={selectedFields.includes(field)}
                    onChange={handleFieldChange}
                    id={`fieldCheckbox_${index}`} // Add unique id
                  />
                  {field}
                </label>
              </div>
            ))}
          </div>
          <label htmlFor="locationInput">Location:</label>
          <input
            id="locationInput" // Add unique id
            className='searc_data_input'
            type="text"
            value={location}
            onChange={handlelocationChange}
            placeholder="Enter Location"
          />
        </div>
  
        <div className='child_two'>
          <label htmlFor="projectNameInput">Project Name:</label>
          <input
            id="projectNameInput" // Add unique id
            className='searc_data_input'
            type="text"
            value={projectName}
            onChange={handleprojectNameChange}
            placeholder="Enter Project Name"
          />
          <label htmlFor='start-date'>Start Date:</label>
          <DatePicker
            className='start_date searc_data_input'
            id='start-date'
            selected={startDate}
            onChange={date => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm:ss"
          />
          <label htmlFor='end-date'>End Date:</label>
          <DatePicker
            className='searc_data_input'
            id='end-date'
            selected={endDate}
            onChange={date => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm:ss"
          />
          <label htmlFor="dataCreatorInput">Data Creator:</label>
          <input
            id="dataCreatorInput" // Add unique id
            className='searc_data_input'
            type="text"
            value={dataCreator}
            onChange={handleDataCreatorChange}
            placeholder="Enter Data Creator"
          />
          <button className='search_submit' onClick={handleSearch}>Search</button>
          <button className='delete_submit' onClick={handleDelete}>Delete Data</button>
        </div>
      </div>
  
      <div className='results_container'>
  
        <div className='seacrh_metadata-container'>
          <h1>Metadata Details</h1>
          <button className='fetch_meta_data' onClick={handleMetadata}><span>Click here to fetch</span> Metadata</button>
  
          <label htmlFor="versionSelect">Select Version:</label>
          <select id="versionSelect" name="get-versions" onChange={handleVersionChange}>
            <option value="">All Versions</option>
            {[...new Set(metadata.map(item => item.version))].map((version, index) => (
              <option key={index} value={version}>
                {version}
              </option>
            ))}
          </select>
          {filteredMetadata.map((item, index) => (
            <div key={index}>
              {filteredMetadata.length > 0 && (
                <MetadataDownload filteredMetadata={filteredMetadata} selectedVersion={selectedVersion} />
              )}
              {Object.entries(item).map(([key, value]) => (
                <div key={key}>
                  <h2>{key}</h2>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className='seacrh_influxdb_container'>
          <h1>InfluxDB Data</h1>
          <table className="data-table">
            <thead>
              <tr>
                {searchResults.length > 0 &&
                  Object.keys(searchResults[0]).map((key) => <th key={key}>{key}</th>)}
              </tr>
            </thead>
            <tbody>
              <DataDownload searchResults={searchResults} />
              {searchResults.map((row, index) => (
                <div>
                  <tr key={index}>
                    {Object.values(row).map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}
                  </tr>
                </div>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
}

export default Search;
