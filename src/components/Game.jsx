import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react"
import { useRef } from "react"


export default function Game() {
    const canvasRef = useRef(null);
    const [player1Pos, setPlayer1Pos] = useState({headX: 50, headY:50, leftArmX: 80, leftArmY: 100, rightArmX: 80, rightArmY: 25})
    const [player2Pos, setPlayer2Pos] = useState({headX: 150, headY:50, leftArmX: 170, leftArmY: 100, rightArmX: 170, rightArmY: 25})


    const drawPlayer1 = useCallback((ctx) => {
        ctx.fillStyle = "black"
        ctx.fillRect(player1Pos.headX, player1Pos.headY, 50, 25)
        ctx.beginPath();
        ctx.arc(player1Pos.leftArmX, player1Pos.leftArmY , 10, 0, 2*Math.PI)
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(player1Pos.rightArmX, player1Pos.rightArmY, 10, 0, 2*Math.PI)
        ctx.stroke();
    }, [player1Pos])

    const drawPlayer2 = useCallback((ctx) => {
        ctx.fillStyle = "red"
        ctx.fillRect(player2Pos.headX, player2Pos.headY, 50, 25)
        ctx.beginPath();
        ctx.arc(player2Pos.leftArmX, player2Pos.leftArmY , 10, 0, 2*Math.PI)
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(player2Pos.rightArmX, player2Pos.rightArmY, 10, 0, 2*Math.PI)
        ctx.stroke();
    }, [player2Pos])

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
            return {...oldVal, headY: oldVal.headY - 10, leftArmY: oldVal.leftArmY - 10, rightArmY: oldVal.rightArmY - 10}
        })
    }

    
    // move player 2
    function player2MoveUp() {
        setPlayer2Pos(oldVal => {
            return {...oldVal, headY: oldVal.headY - 10, leftArmY: oldVal.leftArmY - 10, rightArmY: oldVal.rightArmY - 10}
        })
    }

    // move player 1
    function player1MoveDown() {
        setPlayer1Pos(oldVal => {
            return {...oldVal, headY: oldVal.headY + 10, leftArmY: oldVal.leftArmY + 10, rightArmY: oldVal.rightArmY + 10}
        })
    }

    // move player 2
    function player2MoveDown() {
        setPlayer2Pos(oldVal => {
            return {...oldVal, headY: oldVal.headY + 10, leftArmY: oldVal.leftArmY + 10, rightArmY: oldVal.rightArmY + 10}
        })
    }
    
    // move player 1
    function player1MoveLeft() {
        setPlayer1Pos(oldVal => {
            return {...oldVal, headX: oldVal.headX + 10, leftArmX: oldVal.leftArmX + 10, rightArmX: oldVal.rightArmX + 10}
        })
    }

    
    // move player 2
    function player2MoveLeft() {
        setPlayer2Pos(oldVal => {
            return {...oldVal, headX: oldVal.headX - 10, leftArmX: oldVal.leftArmX - 10, rightArmX: oldVal.rightArmX - 10}
        })
    }
        
    // move player 1
    function player1MoveRight() {
        setPlayer1Pos(oldVal => {
            return {...oldVal, headX: oldVal.headX - 10, leftArmX: oldVal.leftArmX - 10, rightArmX: oldVal.rightArmX - 10}
        })
    }

       
    // move player 2
    function player2MoveRight() {
        setPlayer2Pos(oldVal => {
            return {...oldVal, headX: oldVal.headX + 10, leftArmX: oldVal.leftArmX + 10, rightArmX: oldVal.rightArmX + 10}
        })
    }

    // player1 hit
    function player1HitLeft() {
        setPlayer1Pos(oldVal => {return {...oldVal, leftArmX: oldVal.leftArmX + 30}})
        setTimeout(() => {
            setPlayer1Pos(oldVal => {return {...oldVal, leftArmX: oldVal.leftArmX - 30}})    
        }, 100)
    }

    // player2 hit
    function player2HitLeft() {
        setPlayer2Pos(oldVal => {return {...oldVal, leftArmX: oldVal.leftArmX - 30}})
        setTimeout(() => {
            setPlayer2Pos(oldVal => {return {...oldVal, leftArmX: oldVal.leftArmX + 30}})    
        }, 100)
    }
    
    
    // player1 hit
    function player1HitRight() {
        setPlayer1Pos(oldVal => {return {...oldVal, rightArmX: oldVal.rightArmX + 30}})
        setTimeout(() => {
            setPlayer1Pos(oldVal => {return {...oldVal, rightArmX: oldVal.rightArmX - 30}})    
        }, 100)
    }

    // player2 hit
    function player2HitRight() {
        setPlayer2Pos(oldVal => {return {...oldVal, rightArmX: oldVal.rightArmX - 30}})
        setTimeout(() => {
            setPlayer2Pos(oldVal => {return {...oldVal, rightArmX: oldVal.rightArmX + 30}})    
        }, 100)
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case "a":
                    player1MoveRight();
                    break;
                case "d":
                    player1MoveLeft();
                    break;
                case "w":
                    player1MoveUp();
                    break;
                case "s":
                    player1MoveDown();
                    break;
                case "e":
                    player1HitLeft();
                    break;
                case "q":
                    player1HitRight();
                    break;
                case "ArrowUp":
                    player2MoveUp();
                    break;
                case "ArrowDown":
                    player2MoveDown();
                    break;
                case "ArrowLeft":
                    player2MoveLeft();
                    break;
                case "ArrowRight":
                    player2MoveRight();
                    break;
                case "k":
                    player2HitLeft();
                    break;
                case "l":
                    player2HitRight();
                    break;
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [])
    

    return <section id="game" className="justify-center p-4">
        <canvas ref={canvasRef} className="border-solid border-black border-4" width={window.innerWidth - 100}>

        </canvas>
        <div className="flex gap-4">
        </div>
    </section>
}