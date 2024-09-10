'use client';

import React from 'react';
import { Tooltip, Progress } from 'antd';

const ElectricSaved = () => {
    const totalEnergy = 400; // Total energy in kWh
    const electricUsed = 150; // Electric used in kWh
    const solarUsed = 100; // Solar used in kWh
    const savedEnergy = 150; // Saved energy in kWh

    const electricPercent = (electricUsed / totalEnergy) * 100;
    const solarPercent = (solarUsed / totalEnergy) * 100;
    const savedPercent = (savedEnergy / totalEnergy) * 100;

    return (
        <div className="progress-container">
            <div className="progress-item">
                <Tooltip title={`Electric used: ${electricUsed} kWh`}>
                    <Progress
                        percent={electricPercent}
                        type="dashboard"
                        strokeColor="#108ee9"
                        trailColor="#d9d9d9"
                        strokeWidth={10}
                        gapDegree={30}
                        gapPosition="bottom"
                    />
                </Tooltip>
                <div className="progress-label">Electric Used</div>
            </div>
            <div className="progress-item">
                <Tooltip title={`Solar used: ${solarUsed} kWh`}>
                    <Progress
                        percent={solarPercent}
                        type="dashboard"
                        strokeColor="#87d068"
                        trailColor="#d9d9d9"
                        strokeWidth={10}
                        gapDegree={30}
                        gapPosition="bottom"
                    />
                </Tooltip>
                <div className="progress-label">Solar Used</div>
            </div>
            <div className="progress-item">
                <Tooltip title={`Saved energy: ${savedEnergy} kWh`}>
                    <Progress
                        percent={savedPercent}
                        type="dashboard"
                        strokeColor="#ffbb33"
                        trailColor="#d9d9d9"
                        strokeWidth={10}
                        gapDegree={30}
                        gapPosition="bottom"
                    />
                </Tooltip>
                <div className="progress-label">Saved Energy</div>
            </div>
        </div>
    );
};

export default ElectricSaved;
