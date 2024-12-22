import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react"
import { useRef } from "react"


export default function Game() {
    // TODO: Implement the game logic to move back when hit
    // TODO: Implement logic to play with bot
    // TODO: implement logic for game over
    const canvasRef = useRef(null);
    const [player1Pos, setPlayer1Pos] = useState({headX: 50, headY:50, leftArmX: 80, leftArmY: 100, rightArmX: 80, rightArmY: 25})
    const [player2Pos, setPlayer2Pos] = useState({headX: 150, headY:50, leftArmX: 170, leftArmY: 100, rightArmX: 170, rightArmY: 25})

    const [player1Hit, setPlayer1Hit] = useState(0);
    const [player2Hit, setPlayer2Hit] = useState(0);

    const drawPlayer1 = useCallback((ctx) => {
        ctx.fillStyle = "black"
        ctx.fillRect(player1Pos.headX, player1Pos.headY, 50, 25)
        ctx.beginPath();
        ctx.arc(player1Pos.leftArmX, player1Pos.leftArmY , 10, 0, 2*Math.PI)
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(player1Pos.rightArmX, player1Pos.rightArmY, 10, 0, 2*Math.PI)
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.stroke();
    }, [player1Pos])

    const drawPlayer2 = useCallback((ctx) => {
        ctx.fillStyle = "red"
        ctx.fillRect(player2Pos.headX, player2Pos.headY, 50, 25)
        ctx.beginPath();
        ctx.arc(player2Pos.leftArmX, player2Pos.leftArmY , 10, 0, 2*Math.PI)
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(player2Pos.rightArmX, player2Pos.rightArmY, 10, 0, 2*Math.PI)
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
    }, [player2Pos])

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        drawPlayer1(context)
        drawPlayer2(context)
    },[drawPlayer1, drawPlayer2])


    function checkHit(player1, player2, hitPlayer) {
        // Distance between player1 arm and player2 head
        const player1RitghArmDiff = Math.abs(player1.rightArmX - player2.headX);
        const player1RightArmYdiff = Math.abs(player1.rightArmY - player2.headY);

        const player1LeftArmDiff = Math.abs(player1.leftArmX - player2.headX);
        const player1LeftArmYdiff = Math.abs(player1.leftArmY - player2.headY);

        const player2RightArmDiff = Math.abs(player2.rightArmX - player1.headX);
        const player2RightArmYdiff = Math.abs(player2.rightArmY - player1.headY);

        const player2LeftArmDiff = Math.abs(player2.leftArmX - player1.headX);
        const player2LeftArmYdiff = Math.abs(player2.leftArmY - player1.headY);
        // check if player1 hits player2
        const moveOnHit = 30;
        if (hitPlayer === 1) {
            if (player1LeftArmDiff === 30 && player1LeftArmYdiff === 90) {
                // player1 hit player2 with left arm
                setPlayer1Hit(oldVal => oldVal + 1);
                setTimeout(() => {
                    setPlayer2Pos(oldVal => {
                        return {...oldVal, headX: oldVal.headX + moveOnHit, leftArmX: oldVal.leftArmX + moveOnHit, rightArmX: oldVal.rightArmX + moveOnHit}
                    })
                }, 200)
            } else if (player1RitghArmDiff === 30 && player1RightArmYdiff === 65) {
                // player1 hit player2 with right arm
                setPlayer1Hit(oldVal => oldVal + 1)
                setTimeout(() => {
                    setPlayer2Pos(oldVal => {
                        return {...oldVal, headX: oldVal.headX + moveOnHit, leftArmX: oldVal.leftArmX + moveOnHit, rightArmX: oldVal.rightArmX + moveOnHit}
                    })
                }, 200)
            }
         } else {
            // player 2 hit check
             if (player2RightArmDiff === 50 && player2RightArmYdiff === 15) {
                // player2 hit player1 with right arm
                setPlayer2Hit(oldVal => oldVal + 1);
                setTimeout(() => {
                    setPlayer1Pos(oldVal => {
                        return {...oldVal, headX: oldVal.headX - moveOnHit, leftArmX: oldVal.leftArmX - moveOnHit, rightArmX: oldVal.rightArmX - moveOnHit}
                    })
                }, 200)
            } else if (player2LeftArmDiff === 50 && player2LeftArmYdiff === 10) {
                // player2 hit player1 with left arm
                setPlayer2Hit(oldVal => oldVal + 1);
                setTimeout(() => {
                    setPlayer1Pos(oldVal => {
                        return {...oldVal, headX: oldVal.headX - moveOnHit, leftArmX: oldVal.leftArmX - moveOnHit, rightArmX: oldVal.rightArmX - moveOnHit}
                    })
                }, 200)
            }
        }
    }

    // move player 1
    const player1MoveUp = useCallback(() => {
        setPlayer1Pos(oldVal => {
            return {...oldVal, headY: oldVal.headY - 10, leftArmY: oldVal.leftArmY - 10, rightArmY: oldVal.rightArmY - 10}
        })
    }, [])

    
    // move player 2
    const player2MoveUp = useCallback(() => {
        setPlayer2Pos(oldVal => {
            return {...oldVal, headY: oldVal.headY - 10, leftArmY: oldVal.leftArmY - 10, rightArmY: oldVal.rightArmY - 10}
        })
    }, [])

    // move player 1
    const player1MoveDown = useCallback(() => {
        setPlayer1Pos(oldVal => {
            return {...oldVal, headY: oldVal.headY + 10, leftArmY: oldVal.leftArmY + 10, rightArmY: oldVal.rightArmY + 10}
        })
    }, [])

    // move player 2
    const player2MoveDown = useCallback(() => {
        setPlayer2Pos(oldVal => {
            return {...oldVal, headY: oldVal.headY + 10, leftArmY: oldVal.leftArmY + 10, rightArmY: oldVal.rightArmY + 10}
        })
    }, [])
    
    // move player 1
    const player1MoveLeft = useCallback(() => {
        setPlayer1Pos(oldVal => {
            return {...oldVal, headX: oldVal.headX + 10, leftArmX: oldVal.leftArmX + 10, rightArmX: oldVal.rightArmX + 10}
        })
    }, [])

    
    // move player 2
    const player2MoveLeft = useCallback(() => {
        setPlayer2Pos(oldVal => {
            return {...oldVal, headX: oldVal.headX - 10, leftArmX: oldVal.leftArmX - 10, rightArmX: oldVal.rightArmX - 10}
        })
    }, [])
        
    // move player 1
    const player1MoveRight = useCallback(() =>{ 
        setPlayer1Pos(oldVal => {
            return {...oldVal, headX: oldVal.headX - 10, leftArmX: oldVal.leftArmX - 10, rightArmX: oldVal.rightArmX - 10}
        })
    }, [])

       
    // move player 2
    const player2MoveRight = useCallback(()  =>{
        setPlayer2Pos(oldVal => {
            return {...oldVal, headX: oldVal.headX + 10, leftArmX: oldVal.leftArmX + 10, rightArmX: oldVal.rightArmX + 10}
        })
    }, [])

    // player1 hit
    const player1HitLeft = useCallback(() => {
        setPlayer1Pos(oldVal => {
            const newVal = {...oldVal, leftArmX: oldVal.leftArmX + 30}
            checkHit(newVal, player2Pos, 1);
            return newVal
        })
       
        setTimeout(() => {
            setPlayer1Pos(oldVal => {return {...oldVal, leftArmX: oldVal.leftArmX - 30}})    
        }, 100)
    }, [player2Pos])

    // player2 hit
    const player2HitLeft = useCallback(() =>{
        setPlayer2Pos(oldVal => {
            const newVal = {...oldVal, leftArmX: oldVal.leftArmX - 30}
            checkHit(player1Pos, newVal, 2);
            return newVal
        })
        setTimeout(() => {
            setPlayer2Pos(oldVal => {return {...oldVal, leftArmX: oldVal.leftArmX + 30}})    
        }, 100)
    }, [player1Pos])
    
    
    // player1 hit
    const player1HitRight = useCallback(() => {
        setPlayer1Pos(oldVal => {
            const newVal = {...oldVal, rightArmX: oldVal.rightArmX + 30}
            checkHit(newVal, player2Pos, 1);
            return newVal}
        )
        setTimeout(() => {
            setPlayer1Pos(oldVal => {return {...oldVal, rightArmX: oldVal.rightArmX - 30}})    
        }, 100)
    }, [player2Pos])

    // player2 hit
    const player2HitRight = useCallback(() => {
        setPlayer2Pos(oldVal => {
            const newVal = {...oldVal, rightArmX: oldVal.rightArmX - 30}
            checkHit(player1Pos, newVal, 2);
            return newVal}
        )
        setTimeout(() => {
            setPlayer2Pos(oldVal => {return {...oldVal, rightArmX: oldVal.rightArmX + 30}})    
        }, 100)
    }, [player1Pos])

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
    }, [player1HitLeft, player2HitLeft, player1HitRight, player2HitRight, player1MoveDown, player1MoveLeft, player1MoveRight, player1MoveUp, player2MoveDown, player2MoveLeft, player2MoveRight, player2MoveUp])
    

    return <section id="game" className="grid justify-center p-4">
        <div className="flex gap-4 p-4 justify-center">
            <p><span className="text-2xl font-bold">P1 HITS:</span><span className="text-2xl font-bold bg-blue-400 p-2 rounded-xl">{player1Hit}</span></p>
            <p><span className="text-2xl font-bold">P2 HITS:</span><span className="text-2xl font-bold bg-red-400 p-2 rounded-xl">{player2Hit}</span></p>
        </div>
        <canvas ref={canvasRef} className="border-solid border-black border-4" width={600} height={600}>
        </canvas>
        <div className="flex gap-4 justify-center p-4">
            <div>
                <p className="text-2xl font-bold">Player 1</p>
                <p>Move: A, D, W, S</p>
                <p>Hit: E, Q</p>
            </div>
            <div>
                <p className="text-2xl font-bold">Player 2</p>
                <p>Move: Arrow Up, Arrow Down, Arrow Left, Arrow Right</p>
                <p>Hit: K, L</p>
            </div>
        </div>
    </section>
}