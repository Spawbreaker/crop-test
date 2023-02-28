import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components';

interface DropRectangleProps {
  isCropped?: boolean;
}

const beforeCroppedGridTemplate = `
  "image title file"
  "image description file"
  /50px 1fr auto
`;

const afterCroppedGridTemplate = `
  "image title file"
  /50px 1fr auto
`;

const DropRectangle = styled.div<DropRectangleProps>`
  border-style: dashed;
  border-radius: 0.25rem;
  border-color: white;
  border-width: 2px;
  display: grid;
  grid-template: ${({ isCropped }) => isCropped ? afterCroppedGridTemplate : beforeCroppedGridTemplate};
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

  & > img {
    width: 50px;
    height: 50px;
  }
`;

interface Props {
  onImageUpload: (image: string) => void;
  image?: string;
}

interface DropzoneBeforeUploadProps {
  title: string;
  acceptedFormats: string;
  open: () => void;
}

const DropzoneBeforeUpload: React.FC<DropzoneBeforeUploadProps> = ({
  title, acceptedFormats, open,
}) => (
  <>
    <p style={{ gridArea: "image", margin: 'none', alignSelf: 'center' }}>{
      <span>Image</span>
    }</p>
    <p style={{ gridArea: "title", margin: 'none', alignSelf: 'center' }}>
      {title}
    </p>
    <p style={{ gridArea: "description", margin: 'none' }}>{acceptedFormats}</p>
    <p style={{ gridArea: "file", cursor: 'pointer', alignSelf: 'center' }} className="button" onClick={open}>Choose file</p>
  </>
)

interface DropzoneAfterUploadProps {
  image: string;
  name: string;
}

const DropzoneAfterUpload: React.FC<DropzoneAfterUploadProps> = ({ image, name }) => (
  <>
    <p style={{ gridArea: "image", margin: 'none', alignSelf: 'center' }}>
      <img src={image} style={{ maxWidth: '50px', maxHeight: '50px' }} />
    </p>
    <p style={{ gridArea: "title", margin: 'none', alignSelf: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
      {name}
    </p>
    <p style={{ gridArea: "file", cursor: 'pointer', alignSelf: 'center' }} className="button">...</p>
  </>
)

export const ReactDropzone: React.FC<Props> = ({ onImageUpload, image }) => {
  const [uploadedImageName, setUploadedImageName] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onImageUpload(URL.createObjectURL(acceptedFiles[0]));
    setUploadedImageName(acceptedFiles[0].name);
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
    <DropRectangle {...getRootProps()} isCropped={Boolean(image)}>
      <input {...getInputProps()} />
      {
        image ? <DropzoneAfterUpload image={image} name={uploadedImageName} /> : <DropzoneBeforeUpload title="Drag & drop image here" acceptedFormats="bmp, jpeg, jpg, png, webp, wbmp, smb" open={open} />
      }
    </DropRectangle>
  )
};
