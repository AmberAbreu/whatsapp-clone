import { LockOutlined } from "@mui/icons-material";
import { Avatar, Grid, Paper, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import { UserAuth } from "../context/UserContext";
import { useRouter } from "next/router";

export default function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const { createUser } = UserAuth();
    const router = useRouter();
    console.log(UserAuth());
    const handleSignIn = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError("");
        router.push("/chats");
        try {
            await createUser(email, password);
        } catch (e) {
            // setError(e);
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
                    Register
                </button>
            </Paper>
        </Grid>
    );
}
