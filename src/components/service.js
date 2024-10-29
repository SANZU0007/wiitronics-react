// service.js
import axios from 'axios';

// Function to fetch employee data


const ApiUrl = "https://wiitronics-user-api.onrender.com/"

export const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${ApiUrl}employees`)
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};


export const EditEmployees = async (data, id) => {
    try {
      const response = await axios.put(`${ApiUrl}employees/${id}`, data); // Use PUT to update employee data
      return response.data; // Return the updated employee data
    } catch (err) {
      throw new Error(err.message); // Handle errors
    }
  };


  export const PostEmployees = async (data) => {
    try {
      const response = await axios.post(`${ApiUrl}employees/`, data); // Use PUT to update employee data
      return response.data; // Return the updated employee data
    } catch (err) {
      throw new Error(err.message); // Handle errors
    }
  };



  export const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${ApiUrl}departments`)
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  export const fetchDepartmentsPost = async (data) => {
    try {
      const response = await axios.post(`${ApiUrl}departments` ,data)
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  export const fetchDepartmentsEdit = async (data ,id) => {
    try {
      const response = await axios.put(`${ApiUrl}departments/${id}` ,data)
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  };


 export const employeeData = [
    { id: 1, name: 'Arun Kumar', department: 'HR', phone: '123-456-7890', date: '2024-10-24', inTime: '09:00', outTime: '17:00' },
    { id: 2, name: 'Lakshmi Priya', department: 'Finance', phone: '234-567-8901', date: '2024-10-25', inTime: '09:15', outTime: '17:10' },
    { id: 3, name: 'Karthik Subramanian', department: 'Engineering', phone: '345-678-9012', date: '2024-10-26', inTime: '08:50', outTime: '17:20' },
    { id: 4, name: 'Anitha Rajan', department: 'Marketing', phone: '456-789-0123', date: '2024-10-26', inTime: '09:05', outTime: '17:00' },
    { id: 5, name: 'Venkatesh Iyer', department: 'Sales', phone: '567-890-1234', date: '2024-10-27', inTime: '09:10', outTime: '18:00' },
    { id: 6, name: 'Priya Shankar', department: 'IT', phone: '678-901-2345', date: '2024-10-27', inTime: '08:55', outTime: '17:30' },
    { id: 7, name: 'Rajesh Ram', department: 'Finance', phone: '789-012-3456', date: '2024-10-28', inTime: '09:20', outTime: '17:45' },
    { id: 8, name: 'Meenakshi Arumugam', department: 'HR', phone: '890-123-4567', date: '2024-10-28', inTime: '09:00', outTime: '17:00' },
    { id: 9, name: 'Vigneshwaran', department: 'Operations', phone: '901-234-5678', date: '2024-10-29', inTime: '08:45', outTime: '17:30' }
  ];
  