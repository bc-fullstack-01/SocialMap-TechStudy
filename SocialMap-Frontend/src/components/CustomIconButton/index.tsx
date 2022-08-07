import React, { ReactElement } from "react";
import { IconButton } from "@mui/material";

interface Props {
    children: ReactElement, 
    label: string, 
    onCLickCallback: any
}

const CustomIconButton = ({ children, label, onCLickCallback }: Props) => {
    return (
        <IconButton 
            size="large"
            aria-label={label}
            color="inherit"
            onClick={() => onCLickCallback()}
        >
            {children}                
        </IconButton>
    )
}

export default CustomIconButton;