import React, { useEffect, useRef, useState, useMemo } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { configurations, ImageConfiguration, ImageConfigurations, SelectConfiguration, testImage } from '../constants';

const ReloadingCropper: React.FC<{configuration: ImageConfiguration}> = ({ configuration }) => {
  const [src, setSrc] = useState<string>(testImage);
  // const [cropper, setCropper] = useState<any>(null);
  const cropperRef = useRef<HTMLImageElement>(null);
  const component = useMemo(() => {
    console.log('Remaking the reloading cropper...')

    return (
    <Cropper
      id="cropper"
        style={{ height: 400, width: "100%" }}
        zoomTo={0.5}
        ref={cropperRef}
        aspectRatio={configuration.aspect}
        preview=".img-preview"
        src={src}
        viewMode={1}
        minCropBoxHeight={configuration.minHeight}
        minCropBoxWidth={configuration.minWidth}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false}
        guides={true}
      />
  )}, [configuration]);

  return component;

};

const InternalCropper: React.FC<{configuration: ImageConfiguration}> = ({ configuration }) =>  {
  const [src, setSrc] = useState<string>(testImage);
  // const [cropper, setCropper] = useState<any>(null);
  const cropperRef = useRef<HTMLImageElement>(null);

  const aspect = useMemo(() => configuration.aspect, [configuration]);
  const minHeight = useMemo(() => configuration.minHeight, [configuration]);
  const minWidth = useMemo(() => configuration.minWidth, [configuration]);

  useEffect(() => {
    const cr: any = cropperRef.current;
    const newCropper: any = cr?.cropper;
    newCropper?.setAspectRatio(aspect);
    // cropper?.setAspectRatio(aspect)
  }, [aspect]);

  return (
    <Cropper
        style={{ height: 400, width: "100%" }}
        zoomTo={0.5}
        ref={cropperRef}
        aspectRatio={aspect}
        preview=".img-preview"
        src={src}
        viewMode={1}
        minCropBoxHeight={minHeight}
        minCropBoxWidth={minWidth}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
        // onInitialized={(instance) => {
        //   setCropper(instance);
        // }}
        guides={true}
      />
  )
}

export const ReactCropper = () => {


  const [currentConfiguration, setCurrentConfiguration] =
    useState<ImageConfigurations>("squareLogo");
  const configuration = configurations[currentConfiguration];

  return (
    <div className="ReactCropper">
      <ReloadingCropper configuration={configuration} />
      <SelectConfiguration
        currentConfiguration={currentConfiguration}
        setCurrentConfiguration={setCurrentConfiguration}
      />
    </div>
  );
};
