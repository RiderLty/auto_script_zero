import { styled } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import SingleKey from "./SingleKey";


const Blank = (props) => <div
    style={{
        width: props.width,
    }}
/>
const Container = styled("div")(({ theme }) => ({
    width: 1518,
    border: "2px solid",
    borderColor: theme.palette.keyBase.borderColor,
    borderRadius: 5,
    margin: 2,
}));


export default function Keyboard104(props) {
    const ref = useRef(null);
    const [zoom, setZoom] = useState(0);

    useEffect(() => {
        if (ref.current) {
            setZoom(ref.current.offsetWidth / 1518);
        }
    }, [ref.current]);

    const resizeWindow = (e) => {
        if (ref.current) {
            setZoom(ref.current.offsetWidth / 1518);
        }
    }

    useEffect(() => {
        window.addEventListener("resize", resizeWindow);
        return () => {
            window.removeEventListener("resize", resizeWindow);
        }
    }, [])


    return (
        <div ref={ref} style={{ width: "100%", }} >
            <Container sx={{ zoom: zoom, }} >
                <div style={{ display: "flex" }}>
                    <SingleKey down={props.downKeys.includes("KEY_ESC")} displayName={"ESC"} />
                    <Blank width={46} />
                    <SingleKey down={props.downKeys.includes("KEY_F1")} displayName={"F1"} />
                    <SingleKey down={props.downKeys.includes("KEY_F2")} displayName={"F2"} />
                    <SingleKey down={props.downKeys.includes("KEY_F3")} displayName={"F3"} />
                    <SingleKey down={props.downKeys.includes("KEY_F4")} displayName={"F4"} />
                    <Blank width={46} />
                    <SingleKey down={props.downKeys.includes("KEY_F5")} displayName={"F5"} />
                    <SingleKey down={props.downKeys.includes("KEY_F6")} displayName={"F6"} />
                    <SingleKey down={props.downKeys.includes("KEY_F7")} displayName={"F7"} />
                    <SingleKey down={props.downKeys.includes("KEY_F8")} displayName={"F8"} />
                    <Blank width={46} />
                    <SingleKey down={props.downKeys.includes("KEY_F9")} displayName={"F9"} />
                    <SingleKey down={props.downKeys.includes("KEY_F10")} displayName={"F10"} />
                    <SingleKey down={props.downKeys.includes("KEY_F11")} displayName={"F11"} />
                    <SingleKey down={props.downKeys.includes("KEY_F12")} displayName={"F12"} />
                    <Blank width={8} />
                    <SingleKey down={props.downKeys.includes("KEY_PRINT")} displayName={"PRIT"} />
                    <SingleKey down={props.downKeys.includes("KEY_SCROLLLOCK")} displayName={"SCROLL"} />
                    <SingleKey down={props.downKeys.includes("KEY_PAUSE")} displayName={"PAUSE"} />
                    <Blank width={8} />

                    <SingleKey down={props.downKeys.includes("LEDS")} displayName={""} width={268} />
                </div>
                <div style={{ display: "flex", marginTop: 6 }}>
                    <SingleKey down={props.downKeys.includes("KEY_BACKQUOTE")} displayName={"~"} />
                    <SingleKey down={props.downKeys.includes("KEY_1")} displayName={"1"} />
                    <SingleKey down={props.downKeys.includes("KEY_2")} displayName={"2"} />
                    <SingleKey down={props.downKeys.includes("KEY_3")} displayName={"3"} />
                    <SingleKey down={props.downKeys.includes("KEY_4")} displayName={"4"} />
                    <SingleKey down={props.downKeys.includes("KEY_5")} displayName={"5"} />
                    <SingleKey down={props.downKeys.includes("KEY_6")} displayName={"6"} />
                    <SingleKey down={props.downKeys.includes("KEY_7")} displayName={"7"} />
                    <SingleKey down={props.downKeys.includes("KEY_8")} displayName={"8"} />
                    <SingleKey down={props.downKeys.includes("KEY_9")} displayName={"9"} />
                    <SingleKey down={props.downKeys.includes("KEY_0")} displayName={"0"} />
                    <SingleKey down={props.downKeys.includes("KEY_MINUS")} displayName={"-"} />
                    <SingleKey down={props.downKeys.includes("KEY_EQUAL")} displayName={"="} />
                    <SingleKey down={props.downKeys.includes("KEY_BACKSPACE")} displayName={"BACKSPACE"} width={134} />
                    <Blank width={8} />
                    <SingleKey down={props.downKeys.includes("KEY_INSERT")} displayName={"INSERT"} />
                    <SingleKey down={props.downKeys.includes("KEY_HOME")} displayName={"HOME"} />
                    <SingleKey down={props.downKeys.includes("KEY_PAGEUP")} displayName={"PAGE▲"} />
                    <Blank width={8} />
                    <SingleKey down={props.downKeys.includes("KEY_NUMLOCK")} displayName={"NUM"} />
                    <SingleKey down={props.downKeys.includes("KEY_DIVIDE")} displayName={"/"} />
                    <SingleKey down={props.downKeys.includes("KEY_MULTIPLY")} displayName={"*"} />
                    <SingleKey down={props.downKeys.includes("KEY_SUBTRACT")} displayName={"-"} />

                </div>
                <div style={{ display: "flex", marginTop: 2 }}>
                    <SingleKey down={props.downKeys.includes("KEY_TAB")} displayName={"TAB"} width={98} />
                    <SingleKey down={props.downKeys.includes("KEY_Q")} displayName={"Q"} />
                    <SingleKey down={props.downKeys.includes("KEY_W")} displayName={"W"} />
                    <SingleKey down={props.downKeys.includes("KEY_E")} displayName={"E"} />
                    <SingleKey down={props.downKeys.includes("KEY_R")} displayName={"R"} />
                    <SingleKey down={props.downKeys.includes("KEY_T")} displayName={"T"} />
                    <SingleKey down={props.downKeys.includes("KEY_Y")} displayName={"Y"} />
                    <SingleKey down={props.downKeys.includes("KEY_U")} displayName={"U"} />
                    <SingleKey down={props.downKeys.includes("KEY_I")} displayName={"I"} />
                    <SingleKey down={props.downKeys.includes("KEY_O")} displayName={"O"} />
                    <SingleKey down={props.downKeys.includes("KEY_P")} displayName={"P"} />
                    <SingleKey down={props.downKeys.includes("KEY_LBRACKET")} displayName={"["} />
                    <SingleKey down={props.downKeys.includes("KEY_RBRACKET")} displayName={"]"} />
                    <SingleKey down={props.downKeys.includes("KEY_BACKSLASH")} displayName={"\\"} width={100} />
                    <Blank width={8} />
                    <SingleKey down={props.downKeys.includes("KEY_DELETE")} displayName={"DELETE"} />
                    <SingleKey down={props.downKeys.includes("KEY_END")} displayName={"END"} />
                    <SingleKey down={props.downKeys.includes("KEY_PAGEDOWN")} displayName={"PAGE▼"} />
                    <Blank width={8} />
                    <SingleKey down={props.downKeys.includes("KEY_KP_7")} displayName={"7"} />
                    <SingleKey down={props.downKeys.includes("KEY_KP_8")} displayName={"8"} />
                    <SingleKey down={props.downKeys.includes("KEY_KP_9")} displayName={"9"} />
                    <div style={{ height: 59, overflow: "visible" }}  >
                        <SingleKey down={props.downKeys.includes("KEY_KP_PLUS")} displayName={"+"} height={124} />
                    </div>

                </div>
                <div style={{ display: "flex", marginTop: 2 }} >
                    <SingleKey down={props.downKeys.includes("KEY_CAPSLOCK")} displayName={"CAPSLOCK"} width={134} />
                    <SingleKey down={props.downKeys.includes("KEY_A")} displayName={"A"} />
                    <SingleKey down={props.downKeys.includes("KEY_S")} displayName={"S"} />
                    <SingleKey down={props.downKeys.includes("KEY_D")} displayName={"D"} />
                    <SingleKey down={props.downKeys.includes("KEY_F")} displayName={"F"} />
                    <SingleKey down={props.downKeys.includes("KEY_G")} displayName={"G"} />
                    <SingleKey down={props.downKeys.includes("KEY_H")} displayName={"H"} />
                    <SingleKey down={props.downKeys.includes("KEY_J")} displayName={"J"} />
                    <SingleKey down={props.downKeys.includes("KEY_K")} displayName={"K"} />
                    <SingleKey down={props.downKeys.includes("KEY_L")} displayName={"L"} />
                    <SingleKey down={props.downKeys.includes("KEY_SEMICOLON")} displayName={";"} />
                    <SingleKey down={props.downKeys.includes("KEY_QUOTE")} displayName={"'"} />
                    <SingleKey down={props.downKeys.includes("KEY_ENTER")} displayName={"ENTER"} width={132} />
                    <Blank width={220} />
                    <SingleKey down={props.downKeys.includes("KEY_KP_4")} displayName={"4"} />
                    <SingleKey down={props.downKeys.includes("KEY_KP_5")} displayName={"5"} />
                    <SingleKey down={props.downKeys.includes("KEY_KP_6")} displayName={"6"} />

                </div>
                <div style={{ display: "flex", marginTop: 2 }} >
                    <SingleKey down={props.downKeys.includes("KEY_LEFT_SHIFT")} displayName={"SHIFT"} width={170} />
                    <SingleKey down={props.downKeys.includes("KEY_Z")} displayName={"Z"} />
                    <SingleKey down={props.downKeys.includes("KEY_X")} displayName={"X"} />
                    <SingleKey down={props.downKeys.includes("KEY_C")} displayName={"C"} />
                    <SingleKey down={props.downKeys.includes("KEY_V")} displayName={"V"} />
                    <SingleKey down={props.downKeys.includes("KEY_B")} displayName={"B"} />
                    <SingleKey down={props.downKeys.includes("KEY_N")} displayName={"N"} />
                    <SingleKey down={props.downKeys.includes("KEY_M")} displayName={"M"} />
                    <SingleKey down={props.downKeys.includes("KEY_COMMA")} displayName={","} />
                    <SingleKey down={props.downKeys.includes("KEY_PERIOD")} displayName={"."} />
                    <SingleKey down={props.downKeys.includes("KEY_SLASH")} displayName={"/"} />
                    <SingleKey down={props.downKeys.includes("KEY_RIGHT_SHIFT")} displayName={"SHIFT"} width={165} />
                    <Blank width={76} />
                    <SingleKey down={props.downKeys.includes("KEY_UP")} displayName={"▲"} />
                    <Blank width={75} />
                    <SingleKey down={props.downKeys.includes("KEY_KP_1")} displayName={"1"} />
                    <SingleKey down={props.downKeys.includes("KEY_KP_2")} displayName={"2"} />
                    <SingleKey down={props.downKeys.includes("KEY_KP_3")} displayName={"3"} />
                    <div style={{ height: 59, overflow: "visible" }}  >
                        <SingleKey down={props.downKeys.includes("KEY_KP_ENTER")} displayName={"ENTER"} height={124} />
                    </div>
                </div>
                <div style={{ display: "flex", marginTop: 2 }} >
                    <SingleKey down={props.downKeys.includes("KEY_LEFT_CONTROL")} displayName={"CTRL"} />
                    <SingleKey down={props.downKeys.includes("KEY_LEFT_GUI")} displayName={"win"} />
                    <SingleKey down={props.downKeys.includes("KEY_LEFT_ALT")} displayName={"ALT"} />
                    <SingleKey down={props.downKeys.includes("KEY_SPACE")} displayName={"SPACE"} width={500} />
                    <SingleKey down={props.downKeys.includes("KEY_RIGHT_ALT")} displayName={"ALT"} />
                    <SingleKey down={props.downKeys.includes("KEY_RIGHT_GUI")} displayName={"win"} />
                    <SingleKey down={props.downKeys.includes("KEY_APPLICATION")} displayName={"app"} />
                    <SingleKey down={props.downKeys.includes("KEY_RIGHT_CONTROL")} displayName={"CTRL"} width={107} />
                    <Blank width={8} />
                    <SingleKey down={props.downKeys.includes("KEY_LEFT")} displayName={"◄"} />
                    <SingleKey down={props.downKeys.includes("KEY_DOWN")} displayName={"▼"} />
                    <SingleKey down={props.downKeys.includes("KEY_RIGHT")} displayName={"►"} />
                    <Blank width={8} />
                    <SingleKey down={props.downKeys.includes("KEY_KP_0")} displayName={"0"} width={131} />
                    <SingleKey down={props.downKeys.includes("KEY_KP_DECIMAL")} displayName={"."} />
                </div>
            </Container>
        </div >
    )
}