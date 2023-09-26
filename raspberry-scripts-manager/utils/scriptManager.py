# script 设计思路
# 沿袭JSON的思想
# 主模块为入口
# 使用递归处理
# 一个对象
# 一个函数 处理所有
import json
import os
import threading
import time
from unittest import runner


class scriptManager:
    def __init__(self, scriptExecutor):
        self.scriptExecutor = scriptExecutor
        self.modulesDir = os.path.join(os.path.dirname(
            os.path.abspath(__file__)), "modules")
        self.runningScripts = set()

    def destroy(self,):
        self.runningScripts.clear()

    def listScripts(self,):
        scripts = {}
        for file in os.listdir(self.modulesDir):
            name = file.split(".")[0]
            data = json.load(
                open(os.path.join(self.modulesDir, file), "r", encoding="utf-8"))
            scripts[name] = data
        return {"code": 0, "msg": "获取脚本列表成功", "data": scripts}

    def getState(self):
        return {"code": 0, "msg": "获取状态成功", "data": list(self.runningScripts)}

    def runScript(self, nameSpace, scriptIndex):
        try:
            script = json.load(open(os.path.join(
                self.modulesDir, nameSpace+".json"), "r", encoding="utf-8"))[scriptIndex]
            autoInterval = script["AUTOINTERVAL"]
            entrance = script["SCRIPTS"]
            type = script["TYPE"]
            runnerKey = (nameSpace, scriptIndex)
            def breakFlag(): return runnerKey not in self.runningScripts
            if runnerKey in self.runningScripts:
                return {"code": 2, "msg": "脚本已在运行"}
            else:
                if type == "SWITCH":  # 开关脚本 有开关控制执行
                    self.runningScripts.add(runnerKey)
                    threading.Thread(target=self.scriptExecutor, args=(
                        entrance, autoInterval, breakFlag)).start()
                elif type == "BUTTON":  # 按钮脚本 无状态 所以不放入runningScripts
                    threading.Thread(target=self.scriptExecutor, args=(
                        entrance, autoInterval, lambda:False)).start()
                else:
                    raise Exception("脚本类型错误")
                return {"code": 0, "msg": "脚本已开始运行"}
        except Exception as e:
            return {"code": 1, "msg": "脚本不存在"+str(e)}

    def stopScript(self, nameSpace, scriptIndex):
        try:
            runnerKey = (nameSpace, scriptIndex)
            if runnerKey in self.runningScripts:
                self.runningScripts.remove(runnerKey)
                return {"code": 0, "msg": "脚本已停止"}
            else:
                return {"code": 2, "msg": "脚本未运行"}
        except Exception as e:
            return {"code": 1, "msg": "脚本不存在"}
