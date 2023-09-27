import styled from "styled-components";

import { useEffect, useRef, useState } from "react";
import { RTCPeer } from "../librarys/webrtc";

const peer = new RTCPeer();

const Container = styled.div``;

const VideoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

const VideoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Video = styled.video`
    width: max(300px, 40vw);
    height: max(240px, 30vh);
    background-color: #cfcfcf;
`;

const Description = styled.p`
    margin: 8px;
    font-size: 12px;
    text-align: center;
`;

const Text = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px;
    font-size: 18px;
    line-height: 32px;
    text-align: left;
`;

const Form = styled.div`
    margin: 24px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;

const Input = styled.input`
    min-width: 300px;
    font-size: 12px;
    padding: 4px 8px;
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

const MainPage = () => {
    const clientVideo = useRef(null);
    const remoteVideo = useRef(null);
    const [clientId, setClientId] = useState("받아오는 중...");
    const [remoteId, setRemoteId] = useState("상대방과 연결되지 않았습니다");
    const [peerStatus, setPeerStatus] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState(false);
    const [id, setId] = useState("");

    useEffect(() => {
        (async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            peer.onOpen = (id) => {
                setPeerStatus(true);
                setClientId(id);
            };

            peer.onConnection = (connection) => {
                setRemoteId(connection.peer);
            };

            peer.onStream = (stream) => {
                onStream(stream);
            };

            peer.onDataClose = () => {
                setRemoteId("연결 종료");
            };

            peer.onMediaClose = () => {
                if (remoteVideo) {
                    remoteVideo.current.srcObject = null;
                }
            };

            peer.start(stream);

            if (clientVideo) {
                clientVideo.current.srcObject = stream;
            }
        })();
    }, []);

    function onStream(stream) {
        if (remoteVideo) {
            remoteVideo.current.srcObject = stream;
        }
    }

    return (
        <Container>
            <VideoContainer>
                <VideoWrapper>
                    <Video ref={clientVideo} autoPlay />
                    <Description>
                        클라이언트
                        <br />
                        {clientId}
                    </Description>
                </VideoWrapper>
                <VideoWrapper>
                    <Video ref={remoteVideo} autoPlay />
                    <Description>
                        상대방
                        <br />
                        {remoteId}
                    </Description>
                </VideoWrapper>
            </VideoContainer>
            <Form>
                <Input
                    type="text"
                    onChange={(event) => setId(event.target.value)}
                    value={id}
                    placeholder="연결하려는 상대방 ID 입력..."
                />
                <Button onClick={() => peer.connect(id)}>Connect</Button>
                <Button className="error" onClick={() => peer.disconnect()}>
                    Disconnect
                </Button>
            </Form>
        </Container>
    );
};

export default MainPage;
