"use client";
import React, {useEffect} from 'react';
import {fetchDeviceInfo } from '@/utils/deviceInfo';

function DeviceInfoData() {
    useEffect(() => {
        const collect = async () => {
            const response = await fetchDeviceInfo();
            console.log(response);
        }
        collect();
    }, [])
    
  return (
    <div>DeviceInfoData</div>
  )
}

export default DeviceInfoData