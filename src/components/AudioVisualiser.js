import React, { useEffect,createRef } from 'react';

const  AudioVisualiser= ({ audioData }) => {

    const canvasRef = createRef();

    const draw = () => {
        const canvas = canvasRef.current;
        const height = canvas.height;
        const width = canvas.width;
        const context = canvas.getContext('2d');
        let x = 0;
        const sliceWidth = (width * 1.0) / audioData.length;

        context.lineWidth = 2;
        context.strokeStyle = '#000000';
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.moveTo(0, height / 2);
        for (const item of audioData) {
            const y = (item / 255.0) * height;
            context.lineTo(x, y);
            x += sliceWidth;
        }
        context.lineTo(x, height / 2);
        context.stroke();
    }

    useEffect(() => {
        draw();
    });

    return <canvas  ref={canvasRef} style={{maxWidth:"80%", height:"15rem"}} />
    
}

export default AudioVisualiser;
