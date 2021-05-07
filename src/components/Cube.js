import React from 'react'

export const Cube = () => {

    return (
        <div className="cube-container mt-5">
            <div className="cube">
                <div className="cube-face front">
                    <div className="grid">
                        <div className="dot"></div>
                    </div>
                </div>
                <div className="cube-face back">
                    <div className="grid">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
                <div className="cube-face left">
                    <div className="grid">
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
                <div className="cube-face right">
                    <div className="grid">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
                <div className="cube-face top">
                    <div className="grid">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
                <div className="cube-face bottom">
                    <div className="grid">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
