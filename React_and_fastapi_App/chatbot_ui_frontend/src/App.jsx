import Chatbot from "./components/Chatbot";
import ibaBg from "./assets/uni-bg.png";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${ibaBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        margin: "0",
        padding: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Chatbot title="IBA Website Assistant" />
    </div>
  );
}

export default App;
