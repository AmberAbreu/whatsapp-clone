import { LockOutlined } from "@mui/icons-material";
import { Avatar, Grid, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { UserAuth } from "../context/UserContext";

export default function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    const { signIn } = UserAuth();

    const handleSignIn = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError("");
        try {
            await signIn(email, password);
            router.push("/chats");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Grid>
            <Paper className={styles.loginContainer} elevation={10}>
                <Grid container direction="column" alignItems="center">
                    <Avatar style={{ backgroundColor: " #dcf8c6" }}>
                        <LockOutlined />
                    </Avatar>
                    <h2>Sign in</h2>
                </Grid>
                <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email"
                    fullWidth
                    required
                />
                <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    fullWidth
                    required
                />
                <button onClick={handleSignIn} type="submit">
                    Sign in
                </button>
            </Paper>
        </Grid>
    );
}
