import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react"
import { useRef } from "react"


export default function Game() {
    const canvasRef = useRef(null);
    const [player1Pos, setPlayer1Pos] = useState({x: 50, y:50})


    const drawPlayer1 = useCallback((ctx) => {
        ctx.fillStyle = "black"
        ctx.fillRect(player1Pos.x, player1Pos.y, 50, 25)
    }, [player1Pos])

    const drawPlayer2 = useCallback((ctx) => {
        ctx.fillStyle = "red"
        ctx.fillRect(150,50, 50, 25)
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        drawPlayer1(context)
        drawPlayer2(context)
    },[drawPlayer1, drawPlayer2])

    // move player 1
    function player1MoveUp() {
        setPlayer1Pos(oldVal => {
            return {x: oldVal.x, y: oldVal.y - 10}
        })
    }

    // move player 1
    function player1MoveDown() {
        setPlayer1Pos(oldVal => {
            return {x: oldVal.x, y: oldVal.y + 10}
        })
    }
    

    return <section id="game" className="justify-center p-4">
        <canvas ref={canvasRef} className="border-solid border-black border-4" width={window.innerWidth - 100}>

        </canvas>
        <div className="flex gap-4">
            <button className="" onClick={player1MoveUp}>UP</button>
            <button className="" onClick={player1MoveDown}>DOWN</button>
        </div>
    </section>
}