import { useState, useEffect } from 'react';

export function AzimuthAltitudeCalculator() {
  const [azimuth, setAzimuth] = useState(0);
  const [altitude, setAltitude] = useState(0);

  useEffect(() => {
    const handleOrientationChange = (event: { alpha: any; beta: any; gamma: any; }) => {
      const alpha = event.alpha; // device orientation around z-axis
      const beta = event.beta; // device orientation around x-axis
      const gamma = event.gamma; // device orientation around y-axis
      const radToDeg = 180 / Math.PI;
      console.log(alpha);

      if (alpha !== null && beta !== null && gamma !== null) {
        const phi = beta * radToDeg; // convert radians to degrees
        const theta = (gamma - 90) * -radToDeg; // convert radians to degrees
        const psi = alpha * radToDeg; // convert radians to degrees

        const lat = 0; // user's latitude
        const lon = 0; // user's longitude
        const latRad = lat * Math.PI / 180; // convert degrees to radians
        const lonRad = lon * Math.PI / 180; // convert degrees to radians

        const declination = 0; // magnetic declination for your location
        const declinationRad = declination * Math.PI / 180; // convert degrees to radians

        const H = psi + declinationRad; // magnetic heading

        const X = Math.cos(latRad) * Math.sin(lonRad - psi);
        const Y = Math.cos(latRad) * Math.sin(latRad) * Math.cos(lonRad - psi) - Math.sin(latRad) * Math.cos(latRad) * Math.sin(lonRad - psi);
        const Z = Math.sin(latRad) * Math.cos(latRad) * Math.cos(lonRad - psi) + Math.cos(latRad) * Math.sin(lonRad - psi);

        const Bx = -X;
        const By = Y;
        const Bz = Z;

        const Hx = Bx * Math.cos(declinationRad) + Bz * Math.sin(declinationRad);
        const Hy = By;
        const Hz = -Bx * Math.sin(declinationRad) + Bz * Math.cos(declinationRad);

        const Ex = -Hy * Math.cos(phi) - Hz * Math.sin(phi);
        const Ey = Hx * Math.sin(theta) + Hy * Math.cos(theta) * Math.sin(phi) - Hz * Math.cos(phi) * Math.cos(theta);
        const Ez = Hx * Math.cos(theta) - Hy * Math.sin(theta) * Math.sin(phi) + Hz * Math.cos(phi) * Math.sin(theta);

        const azRad = Math.atan2(Ey, Ex);
        const altRad = Math.atan2(Ez, Math.sqrt(Ex * Ex + Ey * Ey));
        const azDeg = azRad * radToDeg;
        const altDeg = altRad * radToDeg;

        setAzimuth(azDeg);
        setAltitude(altDeg);
      }
    };

    window.addEventListener('deviceorientation', handleOrientationChange, true);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientationChange, true);
    };
  }, []);

  return (
    <div>
        <h1>Azimuth: {azimuth.toFixed(2)}°</h1>
        <h1>Altitude: {altitude.toFixed(2)}°</h1>
    </div>
  );
}
