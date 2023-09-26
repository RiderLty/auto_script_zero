import asyncio
import json
import os
import sqlite3
import ssl
import time
from typing import List

import uvicorn
from fastapi import (FastAPI, HTTPException, Request, Response, WebSocket,
                     WebSocketDisconnect)
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse

from utils.hardwareInterface import *
from utils.scriptExecutor import scriptExecutor
from utils.scriptManager import *
from utils.tools import *

ssl._create_default_https_context = ssl._create_unverified_context


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        # self.lock = asyncio.Lock()
        self.syncLock = threading.Lock()

    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.active_connections.append(ws)
        logger.info(f"WebSocket[{ws.client.host}:{ws.client.port}] 连接成功")

    def disconnect(self, ws: WebSocket):
        logger.info(f"WebSocket[{ws.client.host}:{ws.client.port}] 断开链接")
        self.active_connections.remove(ws)

    async def broadcast(self, message):
        for connection in self.active_connections:
            with self.syncLock:
                await connection.send_json(message)

    async def onMessage(self, msg, ws):
        start = time.time()
        print(msg)
        logger.warning(
            f"处理消息{msg} from {ws.client.host}:{ws.client.port} 耗时{time.time()-start}")


app = FastAPI(async_request_limit=1000)
wsManager = ConnectionManager()


def sendWS(message):
    global wsManager

    async def sendMessage():
        await wsManager.broadcast(message)
    try:
        threading.Thread(target=asyncio.run, args=(sendMessage(),)).start()
    except Exception as e:
        logger.error(f"发送消息失败 {e}")


def onKeyChange(downingKeys: list):
    sendWS({
        "type": "keyChange",
        "data": downingKeys
    })


def onMouseMove(x, y):
    sendWS({
        "type": "mouseMove",
        "data": [x, y]
    })


KeyBoardMouseInterfaceInstance = KeyBoardMouseInterface(
    onKeyChange, onMouseMove)
scriptExecutorInstance = scriptExecutor(
    KeyBoardMouseInterfaceInstance.handelEvent)
scriptManagerInstance = scriptManager(scriptExecutorInstance.executor)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await wsManager.connect(websocket)
    await websocket.send_json({
        "type": "scriptstate",
        "data": scriptManagerInstance.getState()
    })
    try:
        while True:
            await websocket.receive_text()
    except Exception:
        wsManager.disconnect(websocket)


@app.get("/listScripts")
def listScripts():
    return scriptManagerInstance.listScripts()


@app.get("/getState")
def getState():
    return scriptManagerInstance.getState()


@app.get("/runScript/{nameSpace}/{scriptIndex}")
async def runScript(nameSpace: str, scriptIndex: int):
    res = scriptManagerInstance.runScript(nameSpace, scriptIndex)
    sendWS({
        "type": "scriptstate",
        "data": scriptManagerInstance.getState()
    })
    return res


@app.get("/stopScript/{nameSpace}/{scriptIndex}")
async def stopScript(nameSpace: str, scriptIndex: int):
    res = scriptManagerInstance.stopScript(nameSpace, scriptIndex)
    sendWS({
        "type": "scriptstate",
        "data": scriptManagerInstance.getState()
    })
    return res

# 启动与停止之后
# 如果有WS则无任何操作
# 没有WS 则查询接口

# print(scriptManagerInstance.listScripts())
# print(scriptManagerInstance.runScript("warframe", "猫甲挂机"))
# print(json.dumps(scriptManagerInstance.getState(), indent=4, ensure_ascii=False))


@app.get("/")
def index():
    return "Hello, World!"

# time.sleep(3)
# KeyBoardMouseInterfaceInstance.destroy()
# scriptManagerInstance.destroy()


if __name__ == "__main__":
    uvicorn.run(
        app, host="0.0.0.0", port=int(os.environ.get("PORT", 9005)), log_level="error"
    )


# API提供控制接口
# WS进行单向状态同步
# 在不支持websocket的情况下，可以通过http协议进行状态同步
