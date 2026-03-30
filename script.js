document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('whatsapp-popup');
    const closeBtn = document.getElementById('close-popup');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && e.target !== menuToggle) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
            }
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // Show popup after 2 seconds
    if (popup) {
        setTimeout(() => {
            popup.classList.add('show');
        }, 2000);

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                popup.classList.remove('show');
            });
        }
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;

            // Close other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });
    });

    // ENHANCED CHATBOT WITH BETTER UX
    const chatbot = document.createElement('div');
    chatbot.className = 'chatbot-container';
    chatbot.innerHTML = `
        <div class="chatbot-header">
            <span>💬 Alfa Assistant</span>
            <button id="close-chatbot" class="close-btn" style="font-size: 1.2rem;">&times;</button>
        </div>
        <div class="chatbot-messages" id="chatbot-messages">
            <div class="message bot-message">
                Hi! 👋 I'm your Alfa Assistant.<br><br>How can I help you today?
            </div>
            <div id="quick-actions" class="quick-actions"></div>
        </div>
        <div class="chatbot-input-area">
            <input type="text" id="chatbot-input" class="chatbot-input" placeholder="Type your message...">
            <button id="chatbot-send" class="chatbot-send-btn">
                <i class="fa-solid fa-paper-plane"></i>
            </button>
        </div>
    `;
    document.body.appendChild(chatbot);

    // Create Chatbot Toggle
    const chatbotToggle = document.createElement('div');
    chatbotToggle.className = 'chatbot-toggle';
    chatbotToggle.innerHTML = '<i class="fa-solid fa-robot"></i>';
    document.body.appendChild(chatbotToggle);

    // Load Knowledge Base
    const script = document.createElement('script');
    script.src = 'chatbot_knowledge_base.js';
    script.onload = () => {
        showQuickActions();
    };
    document.body.appendChild(script);

    // Toggle Chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbot.classList.toggle('active');
        if (chatbot.classList.contains('active')) {
            document.getElementById('chatbot-input').focus();
        }
    });

    document.getElementById('close-chatbot').addEventListener('click', () => {
        chatbot.classList.remove('active');
    });

    // Show Quick Action Buttons
    function showQuickActions() {
        if (typeof getQuickActions !== 'function') return;

        const quickActionsContainer = document.getElementById('quick-actions');
        const actions = getQuickActions();

        quickActionsContainer.innerHTML = actions.map(action =>
            `<button class="quick-action-btn" data-key="${action.key}">${action.label}</button>`
        ).join('');

        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.getAttribute('data-key');
                handleQuickAction(key);
            });
        });
    }

    // Handle Quick Action
    function handleQuickAction(key) {
        const labels = {
            services: 'Tell me about services',
            insurance: 'Insurance information',
            detailing: 'Detailing packages',
            usedcars: 'Used cars',
            pricing: 'Show pricing',
            contact: 'Contact details'
        };

        const userText = labels[key] || key;
        addUserMessage(userText);

        setTimeout(() => {
            const response = getBotResponse(userText);
            addBotMessage(response.text);

            if (response.showQuickActions) {
                setTimeout(showQuickActions, 300);
            }
        }, 800);
    }

    // Add User Message
    function addUserMessage(text) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const userMsgDiv = document.createElement('div');
        userMsgDiv.className = 'message user-message';
        userMsgDiv.textContent = text;

        const quickActions = document.getElementById('quick-actions');
        if (quickActions) quickActions.innerHTML = '';

        messagesContainer.appendChild(userMsgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Add Bot Message with Typing
    function addBotMessage(text) {
        const messagesContainer = document.getElementById('chatbot-messages');

        // Typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        setTimeout(() => {
            typingDiv.remove();

            const botMsgDiv = document.createElement('div');
            botMsgDiv.className = 'message bot-message';
            botMsgDiv.style.whiteSpace = 'pre-line';
            botMsgDiv.textContent = text;
            messagesContainer.appendChild(botMsgDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 600);
    }

    // Send Message
    function sendMessage() {
        const inputField = document.getElementById('chatbot-input');
        const userText = inputField.value.trim();

        if (userText === "") return;

        addUserMessage(userText);
        inputField.value = "";

        setTimeout(() => {
            let botResponse = "I'm here to help! Ask about services, insurance, detailing, or contact info.";
            let showActions = false;

            if (typeof getBotResponse === 'function') {
                const response = getBotResponse(userText);
                botResponse = response.text;
                showActions = response.showQuickActions;
            }

            addBotMessage(botResponse);

            if (showActions) {
                setTimeout(showQuickActions, 800);
            }
        }, 400);
    }

    document.getElementById('chatbot-send').addEventListener('click', sendMessage);
    document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Countdown Timer
    const countdown = document.getElementById('countdown');
    if (countdown) {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 7);

        function updateTimer() {
            const now = new Date();
            const diff = endDate - now;

            if (diff <= 0) return;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = days < 10 ? '0' + days : days;
            document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
        }

        setInterval(updateTimer, 1000);
        updateTimer();
    }
});
