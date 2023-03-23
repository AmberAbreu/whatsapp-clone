import React, { useState, useEffect, useContext } from "react";
import Chat from "@/components/chat";
import Sidebar from "@/components/sidebar";
import { IMessage } from "@/interface";
import axios from "../axios";
import Pusher from "pusher-js";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Chats() {
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        axios.get("/api/v1/messages/sync").then((response) => {
            setMessages(response.data);
        });
    }, []);

    useEffect(() => {
        const pusher = new Pusher("64d53ed907395821848e", {
            cluster: "us2",
        });

        const channel = pusher.subscribe("message");

        channel.bind("inserted", (newMessage: any) => {
            setMessages([...messages, newMessage]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [messages]);

    return (
        <div className="app">
            <div className="appBody">
                <ProtectedRoute>
                    <Sidebar />
                    <Chat messages={messages} />
                </ProtectedRoute>
            </div>
        </div>
    );
}
