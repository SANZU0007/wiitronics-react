import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const AddDepartmentForm = ({ onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description) {
      onSubmit({ name, description });
      setName('');
      setDescription('');
      onClose();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

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
