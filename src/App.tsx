import React, { useState } from "react";
import { ReactCropper } from "./ReactCropper/ReactCropper";
import { ReactImageCrop } from "./ReactImageCrop/ReactImageCrop";


const App: React.FC = () => {
  const [src, setSrc] = useState<string>(
    "https://upload.wikimedia.org/wikipedia/commons/9/9e/Ours_brun_parcanimalierpyrenees_1.jpg"
  );

  return (
    <div className="App">
      <h1>Hello!</h1>
      <ReactImageCrop />
    </div>
  );
};

export default App;
