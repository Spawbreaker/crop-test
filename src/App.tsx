import React, { useEffect, useState } from "react";
import { ReactAdvancedCropper } from "./ReactAdvancedCropper/ReactAdvancedCropper";
import { ReactDropzone } from "./ReactDropzone";

const App: React.FC = () => {
  const [image, setImage] = useState<string>();
  const [croppedImage, setCroppedImage] = useState<string>();
  const [croppedCanvas, setCroppedCanvas] = useState<HTMLCanvasElement>();

  const onCropCanvas = (canvas: HTMLCanvasElement) => {
    setCroppedImage(canvas.toDataURL());
    setCroppedCanvas(canvas);
  };

  const onImageUpload = (image: string) => {
    setImage(image);
    setCroppedImage(undefined);
    setCroppedCanvas(undefined);

    // When image changes, we release the memory of the cropped image
    if (croppedImage) {
      console.log(`Revoking cropped image URL (${croppedImage})...`)

      URL.revokeObjectURL(croppedImage);
    }
  }

  const onSubmit = () => {
    if (!croppedCanvas) {
      console.log('Nothing to submit');
      return;
    }

    const form = new FormData();
    croppedCanvas.toBlob((blob) => {
      if (!blob) {
        console.log('No blob to send');
        return;
      }

      form.append('image', blob);
      form.append('anotherField', 'value');
      // Replace this log with pushing through the API
      fetch('http://example.com/upload/', {
        method: 'POST',
        body: form,
      });
    }, 'image/jpeg');
  }

  return (
    <div className="App">
      <h1>Hello!</h1>
      <ReactDropzone onImageUpload={onImageUpload} image={croppedImage} />
      <ReactAdvancedCropper image={image} onCropCanvas={onCropCanvas} />
      <button onClick={onSubmit}>Upload</button>
    </div>
  );
};

export default App;
