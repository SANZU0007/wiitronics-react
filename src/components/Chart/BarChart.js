import React, { useEffect, useState } from 'react';
import { fetchEmployees } from '../service';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const BarChartComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getEmployees = async () => {
        try {
            const data = await fetchEmployees();
            setEmployees(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEmployees();
    }, []);

    // Count employees by age group
    const ageGroups = {
        "20-30": 0,
        "30-40": 0,
        "40-50": 0,
        "50-60": 0,
        "60+": 0
    };

    employees.forEach(employee => {
        const age = new Date().getFullYear() - new Date(employee.dateOfBirth).getFullYear();
        if (age >= 20 && age < 30) {
            ageGroups["20-30"]++;
        } else if (age >= 30 && age < 40) {
            ageGroups["30-40"]++;
        } else if (age >= 40 && age < 50) {
            ageGroups["40-50"]++;
        } else if (age >= 50 && age < 60) {
            ageGroups["50-60"]++;
        } else if (age >= 60) {
            ageGroups["60+"]++;
        }
    });

    // Transform data for the chart
    const chartData = Object.keys(ageGroups).map(group => ({
        name: group,
        value: ageGroups[group]
    }));

    return (
        <div style={{padding:"20px"}}> 
            <h3>Number of Employees by Age Group</h3>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <BarChart width={600} height={300} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 20]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            )}
        </div>
    );
};

export default BarChartComponent;
