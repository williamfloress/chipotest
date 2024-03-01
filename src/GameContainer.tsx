"use client";
import { Box, Cylinder, Html, OrbitControls } from "@react-three/drei"  
import { Canvas, useFrame } from "@react-three/fiber"  
import { useRef, useState } from "react"; 
export const LevelOne = ({score, s__score}:any) => { 
    const MAX_VEL = -0.01 
    const [vel, s__vel] = useState(MAX_VEL) 
    const $box:any = useRef(null) 
    const finishGame = () => { if (score == 0) { s__score(-1) } else { s__score(-score) } } 
    const boxClick = () => { 
        if (score < 0) { return window.location.reload() } 
        s__vel((velocity)=>(velocity+0.04)) 
        if (score > 8) { finishGame(); alert("You Win!"); return } 
        s__score(score + 1) 
    } 
    useFrame(() => { 
        if (score < 0) { return } 
        if (!$box.current) { return } 
        $box.current.position.y += vel 
        if ($box.current.position.y < -2 && score >= 0) { alert("You Lose!"); finishGame() } 
        if (vel <= MAX_VEL) { return } 
        s__vel(vel - 0.001) 
    }) 
    return (<> 
        {score < -7 && <Html position={[0,2,0]}><h1>You Win!</h1></Html>} 
        <Cylinder args={[0.5,0.5,0.1]} onClick={boxClick} ref={$box} rotation={[Math.PI/2,0,0]}> 
            <meshStandardMaterial  color={`#${score}0${score/2}000`} /> 
        </Cylinder> 
    </>) 
} 
export const GameContainer = () => { 
    const [score, s__score] = useState(0) 
    return (<> 
        <div><h1>3D Web Game</h1></div> 
        <div style={{position:"absolute", bottom:"10%"}}><h3>Score: {Math.abs(score)}</h3></div> 
        <div style={{ position:"absolute", top:"0", left:"0", width:"100%", height:"100%" }}> 
            <Canvas> 
                <OrbitControls autoRotate autoRotateSpeed={score} /> 
                <pointLight position={[0, 3, 2]} distance={20} intensity={100} /> 
                <ambientLight intensity={0.75} /> 
                <Box position={[0,-2,0]}> <meshStandardMaterial wireframe /> </Box>  
                <LevelOne score={score} s__score={s__score} /> 
            </Canvas> 
        </div> 
    </>) 
}
