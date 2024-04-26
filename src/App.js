import { BrowserRouter } from "react-router-dom";

import Header from "./Components/app/Header"
import Main from "./Components/app/Main"
import Footer from "./Components/app/Footer"
import AuthProvider from "./Components/context/AuthProvider"
import HttpHeadersProvider from "./Components/context/HttpHeadersProvider";
import "./css/style.css"
import "./css/main.css"

function App() {
  if (process.env.NODE_ENV == 'production') {
    console.log("Current Mode: Production Mode");
  } else if (process.env.NODE_ENV == 'development') {
    console.log("Current Mode: Development Mode");
  }

  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <HttpHeadersProvider>
            <Header />
            {/* <Nav /> */}
            <Main />
            <Footer />
          </HttpHeadersProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
