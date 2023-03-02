"use client";
import FullScreenMobileView from "@/components/fullScreenMobileView";
import {AzimuthAltitudeCalculator} from "@/components/azimuthAltitudeCalculator";

export default function FinderBulan() {
  return (
    <div>
        <FullScreenMobileView></FullScreenMobileView>
        <AzimuthAltitudeCalculator></AzimuthAltitudeCalculator>
        <DeviceOrientationChecker></DeviceOrientationChecker>
    </div>
  );
}