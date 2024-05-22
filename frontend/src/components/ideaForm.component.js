import React, { useState } from 'react';

const IdeaForm = () => {
  const [ideaName, setIdeaName] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [studentName,setStudentName]=useState('');
  const [studentRollNo,setStudentRollNo]=useState('');
  const [department,setDepartment]=useState('');
  const [pdfFile,setPdfFile]=useState(null)

  const handleIdeaNameChange = (e) => {
    setIdeaName(e.target.value);
  };

  const handleIdeaDescriptionChange = (e) => {
    setIdeaDescription(e.target.value);
  };

  const handleStudentNameChange = (e)=>{
    setStudentName(e.target.value)
  };

  const handleStudentRollNoChange=(e)=>{
    setStudentRollNo(e.target.value)
  };

  const handleDepartmentChange=(e)=>{
    setDepartment(e.target.value)
  }

  const handlePdfFileChange=(e)=>{
    setPdfFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/IdeaForm", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({ ideaName, ideaDescription, studentName, studentRollNo, department, pdfFile}),
      });

      if (!response.ok) {
        throw new Error('Failed to submit idea');
      }

      const data = await response.json();
      alert("Idea submitted successfully")
      console.log(data.message); // Should log 'Idea submitted successfully'

      // Reset the form fields if the idea is successfully submitted
      setIdeaName('');
      setIdeaDescription('');
      setStudentName('')
      setStudentRollNo('')
      setDepartment('')
      setPdfFile(null)
    } catch (error) {
      console.error('Error submitting idea:', error);
      // Handle error state or display error message to the user
    }
  };
  function logOut(){
    alert("Idea submitted successfully OK to Logout")
    window.localStorage.clear()
    window.location.href="./sign-in"
  }

  return (
    <div>
      <h1>Idea Submission Form</h1>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label>Idea Name:</label>
    <input
      type="text"
      className="form-control"
      placeholder="Idea Name"
      value={ideaName}
      onChange={handleIdeaNameChange}
    />
  </div>
  <div className="mb-3">
    <label>Idea Description:</label>
    <input
      type="text"
      className="form-control"
      placeholder="Idea Description"
      value={ideaDescription}
      onChange={handleIdeaDescriptionChange}
    />
  </div>
  <div className="mb-3">
    <label>Student Name:</label>
    <input
      type="text"
      className="form-control"
      placeholder="Student Name"
      value={studentName}
      onChange={handleStudentNameChange}
    />
  </div>
  <div className="mb-3">
    <label>Student Roll No:</label>
    <input
      type="text"
      className="form-control"
      placeholder="Student Roll No"
      value={studentRollNo}
      onChange={handleStudentRollNoChange}
    />
  </div>
  <div className="mb-3">
    <label>Department:</label>
    <input
      type="text"
      className="form-control"
      placeholder="Department"
      value={department}
      onChange={handleDepartmentChange}
    />
  </div>
  <div className="mb-3">
          <label>Upload PDF:</label>
          <input
            type="file"
            className="form-control"
            accept=".pdf"
            onChange={handlePdfFileChange}
          />
  </div>
  <button onClick={logOut} type="submit" className="btn btn-primary">
    Submit
  </button>
</form>

    </div>
  );
};

export default IdeaForm;
