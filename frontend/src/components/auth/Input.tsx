import React from 'react';
import TextField from "@mui/material/TextField";

interface InputProperties {
    name: string;
    label: string; 
    handleChange: any
    autoFocus?: boolean;
    type: string;
}

const Input = ({name, label, handleChange, autoFocus, type}: InputProperties) => {
    return (
        <TextField  
            margin="normal"
            required
            fullWidth
            id={name}
            name={name}
            label={label}
            onChange={handleChange}
            variant="standard"
            autoFocus={autoFocus}
            type={type}
        />
    )
}

export default Input