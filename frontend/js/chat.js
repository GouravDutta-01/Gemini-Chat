document.addEventListener("DOMContentLoaded", function () {
    fetchUser();

    // Add event listener to form submission
    document.getElementById("chat-form").addEventListener("submit", function (event) {
        event.preventDefault(); 
        sendMessage();
    });
});

async function fetchUser() {
    try {
        const res = await fetch("/auth/user");
        const data = await res.json();
        if (!data.loggedIn) {
            window.location.href = "/";
            return;
        }
        // Update the user info in the navbar
        document.getElementById("user-info").innerText = `Logged in as ${data.name}`;
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}

function formatMessage(text) {
    // Bold (**text** → <b>text</b>)
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Italic (*text* → <i>text</i>)
    text = text.replace(/\*(.*?)\*/g, "<i>$1</i>");

    // Underline (__text__ → <u>text</u>)
    text = text.replace(/__(.*?)__/g, "<u>$1</u>");

    // Strikethrough (~~text~~ → <s>text</s>)
    text = text.replace(/~~(.*?)~~/g, "<s>$1</s>");

    // Inline Code (`code` → <code>code</code>)
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Code Blocks (``` code ```)
    text = text.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");

    // New lines (\n → <br>)
    text = text.replace(/\n/g, "<br>");

    // Convert Markdown tables to HTML tables
    if (text.includes("|")) {
        let rows = text.trim().split("\n");
        if (rows.length > 1 && rows[1].includes("---")) { 
            let tableHTML = "<table border='1' cellspacing='0' cellpadding='5'>";
            rows.forEach((row, index) => {
                if (index === 1) return;
                let cols = row.split("|").map(col => col.trim()).filter(col => col);
                tableHTML += "<tr>" + cols.map(col => `<td>${col}</td>`).join("") + "</tr>";
            });
            tableHTML += "</table>";
            text = tableHTML;
        }
    }

    return text;
}

async function sendMessage() {
    const messageInput = document.getElementById("message");
    const message = messageInput.value.trim();
    if (!message) return;
    const chatbox = document.getElementById("chatbox");

    // Append User Message FIRST
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user");
    userMessage.innerHTML = `<b>You:</b> ${message}`;
    chatbox.appendChild(userMessage);
    messageInput.value = ""; 

    // Show "Typing..." 
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("message", "bot");
    typingIndicator.innerHTML = `<b>Gemini:</b> <i>Typing...</i>`;
    chatbox.appendChild(typingIndicator);

    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll

    try {
        const res = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });

        const data = await res.json();
        const botReply = formatMessage(data.reply); // Format bot response
        // Remove "Typing..." Indicator
        chatbox.removeChild(typingIndicator);
        // Append Bot Response AFTER user message
        const botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot");
        botMessage.innerHTML = `<b>Gemini:</b> ${botReply}`;
        botMessage.style.marginBottom = "20px";
        chatbox.appendChild(botMessage);
        chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to bot response

    } catch (error) {
        console.error("Error fetching response:", error);
        typingIndicator.innerHTML = `<b>Gemini:</b> <i>Failed to get a response</i>`;
    }
}

function logout() {
    window.location.href = "/auth/logout";
}
