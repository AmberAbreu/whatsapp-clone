import React from "react";
import styles from "../../styles/Chat.module.css";

export default function ChatBubble({ message }: any) {
    return (
        <>
            <p
                className={`${styles.chatMessage} ${
                    message.receiver && styles.chatReceiver
                }`}
            >
                <span className={styles.chatName}>{message.name}</span>
                {message.message}
                <span className={styles.chatTimestamp}>
                    {message.timeStamp}
                </span>
            </p>
        </>
    );
}
