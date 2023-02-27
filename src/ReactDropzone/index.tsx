import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components';

const DropRectangle = styled.div`
  border-style: dashed;
  border-radius: 0.25rem;
  border-color: white;
  border-width: 2px;
  display: grid;
  grid-template: "image title file"
                  "image description file"
                  /50px 1fr auto;
  grid-gap: 0.25rem 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;

  & > p {
    margin-top: 0;
    margin-bottom: 0;
  }

  & > .button:hover {
    border-color: #e0e0e0;
    background-color: #3f3f3f;
  }
`;

interface Props {
  onImageUpload: (image: string) => void;
}

export const ReactDropzone: React.FC<Props> = ({ onImageUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onImageUpload(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop, noClick: true, accept: {
      'image/bmp': ['.bmp'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/vnd.wap.wbmp': ['.wbmp'],
      'image/x-smb': ['.smb'],
    }, maxFiles: 1
  });

  return (
    <DropRectangle {...getRootProps()} >
      <input {...getInputProps()} />
      <p style={{ gridArea: "image", margin: 'none', alignSelf: 'center' }}>Image</p>
      <p style={{ gridArea: "title", margin: 'none' }}>Drag & drop image here</p>
      <p style={{ gridArea: "description", margin: 'none' }}>bmp, jpeg, png, wbmp, smb, webp</p>
      <p style={{ gridArea: "file", cursor: 'pointer', alignSelf: 'center' }} className="button" onClick={open}>Choose file</p>
    </DropRectangle>
  )
};
