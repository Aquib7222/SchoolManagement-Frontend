import React, { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const NotificationListener = () => {

    useEffect(() => {

        const client = new Client({

            webSocketFactory: () =>
                new SockJS("http://localhost:8080/ws"),

            reconnectDelay: 5000,

            onConnect: () => {

                console.log("Student WebSocket Connected");

                client.subscribe(
                    "/topic/notifications",
                    (message) => {

                        const data = JSON.parse(message.body);

                        console.log(
                            "Notification received:",
                            data
                        );

                        // Abhi testing ke liye
                        alert(`🔔 ${data.message}`);
                    }
                );
            },

            onStompError: (frame) => {

                console.error(
                    "STOMP Error:",
                    frame
                );
            },

            onWebSocketError: (error) => {

                console.error(
                    "WebSocket Error:",
                    error
                );
            }
        });

        client.activate();

        return () => {
            client.deactivate();
        };

    }, []);

    return null;
};

export default NotificationListener;