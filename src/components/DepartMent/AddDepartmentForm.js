import React, { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const AddDepartmentForm = ({ onSubmit, onClose }) => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [description, setDescription] = useState('');

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDepartment && description) {
      onSubmit({ name: selectedDepartment, description });
      setSelectedDepartment('');
      setDescription('');
      onClose();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <FormControl fullWidth margin="normal" required>
        <InputLabel id="department-select-label">Department</InputLabel>
        <Select
          labelId="department-select-label"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
        >
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
          <MenuItem value="Human Resources">Human Resources</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <Box mt={2}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddDepartmentForm;
