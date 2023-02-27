import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { configurations, ImageConfiguration, ImageConfigurations, SelectConfiguration, testImage } from '../constants';

export const ReactEasyCrop = () => {
  const [currentConfiguration, setCurrentConfiguration] =
    useState<ImageConfigurations>("squareLogo");
  const configuration = configurations[currentConfiguration];
  const [src, setSrc] = useState<string>(testImage);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  return (
    <div className="ReactEasyCrop">
      <div className="crop-container" style={{ position: 'absolute', top: 0, left: 0, bottom: '80px' }}>
        <Cropper
          aspect={configuration.aspect}
          image={src}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
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