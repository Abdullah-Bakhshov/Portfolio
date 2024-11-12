import { TypeAnimation } from 'react-type-animation';
import React, { useRef, useState, useEffect } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import styled from 'styled-components';

const Title = styled.h1`
    font-family: 'Arial', sans-serif;
    font-size: 2em;
    font-weight: bold;
    color: white;
    text-align: left;
    max-width: 50%;
    margin: 0;
    position: absolute;
    bottom: -30px;
    left: 10%;
`;

const Container = styled.div`
    position: relative;
    z-index: 1;
    color: white;
    text-align: left; 
    top: 30%;
    transform: translateY(-30%);
    padding-left: 10%; 
`;

const MuteButton = styled.button`
    position: absolute;
    bottom: 20px;
    right: 35px;
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    z-index: 2;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TextComponent = () => {
    return (
        <Title>
            <TypeAnimation
                sequence={[
                    'Hey 👋, I am Abdullah Bakhshov and I am a Second Year Student at the University of Manchester !',
                    1500, 
                    'Hey 👋, I am Abdullah Bakhshov and I love creating projects and learning new things !',
                    1500, 
                    'Hey 👋, I am Abdullah Bakhshov and I love playing sports !',
                    1000,
                    ''
                ]}
                wrapper="span"
                speed={50}
                repeat={1}
                style={{ whiteSpace: 'pre-wrap' }}
            />
        </Title>
    );
};

const Index = () => {
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const handleScroll = () => {
        if (videoRef.current) {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollFraction = scrollY / maxScroll;

            videoRef.current.volume = Math.max(0, 1 - scrollFraction);
            videoRef.current.style.opacity = `${Math.max(0.0, 1 - scrollFraction)}`;
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            <video 
                ref={videoRef}
                src={require("/content/website.mp4")} 
                autoPlay 
                loop 
                muted
                style={{ 
                    position: 'absolute', 
                    top: '2%', 
                    left: '0%', 
                    width: '98%', 
                    height: '97%', 
                    objectFit: 'cover', 
                    zIndex: 0,
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '20px'
                }} 
                data-scroll
                data-scroll-speed="0.3"
            />
            <Container data-scroll data-scroll-speed="0.2" >
                <TextComponent/>
            </Container>
            <MuteButton onClick={toggleMute} data-scroll data-scroll-speed="0.8">
                {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
            </MuteButton>
        </div>
    );
};

export default Index;