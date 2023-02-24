import React, { useEffect, useRef, useState } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "./canvasPreview";
import { ImageConfigurations, configurations, testImage, SelectConfiguration } from "../constants";

const ReactCropper: React.FC = () => {
  const [src, setSrc] = useState<string>(testImage);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [currentConfiguration, setCurrentConfiguration] =
    useState<ImageConfigurations>("landscapeImage");
  const configuration = configurations[currentConfiguration];

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const onCropImage = () => {
    console.log("Cropping image...");

    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      if (!completedCrop) console.log("No crop completed");
      if (!previewCanvasRef.current) console.log("No preview canvas ref");
      if (!imgRef.current) console.log("No image ref");

      return;
    }

    canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
  };

  useEffect(() => {
    setCrop(undefined);
  }, [currentConfiguration]);

  return (
    <div className="ReactImageCrop">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "66% 33%",
        }}
      >
        <div>
          <ReactCrop
            aspect={configuration.aspect}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            minHeight={configuration.minHeight}
            minWidth={configuration.minWidth}
          >
            <img
              src={src}
              ref={imgRef}
              style={{
                minWidth: "100%",
              }}
            />
          </ReactCrop>
        </div>
        <div>
          <div style={{ border: "1px solid #ccc", width: '100%', height: '100%', maxHeight: '400px' }}>
          {!!completedCrop && (
            <canvas
              ref={previewCanvasRef}
              style={{
                objectFit: "scale-down",
                height: '100%',
                width: '100%'
              }}
            />
          )}
          </div>
          <button
            onClick={() => {
              console.log("Cropping...");
              onCropImage();
            }}
          >
            Crop
          </button>
        </div>
      </div>
      <SelectConfiguration
        currentConfiguration={currentConfiguration}
        setCurrentConfiguration={setCurrentConfiguration}
      />
    </div>
  );
};

export default ReactCropper;
