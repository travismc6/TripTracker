import { FormControl, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadFile } from '@mui/icons-material';

interface Props {
    onImport: (file: File) => void;
  }

export default function AppDropzone({onImport} : Props) {
  const styles = {
    display: "flex",
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "5px",
    paddingTop: "30px",
    alignItem: "center",
    height: 150,
    width: 500,
    padding: 5
  };

  const active = {
    borderColor: "green",
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: File) => {

        onImport(file);
        // const reader = new FileReader()
  
        // reader.onabort = () => console.log('file reading was aborted')
        // reader.onerror = () => console.log('file reading has failed')
        // reader.onload = () => {
        // // Do whatever you want with the file contents
        //   const binaryStr = reader.result
        //   console.log(binaryStr)
        // }
        // reader.readAsArrayBuffer(file)
      })
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
        <FormControl style={isDragActive ? {...styles, ...active} : styles } >
            <input {...getInputProps()} />
            <UploadFile sx={{fontSize: '100px', color: isDragActive ? 'green' : 'darkgray'  }} />
            <Typography variant='h4' >Click or drop image here</Typography>
        </FormControl>
    </div>
  );
}
