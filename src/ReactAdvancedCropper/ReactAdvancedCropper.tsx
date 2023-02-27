import React, { useState } from 'react';
import { Cropper, CropperRef, RectangleStencil } from 'react-advanced-cropper';
import { configurations, ImageConfiguration, ImageConfigurations, SelectConfiguration, testImage } from '../constants';

import 'react-advanced-cropper/dist/style.css'
import 'react-advanced-cropper/dist/themes/bubble.css';
import './styles.css';

interface Props {
  image?: string;
}

export const ReactAdvancedCropper: React.FC<Props> = ({ image }) => {
  const [currentConfiguration, setCurrentConfiguration] =
    useState<ImageConfigurations>("squareLogo");
  const configuration = configurations[currentConfiguration];
  const [src, setSrc] = useState<string>(testImage);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  console.log('Image changed to', image)

  const onChange = (cropper: CropperRef) => {
    console.log(cropper.getCoordinates(), cropper.getCanvas());
  };

  return (
    <div className="ReactAdvancedCropper" style={{ display: 'grid', width: '1200px' }}>
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
          className="cropper"
        />
      </div>
      <div className="controls">
        <SelectConfiguration
          currentConfiguration={currentConfiguration}
          setCurrentConfiguration={setCurrentConfiguration}
        />
      </div>
    </div>
  )
};