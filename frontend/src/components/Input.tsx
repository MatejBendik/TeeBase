import TextField from "@mui/material/TextField";

interface InputProperties {
  name: string;
  label: string;
  handleChange: any;
  value: string;
  autoFocus?: boolean;
  type: string;
}

const Input = ({
  name,
  label,
  handleChange,
  value,
  autoFocus,
  type,
}: InputProperties) => {
  return (
    <TextField
      className="input"
      margin="normal"
      required
      fullWidth
      id={name}
      name={name}
      label={label}
      onChange={handleChange}
      value={value}
      variant="standard"
      autoFocus={autoFocus}
      type={type}
      autoComplete="on"
    />
  );
};

export default Input;
