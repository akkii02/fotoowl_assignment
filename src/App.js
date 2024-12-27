import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import LoginPage from "./components/Login/Login"; 
import "./App.css";

const App = () => {
    const [selectedContact, setSelectedContact] = useState(null);
    const [currentUser, setCurrentUser] = useState(null); 

    const handleContactSelect = (contact) => {
        setSelectedContact(contact);
    };

    const handleUserLogin = (user) => {
        setCurrentUser(user); 
    };

    if (!currentUser) {
        return <LoginPage onLogin={handleUserLogin} />; 
    }

    return (
        <div className="Main">
            <Sidebar onContactSelect={handleContactSelect} currentUser={currentUser} />
            <Chat selectedContact={selectedContact} currentUser={currentUser} />
        </div>
    );
};

export default App;
