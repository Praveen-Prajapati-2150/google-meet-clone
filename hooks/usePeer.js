import { useSocket } from "@/context/socket"
import { useRouter } from "next/router";

const { useState, useEffect, useRef } = require("react")

// import peer from 'peerjs'

// here all is render on the server but in the useEffect all the code render in the client side

// this the trigger component when someone join the room

const usePeer = () => {

    const isPeerSet = useRef(false)
    const roomId = useRouter().query.roomId;

    const socket = useSocket()

    const [peer, setPeer] = useState(null)
    const [myId, setMyId] = useState('')


    useEffect(() => {
        if(isPeerSet.current || !roomId || !socket) return;
        isPeerSet.current = true;

        (async function initPeer(){
            const myPeer = new (await import('peerjs')).default()
            // we are importing peerjs here because nextJS doesn't support the above(on the top) import of the peerjs

            setPeer(myPeer)

            myPeer.on('open', (id) => {
                console.log(`your peer id is ${id}`)
                console.log(`your room id is ${roomId}`)
                setMyId(id)
                socket?.emit('join-room', roomId, id)
            })
        })()
    }, [roomId, socket])

    return {
        peer, myId
    }
}

export default usePeer