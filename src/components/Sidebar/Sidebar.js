import React from "react";
import styles from "./Sidebar.module.css";
import { RiChatNewFill } from "react-icons/ri";


const Sidebar = ({ onContactSelect, currentUser }) => {
    const contacts = [
        { id: 1, name: "User 1", lastMessage: "Hey! How are you?", time: "10:30 AM", avatar: "https://i.pravatar.cc/40?img=1" },
        { id: 2, name: "User 2", lastMessage: "Let’s catch up tomorrow!", time: "9:15 AM", avatar: "https://i.pravatar.cc/40?img=2" },
    ];

    const filteredContacts = contacts.filter(contact => contact.name !== currentUser); // Exclude the current user from the contact list

    return (
        <div className={styles.mainContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>Chats</h2>
                <h2 className={styles.title}><RiChatNewFill /></h2>
            </div>
            <ul className={styles.contactList}>
                {filteredContacts.map((contact) => (
                    <li
                        key={contact.id}
                        className={styles.contactItem}
                        onClick={() => onContactSelect(contact)}
                    >
                        <img src={contact.avatar} alt={`${contact.name}`} className={styles.contactAvatar} />
                        <div className={styles.contactDetails}>
                            <div className={styles.contactName}>{contact.name}</div>
                            <div className={styles.contactLastMessage}>{contact.lastMessage}</div>
                        </div>
                        <div className={styles.contactTime}>{contact.time}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
