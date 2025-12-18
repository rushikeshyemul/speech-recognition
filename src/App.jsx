import "core-js/stable";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState } from "react";

const App = () => {
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });

  const [language, setLanguage] = useState("en-IN");

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language });
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <div className="container">
      <h2>Speech to Text Converter</h2>
      <p>
        A React hook that converts speech from the microphone to text and makes
        it available to your React components.
      </p>

      <div className="main-content" onClick={() => setTextToCopy(transcript)}>
        {transcript}
      </div>

      <div className="language-selector">
        <label>Select Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en-IN">English</option>
          <option value="mr-IN">Marathi</option>
          <option value="hi-IN">Hindi</option>
        </select>
      </div>

      <div className="btn-style">
        <button onClick={setCopied}>
          {isCopied ? "Copied!" : "Copy to clipboard"}
        </button>
        <button onClick={startListening}>Start Listening</button>
        <button onClick={SpeechRecognition.stopListening}>
          Stop Listening
        </button>
      </div>

      <footer className="footer">
        <p>&copy; 2025 Rushikesh Yemul. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
