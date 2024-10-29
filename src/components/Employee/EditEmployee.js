import React, { useState, useEffect } from 'react';
import { TextField, Button, CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { EditEmployees } from '../service';

export const EditEmployee = ({ selectedEmployee, onSave, handleCloseEditDialog, GetEmployees }) => {
  const [editedEmployee, setEditedEmployee] = useState(selectedEmployee);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setEditedEmployee(selectedEmployee);
    setError('');
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

  const handleSave = async () => {
    // Validate required fields
    if (
      !editedEmployee.name ||
      !editedEmployee.aadhaarNumber ||
      !editedEmployee.photo ||
      !editedEmployee.aadhaarProof ||
      !editedEmployee.address ||
      !editedEmployee.email ||
      !editedEmployee.phone ||
      !editedEmployee.department ||
      !editedEmployee.dateOfBirth ||
      !editedEmployee.gender
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await EditEmployees(editedEmployee, selectedEmployee.id);
      GetEmployees();
      handleCloseEditDialog();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      {loading && <CircularProgress />}
      <TextField
        label="Name"
        name="name"
        value={editedEmployee.name || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Aadhaar Number"
        name="aadhaarNumber"
        value={editedEmployee.aadhaarNumber || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    
      <TextField
        label="Aadhaar Proof URL"
        name="aadhaarProof"
        value={editedEmployee.aadhaarProof || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        name="address"
        value={editedEmployee.address || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={editedEmployee.email || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        name="phone"
        value={editedEmployee.phone || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {/* Department Select Box */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Department</InputLabel>
        <Select
          name="department"
          value={editedEmployee.department || ''}
          onChange={handleChange}
          label="Department"
        >
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
          <MenuItem value="Human Resources">Human Resources</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
          {/* Add more departments as needed */}
        </Select>
      </FormControl>

      {/* Date of Birth Input */}
      <TextField
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        value={editedEmployee.dateOfBirth || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* Gender Select Box */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Gender</InputLabel>
        <Select
          name="gender"
          value={editedEmployee.gender || ''}
          onChange={handleChange}
          label="Gender"
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      <div style={{ marginTop: '20px' }}>
        <Button onClick={handleSave} color="primary" variant="contained" disabled={loading}>Save</Button>
        <Button onClick={handleCloseEditDialog} color="secondary" variant="outlined" style={{ marginLeft: '10px' }}>Cancel</Button>
      </div>
    </div>
  );
};
