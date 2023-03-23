import { Avatar } from "@mui/material";
import React from "react";
import styles from "../../styles/Sidebar.module.css";

export default function SidebarChat() {
    return (
        <div className={styles.sidebarChat}>
            <Avatar />
            <div className={styles.sidebarChatInfo}>
                <h2>Room name</h2>
                <p>This is the last message</p>
            </div>
        </div>
    );
}
