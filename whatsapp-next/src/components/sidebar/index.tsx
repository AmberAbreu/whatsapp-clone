import React from "react";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton } from "@mui/material";
import womanSmiling from "../../images/woman-avatar.jpg";
import { SearchOutlined } from "@mui/icons-material";
import SidebarChat from "./SidebarChat";
import Image from "next/image";
import styles from "../../styles/Sidebar.module.css";

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <Avatar>
                    <Image fill src={womanSmiling} alt="profile picture" />
                </Avatar>
                <h2></h2>
                <div className={styles.sidebarHeaderRight}>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className={styles.sidebarSearch}>
                <div className={styles.sidebarSearchContainer}>
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>

            <div className={styles.sidebarChats}>
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    );
}
