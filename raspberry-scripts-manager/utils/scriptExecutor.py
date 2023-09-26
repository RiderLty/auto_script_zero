

import threading
import time
from random import randint

from utils.constants import *


class scriptExecutor:

    def __init__(self, handler) -> None:
        self.handler = handler

    def handler(self, type, code, value):
        # threading.Thread(target=self.handler, args=(type, code, value)).start()
        self.handler(type, code, value)

    def sleepWithCheck(self, sleepTime, breakFlag=lambda: False, unitSize=0.5):
        if sleepTime < unitSize:
            time.sleep(sleepTime)
        else:
            unites = int(sleepTime / unitSize)
            rest = sleepTime - unites * unitSize
            for __ in range(unites):
                if breakFlag():
                    return
                else:
                    time.sleep(unitSize)
            if breakFlag():
                return
            else:
                time.sleep(rest)

    def pressKey(self, key):
        self.handler(EV_KEY, key, DOWN)

    def releaseKey(self, key):
        self.handler(EV_KEY, key, UP)

    def mouseMove(self, x, y):
        self.handler(EV_MOUSE_MOVE, int(x), int(y))

    def executor(self, script, autoInterval=15, breakFlag=lambda: False):
        if script["ACTION"] == "LOOP":
            while True:
                for scriptUnit in script["DATA"]:
                    if breakFlag():
                        return
                    self.executor(scriptUnit)
                    self.sleepWithCheck(autoInterval / 1000, breakFlag)

        elif script["ACTION"] == "SINGLE":
            for scriptUnit in script["DATA"]:
                if breakFlag():
                    return
                self.executor(scriptUnit)
                self.sleepWithCheck(autoInterval / 1000, breakFlag)

        elif script["ACTION"] == "SLEEP":
            randSleep = script["DATA"]["INTERVAL"] + \
                randint(0, int(script["DATA"]["OFFSET"]))
            self.sleepWithCheck(randSleep / 1000, breakFlag)

        elif script["ACTION"] == "CLICK":
            self.pressKey(script["DATA"]["KEY"])
            randSleep = script["DATA"]["INTERVAL"] + \
                randint(0, int(script["DATA"]["OFFSET"]))
            self.sleepWithCheck(randSleep / 1000, breakFlag)
            self.releaseKey(script["DATA"]["KEY"])

        elif script["ACTION"] == "DOWN":
            self.pressKey(script["DATA"]["KEY"])

        elif script["ACTION"] == "UP":
            self.releaseKey(script["DATA"]["KEY"])

        elif script["ACTION"] == "MOUSE":
            self.mouseMove(script["DATA"]["X"], script["DATA"]["Y"])
