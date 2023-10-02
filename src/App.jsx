import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import "./App.scss";
import MainPage from "./pages/MainPage.jsx";
import CallPage from "./pages/CallPage.jsx";

const Container = styled.div`
    background-color: transparent;
    height: 100%;
`;

function App() {
    return (
        <Router>
            <Container>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/:uuid" element={<CallPage />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
