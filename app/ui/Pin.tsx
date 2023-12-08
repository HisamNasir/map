import React from 'react';
interface PinProps {
    coordinates: [number, number];
}
const Pin: React.FC<PinProps> = ({ coordinates }) => {
    const [viewportWidth, viewportHeight] = [window.innerWidth, window.innerHeight];
    const pinStyle = {
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${(coordinates[0] / viewportWidth) * 100}%, ${(coordinates[1] / viewportHeight) * 100}%)`,
        width: '0px',
        height: '0px',
        background: 'red',
        borderRadius: '1%',
        zIndex: 100,
    };
    return <div style={pinStyle} />;
};
export default Pin;
