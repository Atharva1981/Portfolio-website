
import React, { useState } from 'react';
import { X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Atharva's AI Assistant! 🤖 I can help you explore his projects, answer questions about his experience, or show you his resume. Ask me anything!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim();
    
    // Greetings
    if (message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
      return "Hello! 👋 Nice to meet you! I'm Atharva's AI Assistant. I can help you learn about his skills, projects, experience, education, certifications, and more. What would you like to know?";
    }
    
    // Skills and Technologies
    if (message.match(/(skill|technology|tech|programming|language|framework|tool|stack)/)) {
      return "Atharva has expertise in:\n\n**Programming Languages:** Python, SQL, R, Java, SAS\n**Data Science & ML:** Pandas, NumPy, Scikit-learn, TensorFlow, Matplotlib, Seaborn, OpenCV\n**Data Visualization:** Power BI, Tableau, Excel (Pivot Tables, Dashboards)\n**Databases:** MySQL, MongoDB, Firebase\n**Web Development:** React.js, Node.js\n**Other:** Git, GitHub, Statistical Modeling, Machine Learning, Deep Learning\n\nWould you like to know more about any specific technology or see his projects?";
    }
    
    // Experience - Check this FIRST before projects to avoid confusion
    if (message.match(/(work experience|professional experience|internship|job|position|role|company|employer|corpvenue|ibm|skillsbuild|worked at|employment)/)) {
      return "Atharva has professional experience:\n\n**Full-Stack Web Developer Intern** at CorpVenue (May 2025 - August 2025)\n- Developed and deployed website using React.js and Node.js\n- Increased user engagement by 35% and reduced bounce rate by 25%\n\n**Data Analyst Intern** at IBM SkillsBuild (June 2024 - August 2024)\n- Cleaned and analyzed 15K+ data points using Python, SQL, and Excel\n- Built 10+ Power BI dashboards and uncovered 5 key sustainability trends\n\nWould you like to know more about his responsibilities or see his certifications?";
    }
    
    // Projects - Check after experience to avoid false matches
    if (message.match(/(project|portfolio|built|developed|created|github|side project|personal project)/)) {
      return "Atharva has worked on several exciting projects:\n\n• **India's Import–Export Trade Analysis Dashboard** - Power BI dashboard with 20+ DAX measures analyzing trade trends (2019–2025)\n• **Crop Disease Detection Using CNN** - 91% accuracy CNN model detecting 10+ crop diseases, reducing inspection time by 60%\n• **HackRx API – Insurance Policy AI Query System** - AI-powered FastAPI service using FAISS and Mistral 7B, improving retrieval time by 40%\n\nAll projects are available on GitHub! Would you like details on any specific project?";
    }
    
    // Education
    if (message.match(/(education|degree|university|college|school|study|studied|graduate)/)) {
      return "Atharva is currently pursuing:\n\n**B.Tech in Information Technology**\nNMIMS, Mumbai, Maharashtra\nJuly 2023 - May 2027\nCGPA: 3.7\n\nHe's actively learning and applying data science and web development skills through coursework and projects. Would you like to know about his certifications or projects?";
    }
    
    // Certifications
    if (message.match(/(certification|certificate|certified|credential|badge)/)) {
      return "Atharva has earned several certifications:\n\n• **Oracle Cloud Infrastructure (OCI) Foundations Associate** (2025)\n• **Tata Group Data Analytics Job Simulation** - Forage (2025)\n• **IBM SkillsBuild – Agentic AI: From Learner to Builder** - Become an AI Agent Architect (2025)\n• **Machine Learning** - Stanford University (2024)\n\nThese certifications demonstrate his commitment to continuous learning in cloud computing, data analytics, and AI. Would you like to know about his skills or projects?";
    }
    
    // Contact
    if (message.match(/(contact|reach|email|linkedin|github|social|connect|get in touch|hire|opportunity)/)) {
      return "You can reach Atharva through:\n\n📧 **Email** - Use the contact form on this website\n💼 **LinkedIn** - Connect via the LinkedIn button\n💻 **GitHub** - Check out his code repositories\n\nHe's based in Mumbai, India and is open to new opportunities! Would you like to know more about his availability?";
    }
    
    // Resume
    if (message.match(/(resume|cv|curriculum vitae|download|pdf)/)) {
      return "You can download Atharva's full resume using the 'Download Resume' button in the hero section or the resume section. It contains comprehensive information about his experience, skills, education, and certifications. Is there something specific you'd like to know that I can help with?";
    }
    
    // About/Who
    if (message.match(/(who|about|tell me|introduce|background)/)) {
      return "Atharva is a Data Analyst Intern proficient in Python, SQL, Power BI, and ML techniques. He's adept at transforming raw data into predictive insights and interactive dashboards for data-driven decisions. Currently pursuing B.Tech in Information Technology at NMIMS with a CGPA of 3.7. He combines full-stack development skills with data analysis capabilities to create intelligent, data-driven digital solutions. Would you like to know about his specific skills, projects, or experience?";
    }
    
    // Location
    if (message.match(/(where|location|city|based|live|from)/)) {
      return "Atharva is based in Mumbai, India. He's open to remote opportunities and collaborations worldwide. Would you like to know how to contact him?";
    }
    
    // Availability
    if (message.match(/(available|hire|freelance|contract|full-time|part-time|open|looking)/)) {
      return "Atharva is open to new opportunities! He's interested in roles related to Web Development, Data Analysis, and Data Science. You can reach out via the contact form, LinkedIn, or email. Would you like his contact information?";
    }
    
    // Thanks/Goodbye
    if (message.match(/(thanks|thank you|bye|goodbye|see you|appreciate)/)) {
      return "You're welcome! 😊 Feel free to ask me anything else about Atharva. Have a great day!";
    }
    
    // Questions about capabilities
    if (message.match(/(what can you|help|assist|do|capable|abilities)/)) {
      return "I can help you learn about:\n• Atharva's skills and technologies\n• His projects and work\n• Professional experience\n• Education and certifications\n• How to contact him\n• His resume\n\nJust ask me anything! What would you like to know?";
    }
    
    // Default with more helpful response
    return "That's an interesting question! I can help you learn about Atharva's skills, projects, experience, education, certifications, or how to contact him. Could you rephrase your question or ask about one of these topics? For example, you could ask 'What are his skills?' or 'Tell me about his projects.'";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const currentInput = inputValue.trim();

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: currentInput,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Add bot response after a short delay to simulate thinking
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(currentInput),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-md h-[85vh] sm:h-[600px] max-h-[700px] flex flex-col bg-card/95 backdrop-blur">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 flex-shrink-0">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            AI Assistant
          </CardTitle>
          
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 sm:h-10 sm:w-10">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${
                  message.isBot ? 'justify-start' : 'justify-end'
                }`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-2 sm:p-3 text-xs sm:text-sm break-words ${
                    message.isBot
                      ? 'bg-muted text-foreground'
                      : 'bg-primary text-primary-foreground ml-auto'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.text}</div>
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 text-sm"
            />
            <Button onClick={handleSendMessage} size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;
