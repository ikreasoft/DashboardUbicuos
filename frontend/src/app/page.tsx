"use client";

import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "TU_CLIENT_ID_DE_GOOGLE"; // Reemplaza con tu Client ID de Google

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body>
                <GoogleOAuthProvider clientId={clientId}>
                    {children}
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}
