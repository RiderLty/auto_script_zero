import { useEffect, useRef, useState } from "react";
import Keyboard74 from "./keyboard/Keyboard74";
import Keyboard87 from "./keyboard/Keyboard87";
import ScriptCard from "./ScriptDisplays/ScriptCard";

export default function Test() {
    const [scriptData, setScriptData] = useState([]);

    const init = async () => {
        const resp = await fetch("/listScripts");
        const data = await resp.json();
        setScriptData(data.data);
    }

    const ws = useRef(null);

    const [runningScripts, setRunningScripts] = useState([]);
    const [downKeys, setDownKeys] = useState([]);
    useEffect(() => {
        const wsUrl = "ws://192.168.1.180:9005/ws";
        ws.current = new WebSocket(wsUrl);
        ws.current.onmessage = (e) => {
            const msg = JSON.parse(e.data);
            console.log(msg);
            if (msg.type === "scriptstate") {
                setRunningScripts(msg.data.data.map(item => `${item[0]}:${item[1]}`));
                console.log("runningScripts : ", msg.data.data.map(item => `${item[0]}:${item[1]}`));
            } else if (msg.type === "keyChange") {
                setDownKeys(msg.data);
            }
        }
        return () => {
            ws.current.close();
        }
    }, []);


    useEffect(() => {
        init()
    }, []);

    return (
        <div>
            <Keyboard74 downKeys={downKeys} />
            <Keyboard87 downKeys={downKeys} />
            {
                Object.keys(scriptData).map((nameSpace, index_nameSpace) => {
                    return scriptData[nameSpace].map((script, index) => {
                        return <ScriptCard script={script} running={runningScripts.includes(`${nameSpace}:${index}`)} nameSpace={nameSpace} index={index} />
                    })
                })
            }
        </div>
    )
}


// const ws = useRef(null);
// const [downKeys, setDownKeys] = useState([]);
// useEffect(() => {
//     const wsUrl = "ws://192.168.1.180:9005/ws";
//     ws.current = new WebSocket(wsUrl);
//     ws.current.onmessage = (e) => {
//         const msg = JSON.parse(e.data);
//         if(msg.type === "keyChange"){
//             setDownKeys(msg.data);
//         }
//     }
//     return () => {
//         ws.current.close();
//     }
// }, []);

// return (
//     <div style={{ width: "100vw" }}   >
//         <Keyboard74 downKeys={downKeys } />
//         <Keyboard87 downKeys={downKeys } />
//         <Keyboard104 downKeys={downKeys } />
//     </div>
// )