// Chatbot Brain - Training Data (Retrieval-based)
const chatbotData = {
    greetings: [
        "Hello! How can I assist you today?",
        "Hi there! What can I help you with?",
        "Hey! Ready to help you out! 😊"
    ],
    goodbye: [
        "Goodbye! Have a great day! 👋",
        "See you later! Take care! 😊",
        "Bye! Come back anytime!"
    ],
    services: [
        "We offer premium bus booking, real-time tracking, and secure payments!",
        "Our services include: Online booking, live updates, customer support 24/7",
        "Book tickets easily with our secure platform!"
    ],
    pricing: [
        "Pricing starts at just $5! Check our app for live fares.",
        "Affordable rates with dynamic pricing. Download our app!",
        "Best prices guaranteed! Visit our website for details."
    ],
    support: [
        "Support available 24/7 via chat or call 1-800-BUS-TICKET",
        "Our team is here to help! Email support@buspass.com",
        "Contact us anytime - we're always ready to assist!"
    ],
    booking: [
        "Booking is simple! Select route → Choose time → Pay securely",
        "Easy 3-step booking process. Try it now!",
        "Book your ticket in under 2 minutes!"
    ],
    default: [
        "I'm not sure about that. Can you ask about booking, pricing, or support?",
        "Let me help with bus booking, fares, or support questions!",
        "Try asking: 'How do I book?' or 'What are the prices?'"
    ]
};

// Keywords for pattern matching
const patterns = {
    greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
    goodbye: ['bye', 'goodbye', 'see you', 'exit', 'quit'],
    services: ['services', 'what do you offer', 'products'],
    pricing: ['price', 'cost', 'how much', 'rates', 'fare'],
    support: ['support', 'help', 'contact', 'phone', 'email'],
    booking: ['book', 'booking', 'reserve', 'ticket']
};

class Chatbot {
    constructor() {
        this.chatContainer = document.getElementById('chatContainer');
        this.userInput = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');
        
        this.init();
    }

    init() {
        // Enter key support
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        this.sendBtn.addEventListener('click', () => this.sendMessage());
    }

    // Show typing indicator
    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="avatar">🤖</div>
            <div class="typing">
                <span></span><span></span><span></span>
            </div>
        `;
        this.chatContainer.appendChild(typingDiv);
        this.scrollToBottom();
        return typingDiv;
    }

    // Remove typing indicator
    removeTyping(typingDiv) {
        typingDiv.remove();
    }

    // Add message to chat
    addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = `
            <div class="avatar">${isUser ? '👤' : '🤖'}</div>
            <div class="message-content">${content}</div>
        `;
        this.chatContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    // Scroll to bottom
    scrollToBottom() {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    // Match user input to patterns
    matchPattern(input) {
        const lowerInput = input.toLowerCase();
        
        for (const [category, keywords] of Object.entries(patterns)) {
            if (keywords.some(keyword => lowerInput.includes(keyword))) {
                return category;
            }
        }
        return 'default';
    }

    // Get bot response
    getResponse(input) {
        const category = this.matchPattern(input);
        const responses = chatbotData[category];
        const randomIndex = Math.floor(Math.random() * responses.length);
        return responses[randomIndex];
    }

    // Main send function
    sendMessage() {
        const input = this.userInput.value.trim();
        if (!input) return;

        // Add user message
        this.addMessage(input, true);
        this.userInput.value = '';

        // Show typing
        const typingDiv = this.showTyping();

        // Simulate response time
        setTimeout(() => {
            this.removeTyping(typingDiv);
            const response = this.getResponse(input);
            this.addMessage(response);
        }, 1000 + Math.random() * 1000);
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});