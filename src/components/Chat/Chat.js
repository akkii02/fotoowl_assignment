import React, { useEffect, useState } from "react";
import { init, id } from "@instantdb/react";
import useOfflineStorage from "../../hook/useOffline"; 
import styles from "./Chat.module.css";
import { IoSend } from "react-icons/io5";

const db = init({
    appId: "c05e3bc8-9ab4-4ffd-8e9f-3dd04b6eda0c", 
});

const Chat = ({ selectedContact, currentUser }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useOfflineStorage('messages', []);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const { data, error, isLoading } = db.useQuery({
        messages: {},
    });

    useEffect(() => {
        if (data?.messages) {
            setMessages(data.messages);
        }
    }, [data, setMessages]);

    // Handle network status changes (online/offline)
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const newMessage = {
            id: id(),
            text: message,
            sender: currentUser === "User 1" ? "User 1" : "User 2",
            contactId: selectedContact.id,
            timestamp: new Date().toISOString(),
        };

        // Save the message to local state first
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        if (isOnline) {
            // If online, send to InstantDB
            await db.transact([db.tx.messages[newMessage.id].update(newMessage)]);
        } else {
            // If offline, save message in localStorage and sync later
            localStorage.setItem('messages', JSON.stringify([...messages, newMessage]));
        }

        setMessage("");
    };

    if (!selectedContact) {
        return (
            <div className={styles.chatMain}>
                <div className={styles.noChatSelected}>
                    Select a contact to start chatting
                </div>
            </div>
        );
    }

    return (
        <div className={styles.chatMain}>
            <div className={styles.chatHeader}>
                <img
                    src={selectedContact.avatar || "https://via.placeholder.com/40"}
                    alt={`${selectedContact.name}`}
                    className={styles.contactAvatar}
                />
                <div className={styles.contactDetails}>
                    <div className={styles.contactName}>{selectedContact.name}</div>
                    <div className={styles.contactStatus}>{isOnline ? "Online" : "Offline"}</div>
                </div>
            </div>
            <div className={styles.messagesContainer}>
                {isLoading ? (
                    <div>Loading messages...</div>
                ) : error ? (
                    <div>Error: {error.message || "Unknown error"}</div>
                ) : messages.length === 0 ? (
                    <div className={styles.noMessages}>No messages yet...</div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={
                                message.sender === currentUser
                                    ? `${styles.message} ${styles.myMessage}`
                                    : `${styles.message} ${styles.contactMessage}`
                            }
                        >
                            {message.text}
                            <div className={styles.timestamp}>
                                {new Date(message.timestamp).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className={styles.messageInputContainer}>
                <input
                    type="text"
                    className={styles.messageInput}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button className={styles.sendButton} onClick={handleSendMessage}>
                <IoSend />
                </button>
            </div>
        </div>
    );
};

export default Chat;
