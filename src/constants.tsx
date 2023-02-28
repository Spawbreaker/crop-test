import React from "react";

export interface ImageConfiguration {
  aspect: number;
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
}

export type ImageConfigurations =
  | "landscapeImage"
  | "squareImage"
  | "portraitImage"
  | "squareLogo"
  | "landscapeLogo";

export const configurations: Record<ImageConfigurations, ImageConfiguration> = {
  landscapeImage: {
    aspect: 1.91,
    minWidth: 600,
    minHeight: 314,
    maxWidth: 1200,
    maxHeight: 628,
  },
  squareImage: {
    aspect: 1,
    minWidth: 300,
    minHeight: 300,
    maxWidth: 1200,
    maxHeight: 1200,
  },
  portraitImage: {
    aspect: 0.8, // 4/5
    minWidth: 480,
    minHeight: 600,
    maxWidth: 960,
    maxHeight: 1200,
  },
  squareLogo: {
    aspect: 1,
    minWidth: 128,
    minHeight: 128,
    maxWidth: 1200,
    maxHeight: 1200,
  },
  landscapeLogo: {
    aspect: 4,
    minWidth: 512,
    minHeight: 128,
    maxWidth: 1200,
    maxHeight: 300,
  },
};

export const testImage = "https://upload.wikimedia.org/wikipedia/commons/9/9e/Ours_brun_parcanimalierpyrenees_1.jpg";

interface SelectConfigurationProps {
  currentConfiguration: ImageConfigurations;
  setCurrentConfiguration: (configuration: ImageConfigurations) => void;
}

export const SelectConfiguration: React.FC<SelectConfigurationProps> = ({
  currentConfiguration,
  setCurrentConfiguration,
}) => (
  <div>
    <h3 style={{ display: "inline" }}>Configuration: </h3>
    <select
      value={currentConfiguration}
      onChange={(e) =>
        setCurrentConfiguration(e.target.value as ImageConfigurations)
      }
    >
      <option value="landscapeImage">Landscape Image</option>
      <option value="squareImage">Square Image</option>
      <option value="portraitImage">Portrait Image</option>
      <option value="squareLogo">Square Logo</option>
      <option value="landscapeLogo">Landscape Logo</option>
    </select>
  </div>
);
