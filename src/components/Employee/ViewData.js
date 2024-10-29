import React from 'react';
import { Typography, Box } from '@mui/material';

const ViewData = ({ selectedEmployee }) => {
  return (
    <Box sx={{ padding: 3, textAlign: 'center',  }}>
      {selectedEmployee ? (
        <Box>
          {selectedEmployee.photo ? (
            <img
              src={selectedEmployee.photo}
              alt={`${selectedEmployee.name}'s photo`}
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: 2 }}
            />
          ) : (
            <Typography variant="body2" color="textSecondary">No photo available</Typography>
          )}
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Name: {selectedEmployee.name}</Typography>
          <Typography variant="body2">Aadhaar: {selectedEmployee.aadhaarNumber}</Typography>
          <Typography variant="body2">Email: {selectedEmployee.email}</Typography>
          <Typography variant="body2">Phone: {selectedEmployee.phone}</Typography>
          <Typography variant="body2">Department: {selectedEmployee.department}</Typography>
          <Typography variant="body2">Date of Birth: {selectedEmployee.dateOfBirth}</Typography>
          <Typography variant="body2">Gender: {selectedEmployee.gender}</Typography>
        </Box>
      ) : (
        <Typography variant="body2" color="textSecondary">No employee selected</Typography>
      )}
    </Box>
  );
};

export default ViewData;
