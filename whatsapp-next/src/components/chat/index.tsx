import {
    AttachFile,
    SearchOutlined,
    InsertEmoticon,
    Mic,
} from "@mui/icons-material";
import { Avatar, FormControl, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IMessage } from "../../interface";
import ChatBubble from "./ChatBubble";
import React, { useState } from "react";
import axios from "../../axios";
import styles from "../../styles/Chat.module.css";
import auth from "../../firebase";
import { UserAuth } from "../../context/UserContext";
import { useRouter } from "next/router";

export default function Chat({ messages }: any) {
    const { user, logout } = UserAuth();
    const [input, setInput] = useState("");
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    const handleLogOut = async () => {
        try {
            await logout();
            router.push("/login");
        } catch (e) {
            console.log(e);
        }
    };

    const sendMessage = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        await axios.post("/api/v1/messages/new", {
            message: input,
            name: "DEMO APP",
            timestamp: "Just now",
            received: false,
        });

        setInput("");
    };
    return (
        <div className={styles.chat}>
            <div className={styles.chatHeader}>
                <Avatar />

                <div className={styles.chatHeaderInfo}>
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>

                <div className={styles.chatHeaderRight}>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton onClick={handleOpen}>
                        <MoreVertIcon />
                    </IconButton>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={handleClose}>{user?.email}</MenuItem>
                        {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>

            <div className={styles.chatBody}>
                {messages?.map((message: IMessage, index: Number) => (
                    <ChatBubble key={index} message={message} />
                ))}
            </div>

            <div className={styles.chatFooter}>
                <InsertEmoticon />
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <button onClick={sendMessage} type="submit">
                        Send a message
                    </button>
                </form>
                <Mic />
            </div>
        </div>
    );
}
