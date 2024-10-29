import React, { useState } from 'react';
import { TextField, Button, DialogContent, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { PostEmployees } from '../service'; // Ensure the correct path for your service
import PhotoUpload from './PhtoUrl';


const PostEmployee = ({ GetEmployees, handlePostDialogClose }) => {
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    aadhaarNumber: '',
    photo: '', // Base64 photo string
    aadhaarProof: '',
    address: '',
    email: '',
    phone: '',
    department: '',
    dateOfBirth: '',
    gender: '',
  });

  const [errors, setErrors] = useState({}); // To hold validation errors

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when user types
  };

  const handlePhotoChange = (photo) => {
    setNewEmployee({ ...newEmployee, photo });
  };

  console.log(newEmployee)

  const validateForm = () => {
    const newErrors = {};
    Object.keys(newEmployee).forEach((key) => {
      if (!newEmployee[key]) {
        newErrors[key] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // Validate before submitting

    try {
      await PostEmployees(newEmployee); // Call the function to post new employee data
      GetEmployees(); // Refresh the employee list
      handlePostDialogClose(); // Close the dialog
    } catch (err) {
      console.error(err.message); // Handle error
    }
  };

  return (
    <DialogContent>
      <TextField
        label="Name"
        name="name"
        value={newEmployee.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
        error={Boolean(errors.name)}
        helperText={errors.name}
      />
      <TextField
        label="Aadhaar Number"
        name="aadhaarNumber"
        value={newEmployee.aadhaarNumber}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
        error={Boolean(errors.aadhaarNumber)}
        helperText={errors.aadhaarNumber}
      />
     
     

      <TextField
        label="Aadhaar Proof URL"
        name="aadhaarProof"
        value={newEmployee.aadhaarProof}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
        error={Boolean(errors.aadhaarProof)}
        helperText={errors.aadhaarProof}
      />
      <TextField
        label="Address"
        name="address"
        value={newEmployee.address}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
        error={Boolean(errors.address)}
        helperText={errors.address}
      />
      <TextField
        label="Email"
        name="email"
        value={newEmployee.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
        error={Boolean(errors.email)}
        helperText={errors.email}
      />
      <TextField
        label="Phone Number"
        name="phone"
        value={newEmployee.phone}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        required
        error={Boolean(errors.phone)}
        helperText={errors.phone}
      />

      {/* Department Select Box */}
      <FormControl fullWidth margin="normal" required error={Boolean(errors.department)}>
        <InputLabel>Department</InputLabel>
        <Select
          name="department"
          value={newEmployee.department}
          onChange={handleInputChange}
          label="Department"
        >
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
          <MenuItem value="Human Resources">Human Resources</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
          {/* Add more departments as needed */}
        </Select>
        {errors.department && <FormHelperText>{errors.department}</FormHelperText>}
      </FormControl>

      {/* Date of Birth Input */}
      <TextField
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        value={newEmployee.dateOfBirth}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        required
        error={Boolean(errors.dateOfBirth)}
        helperText={errors.dateOfBirth}
      />

      {/* Gender Select Box */}
      <FormControl fullWidth margin="normal" required error={Boolean(errors.gender)}>
        <InputLabel>Gender</InputLabel>
        <Select
          name="gender"
          value={newEmployee.gender}
          onChange={handleInputChange}
          label="Gender"
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>

      

        {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}

        <PhotoUpload setPhoto={handlePhotoChange} />
      </FormControl>

      <div style={{ marginTop: '20px' }}>
        <Button onClick={handleSubmit} color="primary" variant="contained">Add Employee</Button>
        <Button onClick={handlePostDialogClose} color="secondary" variant="outlined" style={{ marginLeft: '10px' }}>Cancel</Button>
      </div>
    </DialogContent>
  );
};

export default PostEmployee;
