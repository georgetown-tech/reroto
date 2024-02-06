"use client";

import { Transcription } from "@prisma/client";
import React, { useState, useRef, useEffect } from "react";

export default function useTranscription(transcript:Transcription) {

    const [audio, setAudio] = useState(new Audio(transcript.url || ""));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);
    const setTime = (time:number) => { setPlaying(true); audio.currentTime = time; }
    
    useEffect(() => {
            playing ? audio.play() : audio.pause();
            // alert(transcript.url);
        },
        [audio, playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio]);

    return [playing, toggle, audio.currentTime, setTime];
};