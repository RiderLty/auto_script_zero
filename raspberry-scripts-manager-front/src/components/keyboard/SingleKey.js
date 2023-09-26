import { styled } from "@mui/system";
import { useEffect, useRef, useState } from "react";

const KeyButton = styled("div")(({ theme }) => ({
    fontSize: "13px",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid",
    borderColor: theme.palette.keyBase.borderColor,
    backgroundColor: theme.palette.keyBase.backgroundColor,
    color: theme.palette.keyBase.color,
    borderRadius: 5,
    margin: 2,
}));



const miniDiff = 64;


export default function (props) {
    
    const [down, setDown] = useState(false);
    const downTime = useRef(new Date().getTime());
    useEffect(() => {
        if(props.down){
            setDown(true);
            downTime.current = new Date().getTime();
        }else{
            const now = new Date().getTime();
            if(now - downTime.current < miniDiff){
                console.log("按键短按 延迟变化");
                setTimeout(() => {
                    setDown(false);
                }, miniDiff - (now - downTime.current));
            }else{
                setDown(false);
            }


        }
    
    
    
    },[props.down])

    return (
        <KeyButton
            sx={
                down ? {
                    width: props.width ? props.width : 64,
                    height: props.height ? props.height : 59,
                    backgroundColor: "keyBase.down.backgroundColor",
               
                } : {
                    height: props.height ? props.height : 59,
                    width: props.width ? props.width : 64,
                }
            }
        >
            {props.displayName}
        </KeyButton>
    )

}