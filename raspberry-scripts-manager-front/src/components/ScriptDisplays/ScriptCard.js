import { Button } from '@mui/material';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { styled } from "@mui/system";
import { useMemo } from 'react';


const Container = styled(Button)(({ theme }) => ({
    "&.MuiButtonBase-root": {
        fontSize: "13px",
        border: "2px solid",
        borderColor: theme.palette.keyBase.borderColor,
        backgroundColor: theme.palette.keyBase.backgroundColor,
        color: theme.palette.keyBase.color,
        borderRadius: 5,
        margin: 2,
        "&:hover": {
            backgroundColor: theme.palette.keyBase.backgroundColor,
        },
    },
}));



export default function ScriptCard(props) {
    const isSwitchType = useMemo(() => props.script["TYPE"] === "SWITCH", [props.script])

    const onClick = async () => {
        try {
            if (props.running) {
                console.log("停止脚本");
                const resp = await fetch(`/stopScript/${props.nameSpace}/${props.index}`);
                const data = await resp.json();
                console.log(data);
            }else{
                console.log("启动脚本");
                const resp = await fetch(`/runScript/${props.nameSpace}/${props.index}`);
                const data = await resp.json();
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container onClick={onClick} >
            <Typography variant="h3" component="div" gutterBottom>
                {props.script.NAME}
            </Typography>
            {isSwitchType ? <Switch checked={props.running} /> : null}
        </Container>
    )
}