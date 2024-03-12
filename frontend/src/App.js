import { useEffect, useReducer } from "react";
import "./App.css";
import axios from "axios";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import New from "./pages/New";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return; // action.data
    }
    default:
      return state;
  }
  return newState;
};

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        dispatch({ type: "INIT", data: res.data });
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
