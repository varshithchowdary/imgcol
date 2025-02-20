import React, { useState } from 'react';
import './App.css';
import userIcon from './user-icon.png'; // Ensure you have this image in your project

function App() {
  const [selectedModel, setSelectedModel] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
    setResultImage(null);
  };

  const handleSubmit = () => {
    if (uploadedImage) {
      setIsLoading(true);
      // Simulating processing time
      setTimeout(() => {
        setResultImage(uploadedImage);
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'result_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-item">Model</div>
        <img src={userIcon} alt="User" className="user-icon" />
      </nav>
      <div className="content-container">
        <div className="box">
          <div className="upload-area">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="imageUpload"
            />
            <label htmlFor="imageUpload" className="upload-label">
              {uploadedImage ? 'Change Image' : 'Click or drag to upload image'}
            </label>
            {uploadedImage && (
              <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
            )}
          </div>
          <div className="options-container">
            <select
              className="select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              <option value="">Select Model</option>
              <option value="model1">Model 1</option>
              <option value="model2">Model 2</option>
              <option value="model3">Model 3</option>
            </select>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
          </div>
          {uploadedImage && (
            <button className="delete-button" onClick={handleDeleteImage}>Delete Image</button>
          )}
        </div>
        <div className="box">
          <div className="result-container">
            {isLoading ? (
              <div className="loader"></div>
            ) : resultImage ? (
              <img src={resultImage} alt="Result" className="result-image" />
            ) : (
              <p className="result-placeholder">Result will appear here</p>
            )}
          </div>
          {resultImage && (
            <div className="result-actions">
              <button className="download-button" onClick={handleDownload}>Download</button>
              <button className="delete-button" onClick={() => setResultImage(null)}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
