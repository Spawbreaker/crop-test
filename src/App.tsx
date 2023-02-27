import React, { useState } from "react";
import { ReactAdvancedCropper } from "./ReactAdvancedCropper/ReactAdvancedCropper";
import { ReactDropzone } from "./ReactDropzone";

const App: React.FC = () => {
  const [image, setImage] = useState<string>();

  return (
    <div className="App">
      <h1>Hello!</h1>
      <ReactDropzone onImageUpload={setImage} />
      <ReactAdvancedCropper image={image} />
    </div>
  );
};

export default App;
