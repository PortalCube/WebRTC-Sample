import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import "./App.scss";
import MainPage from "./pages/MainPage.jsx";

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
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
