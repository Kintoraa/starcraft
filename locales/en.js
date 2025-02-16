const en = {
    home: {
        title: "For Beginners",
        story: {
            title: "My Story",
            description: `I recently started playing <strong>StarCraft</strong>, and I find that there's a 
            <strong>huge</strong> lack of easily and quickly understandable content to help grasp the game, 
            especially in <strong>French</strong>. So, since I'm training in web development, I thought: 
            why not create a website gathering the information I found about StarCraft for beginners?`,
            disclaimer: "Warning: I am a beginner, and some information may be incorrect. Please contact me for any corrections.",
        },
        info: {
            title: "Information",
            description: "I would like to gather experienced StarCraft players to refine counters and strategic information. For now, I have only compiled the information I found, but it is not always accurate or relevant. As I’ve often noticed, there are many subtleties. The goal is to provide general guidelines on how to respond to an opponent’s composition, which is especially useful for beginners like me. The finer details of counters come with experience.",
            features: {
                title: "Features",
                description: "Here are the initial features pending approval. Users will have access to a dashboard to manage everything related to adding and modifying tables, etc.",
                features: {
                    1: {
                        title: "Adding new resources"
                    },
                    2: {
                        title: "Modifying information tables"
                    },
                    3: {
                        title: "Modifying information tables"
                    }
                }
            }
        },
    },
    login: {
        email: "Email",
        password: "Password",
        disclaimer: "Don't have an account? Contact me",
        error: "The email or password is incorrect",
        connected: "You are now logged in"
    },
    footer: {
        1: "More info about StarCraft",
        2: "Contact me",
        3: "Not affiliated with Blizzard",
    },
    navBar: {
        1: "Counters",
        2: "Buildings",
        3: "Resources",
        language: {
            fr: "French",
            en: "English",
        },
        profil: {
            1: "Profile",
            2: "Settings",
            3: "Logout",
        },
        modal: {
            title: "Do you really want to log out?",
            cancel: "Cancel",
            confirm: "Log out",
        },
    },
    counter: {
        title: "Unit you are playing",
    },
    dashboard: {
        confirm: "Confirm",
        title: "Select a unit to play",
        modifier: {
            title: "You are modifying the unit: ",
            buttonModifier: "Modify",
            pageTitle: "All StarCraft 2 units",
            loading: "Modifying...",
            description: "Fill in the fields to modify",
            save: "Save changes",
            cancel: "Cancel"
        },
        counter: {
            add: "Add a unit counter",
            exist: "This counter already exists!",
            hp: "Health Points",
            confirmQuestion: "Do you really want to delete this unit?",
            suppress: "Deleting...",
            deleteButton: "Delete"
        }
    },
};

export default en;
