import {
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Box,
    Grid,
    Typography
} from '@mui/material';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordBox = ({ label = 'textBoxLabel', name = 'textBoxName', value = '', error = '', touched = '', margin = "normal", errorMessage = 'Input is required!', showPassword = 'false', handleClickShowPassword, handleMouseDownPassword,...props }) => {

    return (
        <FormControl fullWidth error={error} variant="outlined"  sx={{ marginTop: '15px' }}>
            <InputLabel htmlFor={`input-password-${name}`} required={props?.required}>{label}</InputLabel>
            <OutlinedInput
                id={`input-password-${name}`}
                type={showPassword ? 'text' : 'password'}
                value={value}
                label={label}
                name={name}
                onBlur={props?.onBlur}
                onChange={(e) => {
                    props?.onChange(e);
                }}
                
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="medium"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }
                inputProps={{}}
            />
            {
                touched && errorMessage && (
                    <FormHelperText error id={`input-password-${name}`} sx={{ marginLeft: '5px' }}>
                        {errorMessage}
                    </FormHelperText>
                )
            }
        </FormControl >
    )
}

export default PasswordBox;
