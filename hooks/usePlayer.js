const { useState } = require("react")
import { useSocket } from "@/context/socket"
import { cloneDeep } from "lodash"
import { useRouter } from "next/router"

const usePlayer = (myId, roomId, peer) => {
    const socket = useSocket()
    const [players, setPlayers] = useState({})
    const router = useRouter()
    const playersCopy = cloneDeep(players)

    const playerHighlighted = playersCopy[myId]
    delete playersCopy[myId]

    const nonHighlightedPlayers = playersCopy

    const leaveRoom = () => {
        socket.emit('user-leave', myId, roomId)
        console.log("Leaving room", roomId)

        peer?.disconnect();
        router.push('/')
    }

    const toggleAudio = () => {
        console.log('toggle audio')
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            copy[myId].muted = !copy[myId]?.muted
            return {...copy}
        })

        socket.emit('user-toggle-audio', myId, roomId)
    }

    const toggleVideo = () => {
        console.log('toggle video')
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            copy[myId].playing = !copy[myId].playing
            return {...copy}
        })

        socket.emit('user-toggle-video', myId, roomId)
    }





    return {players, setPlayers, playerHighlighted, nonHighlightedPlayers, toggleAudio, toggleVideo, leaveRoom}
}

export default usePlayer;

