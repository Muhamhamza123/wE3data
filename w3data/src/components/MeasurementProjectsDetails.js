import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import '../styles/MeasurementProjectsDetails.css';
import { fetchData, fetchUserProjects, fetchMeasurementNames } from '../api-services/measurmnets-api-services';

import Metadata from './metadata';


const MeasurementProjectsDetails = () => {
  const { username } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [userProjects, setUserProjects] = useState([]);  
  const [fieldNames, setFieldNames] = useState([]);
  const [measurementNames, setMeasurementNames] = useState([]);
  const [selectedMeasurement, setSelectedMeasurement] = useState('');
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [metadata, setMetadata] = useState([]); // New state for metadata
  const [selectedVersion, setSelectedVersion] = useState(''); // Initialize with an empty string
  const [uniqueVersions, setUniqueVersions] = useState([]);



  useEffect(() => {
    fetchData(username, selectedMeasurement, selectedProject, setData, setFieldNames, setLoading);
  }, [username, selectedMeasurement, selectedProject]);

  useEffect(() => {
    fetchUserProjects(username, setUserProjects, setMetadata, setUniqueVersions);
  }, [username]);

  useEffect(() => {
    fetchMeasurementNames(setMeasurementNames);
  }, []);
  const toggleView = () => {
    setShowTable(!showTable);
  };




  const handleMeasurementSelection = (event) => {
    const selectedMeasurement = event.target.value;
    setSelectedMeasurement(selectedMeasurement);
  };

  const handleProjectSelection = (event) => {
    const selectedProject = event.target.value;
    setSelectedProject(selectedProject);
  };

  const handleVersionSelection = (event) => {
    const version = event.target.value;
    setSelectedVersion(version);
  
  };
  const toggleFieldSelection = (field) => {
    setSelectedFields((prevSelectedFields) =>
      prevSelectedFields.includes(field)
        ? prevSelectedFields.filter((f) => f !== field)
        : [...prevSelectedFields, field]
    );
  };










  
  
    
    


//Table view for influcdb data coming in//////

  const renderTable = () => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return <p>No data available.</p>;
    }

    return (
      <div style={{width:'100%',overflow:'auto',height:'500px',marginBottom:'20px'}}>
         <button className='toggel_button' onClick={toggleView}>
        {showTable ? 'Show Graphs' : 'Show Table'}
      </button>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              {fieldNames.map((fieldName) => (
                <th key={fieldName}>{fieldName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.Time}</td>
                {fieldNames.map((fieldName) => (
                  <td key={fieldName}>{item.Value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };



  //chart view for influxdb data coming in//
  const renderChart = () => {
    if (!data || !Array.isArray(data) || data.length === 0 || selectedFields.length === 0) {
      return <p>No data available.</p>;
    }
    const filteredData = data.filter((item) => selectedFields.includes(item.Field));
    const traceData = selectedFields.map((field) => {
      const fieldData = filteredData.filter((item) => item.Field === field);
      const xData = fieldData.map((item) => item.Time);
      const yData = fieldData.map((item) => item.Value);
      return {
        x: xData,
        y: yData,
        type: 'scatter',
        mode: 'lines+markers',
        name: field,
      };
    });
    const layout = {
      plot_bgcolor: '#27293d',
      paper_bgcolor: '#27293d',
      innerHeight:600,
      xaxis: {
        gridcolor:'rgba(51, 88, 244, 0.3)',
        gridwidth: 0.2,
        title: {
          text: 'Time',
          font: {
            color: '#9a9a9a', // Set x-axis title color to red
          },
        },
        type: 'date',
    
        tickfont: {
          color: '#9a9a9a', // Set x-axis tick color to orange
        },
      },
      yaxis: {
        showgrid: false,
        title: {
          text: 'Values',
          font: {
            color: '#9a9a9a', // Set x-axis title color to red
          },
         },
         tickfont: {
          color: '#9a9a9a', // Set x-axis tick color to orange
        },
      },     
    };

    return (
    <div style={{ }}>
       <button className='toggel_button' onClick={toggleView}>
        {showTable ? 'Show Graphs' : 'Show Table'}
      </button>     
    <Plot  style={{width: '100%'}} data={traceData} layout={layout} />
    </div>
 )};










  return (
<div className="MeasurementProjectsDetails-container"> 
<div className='project_selection'>
<div style={{width:'40%',height:'auto'}} >
<h2>Select a Project</h2>
<div>
  <select id='selectprojects' aria-label="selectprojects" onChange={handleProjectSelection}>
    <option value="">Select a project</option>
    {userProjects.map((project, index) => (
      <option key={index} value={project.project_name}>
        {project.project_name}
      </option>
    ))}
  </select>
</div>

{selectedProject && (
  <div>
    <div className='project_description_section'>
    <h3>Project Description</h3>
    <p>{userProjects.find((project) => project.project_name === selectedProject)?.project_description}</p>
    </div>
    <div>
  <h2>Meta Data For The Project</h2>
  <select id='select_project_metadata' aria-label="select_project_metadata" onChange={handleVersionSelection}>
    <option value="">Select a version</option>
    {/* Render options based on unique versions */}
    {uniqueVersions.map((version, index) => (
      <option key={index} value={version}>
        {version}
      </option>
      
    ))}
  </select>  
</div>
  </div>
)}
     </div>
     <div style={{width:'40%',height:'auto'}} >
     <div>
        <h2>Measurement Names</h2>
        <select id='Measurementname' aria-label="Measurementname" onChange={handleMeasurementSelection}>
          <option value="">Select a measurement</option>
          {measurementNames.map((measurement, index) => (
            <option key={index} value={measurement}>
              {measurement}
            </option>
          ))}
        </select>
      </div>         
      <div style={{marginTop:'20px'}}>
        {fieldNames.map((fieldName) => (
         <label key={fieldName}>
            <input
              type="checkbox"
              value={fieldName}
              checked={selectedFields.includes(fieldName)}
              onChange={() => toggleFieldSelection(fieldName)}
            />
            {fieldName}
          </label>
        ))}
      </div>      
     </div>
      {/* Display metadata information */}  
    </div>      
    <div className='metadata_section'>
    <h2>Meta Data For The Project </h2>
    <Metadata metadata={metadata} selectedVersion={selectedVersion} selectedProject={selectedProject} />
    </div>   
    <div className='chart_section'>
    {loading ? (
        <p>Loading data...</p>
      ) : showTable ? (
        <div>
          
          <h2>Table View</h2>
          {renderTable()}
        </div>
      ) : (
        <div style={{width:'100%'}}>
          
          <h2>Chart View</h2>
        {renderChart()}
        </div>
      )}
    </div>
    </div>    
  );
};

export default MeasurementProjectsDetails;