import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Uploadform.css';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  
  const [dataCreator, setDataCreator] = useState('');
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [dateGenerated, setDateGenerated] = useState('');
  
  const [measurementNames, setMeasurementNames] = useState([]);
  const [selectedMeasurement, setSelectedMeasurement] = useState('');
  // Additional state variables

  const [abstract, setAbstract] = useState('');
  const [dataOwner, setDataOwner] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [orcidId, setOrcidId] = useState('');
  const [otherContributors, setOtherContributors] = useState('');
  const [fundingInformation, setFundingInformation] = useState('');
  const [dataLicense, setDataLicense] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('');
  const [sensorMakeAndType, setSensorMakeAndType] = useState('');
  const [sensorAccuracy, setSensorAccuracy] = useState('');
  const [samplingMethod, setSamplingMethod] = useState('');
  const [relatedPublication, setRelatedPublication] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');


  useEffect(() => {
    axios
      .get('http://localhost:5000/measurements')
      .then((response) => {
        setMeasurementNames(response.data);
      })
      .catch((error) => {
        toast.error('Error fetching measurements:', error);
      });
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !selectedMeasurement) {
      toast.error('Please select a file and a measurement');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('dataCreator', dataCreator);
    formData.append('projectName', projectName);
    formData.append('location', location);
    formData.append('dateGenerated', dateGenerated);
    formData.append('selectedMeasurement', selectedMeasurement);
    formData.append('abstract', abstract);
    formData.append('dataOwner', dataOwner);
    formData.append('contactEmail', contactEmail);
    formData.append('orcidId', orcidId);
    formData.append('otherContributors', otherContributors);
    formData.append('fundingInformation', fundingInformation);
    formData.append('dataLicense', dataLicense);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('timeZone', timeZone);
    formData.append('unitOfMeasurement', unitOfMeasurement);
    formData.append('sensorMakeAndType', sensorMakeAndType);
    formData.append('sensorAccuracy', sensorAccuracy);
    formData.append('samplingMethod', samplingMethod);
    formData.append('relatedPublication', relatedPublication);
    formData.append('additionalNotes', additionalNotes);
   

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    
      toast.success(response.data.message || 'An error occurred');
    } catch (error) {
      toast.error('An error occurred');
    }
    
    
  };

  return (
    <div style={{ width: '80%', float:'right',marginBottom:'50px'}}>
    <div style={{ width: '60%',  textAlign: 'left',marginInline:'auto',float:'right' }}>
      <h1>Upload Data :</h1>
   
      <form className='Uplaod-form' onSubmit={handleSubmit}>
      <label style={{ padding:'0px 0px 0px 15px'}}>Abstract:</label>
      <br></br>
      <textarea
      style={{  }}
      placeholder="Abstract"
      value={abstract}
      onChange={(e) => setAbstract(e.target.value)}
/>
      <div className='Uplaod-form-div'>


      <div>
     
        <label>Select a Measurement:</label>
        <select value={selectedMeasurement} onChange={(e) => setSelectedMeasurement(e.target.value)}>
          <option value=""> -- Select Measurement --</option>
          {measurementNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>   

 <label>Uplaod file:</label>
  <input type="file" onChange={handleFileChange} />


        <label>Data Creator:</label>
        <input
          type="text"
          placeholder="Data Creator"
          value={dataCreator}
          onChange={(e) => setDataCreator(e.target.value)}
        />
<label>Project Name:</label>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <label>Location:</label>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label>Date Generated:</label>
        <input
          type="text"
          placeholder="Date Generated"
          value={dateGenerated}
          onChange={(e) => setDateGenerated(e.target.value)}
        />        
       
        {/* New input fields for additional metadata */}
       
        <label>Data Owner:</label>
        <input type="text" placeholder="Data Owner" value={dataOwner} onChange={(e) => setDataOwner(e.target.value)} />
        <label>Contact Email</label>
        <input type="text" placeholder="Contact Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
        <label>ORCID ID:</label>
        <input type="text" placeholder="ORCID ID" value={orcidId} onChange={(e) => setOrcidId(e.target.value)} />
        <label>Co-ordinates Format:</label>
        <input type="text" placeholder="Co-ordinates Format:" value={orcidId} onChange={(e) => setOrcidId(e.target.value)} /> 
        <label>Other Contributors:</label>
        <input type="text" placeholder="Other Contributors" value={otherContributors} onChange={(e) => setOtherContributors(e.target.value)} />
      </div>


      <div> 
        <label>Funding Information:</label>
        <input type="text" placeholder="Funding Information" value={fundingInformation} onChange={(e) => setFundingInformation(e.target.value)} />

      <label>Data License:</label>
        <select
                  value={dataLicense}
             onChange={(e) => setDataLicense(e.target.value)} >
                                                             
          <option value="">-- Select Data License --</option>
          <option value="License Option 1">License Option 1</option>
          <option value="License Option 2">License Option 2</option>
          <option value="License Option 3">License Option 3</option>
          {/* Add more license options as needed */}
          </select>
          <label>Latitude:</label>
        <input type="text" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
        <label>Longitude:</label>
        <input type="text" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        <label>Time Zone:</label>
        <input type="text" placeholder="Time Zone" value={timeZone} onChange={(e) => setTimeZone(e.target.value)} />
        <label>Unit of Measurement:</label>
        <input type="text" placeholder="Unit of Measurement" value={unitOfMeasurement} onChange={(e) => setUnitOfMeasurement(e.target.value)} />
        <label>Sensor Make and Type</label>
        <input type="text" placeholder="Sensor Make and Type" value={sensorMakeAndType} onChange={(e) => setSensorMakeAndType(e.target.value)} />
        <label>Sensor Accuracy:</label>
        <input type="text" placeholder="Sensor Accuracy" value={sensorAccuracy} onChange={(e) => setSensorAccuracy(e.target.value)} />
        <label>Sampling Method:</label>
        <input type="text" placeholder="Sampling Method" value={samplingMethod} onChange={(e) => setSamplingMethod(e.target.value)} />
        <label>Related Publication:</label>
        <input type="text" placeholder="Related Publication" value={relatedPublication} onChange={(e) => setRelatedPublication(e.target.value)} />
        <label>Additional Notes:</label>
        <input type="text" placeholder="Additional Notes" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
        <div>
        </div>
        <br></br>
       

  </div>

  </div>

  <div style={{ width: '100%',marginTop: '20px',justifyContent:'center' }}>
          <button className='Upload-form-submit' type="submit">Submit</button>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
    </div>
  );
};

export default UploadForm;
