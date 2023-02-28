import React, { useRef, useState } from 'react';
import { Cropper, CropperRef } from 'react-advanced-cropper';
import { configurations, ImageConfigurations, SelectConfiguration } from '../constants';

import 'react-advanced-cropper/dist/style.css'
import './styles.css';

interface Props {
  image?: string;
  onCropCanvas?: (canvas: HTMLCanvasElement) => void;
}

export const ReactAdvancedCropper: React.FC<Props> = ({ image, onCropCanvas }) => {
  const [currentConfiguration, setCurrentConfiguration] =
    useState<ImageConfigurations>("squareLogo");
  const [cropWidth, setCropWidth] = useState<number>(0);
  const [cropHeight, setCropHeight] = useState<number>(0);

  const cropperRef = useRef<CropperRef>(null);

  const configuration = configurations[currentConfiguration];

  const onChange = (cropper: CropperRef) => {

    const { width, height } = cropper.getCoordinates() || { width: 0, height: 0 };

    setCropWidth(width);
    setCropHeight(height);
  };

  const onCrop = (): FormData | void => {
    const canvas = cropperRef.current?.getCanvas({
      minWidth: configuration.minWidth,
      minHeight: configuration.minHeight,
      maxWidth: configuration.maxWidth,
      maxHeight: configuration.maxHeight,
    });

    if (!canvas) {
      console.log('Nothing to crop');
      return;
    }

    const form = new FormData();
    canvas.toBlob((blob) => {
      if (!blob) {
        console.log('No blob to send');
        return;
      }

      form.append('image', blob);
    }, 'image/jpeg');

    return form;
  }

  const cropCanvas = (): HTMLCanvasElement | void => {
    const canvas = cropperRef.current?.getCanvas({
      minWidth: configuration.minWidth,
      minHeight: configuration.minHeight,
      maxWidth: configuration.maxWidth,
      maxHeight: configuration.maxHeight,
    });

    if (!canvas) {
      console.log('Nothing to crop');

      return;
    }

    if (!onCropCanvas) {
      console.log('No callback to crop canvas');

      return;
    }

    return onCropCanvas(canvas);
  }

  return (
    <div className="ReactAdvancedCropper" style={{ display: 'grid' }}>
      <div className="custom_cropper_class">
        <Cropper
          minWidth={configuration.minWidth}
          minHeight={configuration.minHeight}
          stencilProps={{ aspectRatio: configuration.aspect, grid: true }}
          backgroundWrapperProps={{
            scaleImage: true,
            moveImage: true,
          }}
          src={image}
          onChange={onChange}
          ref={cropperRef}
          className="cropper"
        />
      </div>
      <div className="controls">

      </div>
      <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr" }}>
        <SelectConfiguration
          currentConfiguration={currentConfiguration}
          setCurrentConfiguration={setCurrentConfiguration}
        />
        <button onClick={cropCanvas}>Crop</button>
        <div>
          <label style={{ marginRight: '0.5rem' }}>Width</label>
          <input type="number" value={cropWidth} readOnly />
        </div>
        <div>
          <label style={{ marginRight: '0.5rem' }}>Height</label>
          <input type="number" value={cropHeight} readOnly />
        </div>
      </div>
    </div>
  )
};