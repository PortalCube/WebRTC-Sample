import styled from "styled-components";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div``;

const Title = styled.p`
    margin-top: 48px;
    text-align: center;
    font-weight: 700;
    font-size: 28px;
`;

const Description = styled.p`
    font-size: 16px;
    font-weight: 600;
    text-align: center;
`;

const Form = styled.div`
    margin: 24px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 12px;
`;

const Input = styled.input`
    min-width: 340px;
    font-family: "Consolas";
    font-size: 12px;
    font-weight: 500;
    padding: 2px 6px;
`;

const RoomContainer = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Room = styled.button`
    width: 400px;
    margin: 8px;
    padding: 8px 12px;
    border: 1px solid black;
    border-radius: 8px;
    box-shadow: 0px 2px 8px #0000001f;
    background: none;
    display: flex;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
`;

const RoomTitle = styled.p`
    font-weight: 700;
    font-size: 16px;
`;
const RoomUUID = styled.p`
    font-family: "Consolas";
    font-size: 12px;
`;

const Button = styled.button`
    padding: 4px 12px;
    border: none;
    border-radius: 10px;
    color: white;
    background-color: #3592ff;
    font-size: 13px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &.error {
        background-color: #e62626;
    }
`;

const sampleUUID = [
    "e7b8d69e-1fc7-4417-abf6-ec90fa3d0c49",
    "8ddd347b-4462-40f4-9ff9-d5c1dd43c651",
    "0944c604-2297-45ba-8e59-3e41ec47cb9d",
];

const MainPage = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [room, setRoom] = useState(sampleUUID);

    return (
        <Container>
            <Title>WebRTC 데모 페이지</Title>
            <RoomContainer>
                {room.map((item, index) => (
                    <Room key={index} onClick={() => navigate("/" + item)}>
                        <RoomTitle>Room {index + 1}</RoomTitle>
                        <RoomUUID>{item}</RoomUUID>
                    </Room>
                ))}
            </RoomContainer>

            <Form>
                <Description>Room UUID 직접 입력:</Description>
                <Input
                    type="text"
                    onChange={(event) => setId(event.target.value)}
                    value={id}
                    placeholder="입장하려는 방의 uuid 입력..."
                />
                <Button onClick={() => setId(crypto.randomUUID())}>
                    Random!
                </Button>
                <Button onClick={() => navigate("/" + id)}>입장</Button>
            </Form>
        </Container>
    );
};

export default MainPage;
