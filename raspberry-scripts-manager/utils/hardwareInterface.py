import os
import queue
import threading

from utils.constants import *


def setBit(value, index, bit):
    mask = 1 << index
    return (value & ~mask) if bit == 0 else (value | mask)


class Mouse:
    def __init__(self, path) -> None:
        self.fd = os.open(path, os.O_RDWR)
        self.btns = 0x00
        try:
            os.write(self.fd, b'\x00' * 5)
        except Exception as e:
            raise e

    def __del__(self):
        try:
            os.write(self.fd, b'\x00' * 5)
            os.close(self.fd)
            print("Mouse closed")
        except Exception as e:
            pass

    def report(self, x=0, y=0, wh=0, l=None, r=None, m=None):
        self.btns = setBit(self.btns, MOUSE_BTN_LEFT,
                           l) if l is not None else self.btns
        self.btns = setBit(self.btns, MOUSE_BTN_RIGHT,
                           r) if r is not None else self.btns
        self.btns = setBit(self.btns, MOUSE_BTN_MIDDLE,
                           m) if m is not None else self.btns
        write_bytes = (self.btns).to_bytes(1, byteorder='little', signed=False)
        write_bytes += (x).to_bytes(2, 'little', signed=True)
        write_bytes += (y).to_bytes(2, 'little', signed=True)
        write_bytes += (wh).to_bytes(2, 'little', signed=True)
        os.write(self.fd, write_bytes)

    def move(self, x=0, y=0):
        self.report(x=x, y=y)

    def btn_press(self, btn):
        if btn == MOUSE_BTN_LEFT:
            self.report(l=1)
        elif btn == MOUSE_BTN_RIGHT:
            self.report(r=1)
        elif btn == MOUSE_BTN_MIDDLE:
            self.report(m=1)

    def btn_release(self, btn):
        if btn == MOUSE_BTN_LEFT:
            self.report(l=0)
        elif btn == MOUSE_BTN_RIGHT:
            self.report(r=0)
        elif btn == MOUSE_BTN_MIDDLE:
            self.report(m=0)

    def wheel_move(self, wh=0):
        self.report(wh=wh)


class KeyBoard:
    def __init__(self, path):
        self.fd = os.open(path, os.O_RDWR)
        try:
            os.write(self.fd, b"\x00" * 8)
        except Exception as e:
            raise e
        self.spacialKey = 0x00
        self.special_key_order = [KEY_LEFT_CTRL, KEY_LEFT_SHIFT, KEY_LEFT_ALT,
                                  KEY_LEFT_GUI, KEY_RIGHT_CTRL, KEY_RIGHT_SHIFT, KEY_RIGHT_ALT, KEY_RIGHT_GUI]
        self.key_state = set()

    def __del__(self):
        try:
            os.write(self.fd, b"\x00" * 8)
            os.close(self.fd)
            print("keyboard closed")
        except Exception as e:
            pass

    def report(self):
        write_bytes = (self.spacialKey).to_bytes(
            1, byteorder='little', signed=False)
        write_bytes += b'\x00'  # 保留
        for down_key in self.key_state:
            write_bytes += down_key
        for __ in range(6 - len(self.key_state)):
            write_bytes += b'\x00'
        os.write(self.fd, write_bytes)

    def key_press(self, key):
        if key in self.special_key_order:
            self.spacialKey = setBit(
                self.spacialKey, self.special_key_order.index(key), 1)
        else:
            if len(self.key_state) < 6:
                self.key_state.add(key)
            else:
                return
        self.report()

    def key_release(self, key):
        if key in self.special_key_order:
            self.spacialKey = setBit(
                self.spacialKey, self.special_key_order.index(key), 0)
        else:
            if key in self.key_state:
                self.key_state.remove(key)
            else:
                return
        self.report()


class KeyBoardMouseInterface:

    def __init__(self, onKeyChange=lambda downKeys: None, onMouseMove=lambda x, y: None) -> None:
        self.onKeyChange = onKeyChange
        self.onMouseMove = onMouseMove

        self.eventQueue = queue.Queue()

        self.running = True
        threading.Thread(target=self.loopHandel).start()

        self.keyboard = KeyBoard(r'/dev/hidg0')
        self.mouse = Mouse(r'/dev/hidg1')
        # self.keyboard = KeyBoard("P:\\KB.bin")
        # self.mouse = Mouse("p:\\MOUSE.bin")

        self.downingKey = set()  # 包括鼠标

    def destroy(self):
        # 虽然destroy了
        # 但是还是等待队列中的事件处理完毕
        # 然后再关闭
        # 但是此时并没有 __del__
        # 所以放入事件并不会报错
        # 只是不再响应
        self.handelEvent(EV_EXIT, 0, 0)

    def loopHandel(self):
        while True:
            (type, arg_1, arg_2) = self.eventQueue.get()
            # print("type:", type, "arg_1:", arg_1, "arg_2:", arg_2)
            try:
                if type == EV_EXIT:
                    break
                elif type == EV_KEY:
                    if arg_1 in keyname2scancode:
                        scancode = keyname2scancode[arg_1]
                        if scancode in [MOUSE_BTN_LEFT, MOUSE_BTN_MIDDLE, MOUSE_BTN_RIGHT]:
                            if arg_2 == DOWN:
                                self.mouse.btn_press(scancode)
                                self.downingKey.add(arg_1)
                            else:
                                self.mouse.btn_release(scancode)
                                self.downingKey.remove(arg_1)
                        else:
                            if arg_2 == DOWN:
                                self.keyboard.key_press(scancode)
                                self.downingKey.add(arg_1)
                            else:
                                self.keyboard.key_release(scancode)
                                self.downingKey.remove(arg_1)
                        self.onKeyChange(list(self.downingKey))

                elif type == EV_MOUSE_MOVE:
                    self.mouse.move(arg_1, arg_2)
                    self.onMouseMove(arg_1, arg_2)
            except Exception as e:
                print(e)

                
    def handelEvent(self, type, arg_1, arg_2):
        self.eventQueue.put((type, arg_1, arg_2))
