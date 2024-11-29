import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import useAudio from "@/utilities/useAudio"; // Import the custom hook

function Chat({ onChatEnd }: any) {
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: string; delay: number }>
  >([]);
  const [choices, setChoices] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [waitingForChoice, setWaitingForChoice] = useState(false); // New State
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const choicesRef = useRef<HTMLDivElement>(null);
  const typingDotsRef = useRef<HTMLDivElement>(null);

  const { playSound } = useAudio("/Sound Effects/livechat-129007.mp3"); // Use the custom hook

  const scenarioMessages = [
    { text: "Hello! Ayan bhai", sender: "bot", delay: 1000 },
    { text: "Exhibition kai din kareeb hai", sender: "bot", delay: 1000 },
    { text: "Hum participate kare hai", sender: "bot", delay: 1000 },
    { text: "Bohot maza ae ga", sender: "bot", delay: 1000 },
    { text: "Chal aja", sender: "bot", delay: 1000 },
  ];

  const scenarioChoices = [
    ["Kia khass hai", "Kia kare phir"],
    ["Aja project banae", "Chal banate hai"],
  ];

  // Handle bot message flow
  useEffect(() => {
    if (waitingForChoice || currentStep >= scenarioMessages.length) return; // Stop if waiting for choice or out of messages

    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, scenarioMessages[currentStep]]);
      playSound(); // Play sound when message is shown

      // If current step corresponds to a choice
      if (currentStep % 2 === 1) {
        setChoices(scenarioChoices[Math.floor(currentStep / 2)]);
        setWaitingForChoice(true); // Wait for user choice
      } else {
        setCurrentStep((prev) => prev + 1); // Automatically proceed
      }

      // Check if the last message from bot is "Chal aja" and run onChatEnd function
      if (currentStep === scenarioMessages.length - 1) {
        onChatEnd();
      }
    }, scenarioMessages[currentStep].delay);

    return () => clearTimeout(timer);
  }, [currentStep, waitingForChoice, playSound, onChatEnd]);

  useEffect(() => {
    if (messagesEndRef.current) {
      gsap.from(messagesEndRef.current.lastElementChild, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
      });
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (choicesRef.current) {
      gsap.from(choicesRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [choices]);

  useEffect(() => {
    if (isTyping && typingDotsRef.current) {
      gsap.to(typingDotsRef.current.children, {
        y: -3,
        stagger: 0.15,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, [isTyping]);

  const handleChoice = (choice: string) => {
    setMessages((prev) => [
      ...prev,
      { text: choice, sender: "user", delay: 0 },
    ]);
    setChoices([]);
    setWaitingForChoice(false); // Allow bot to proceed
    setCurrentStep((prev) => prev + 1);
    playSound(); // Play sound when user makes a choice
  };

  return (
    <section className="bg-black flex justify-center items-center h-screen w-screen">
      <section className="w-screen h-screen sm:w-[35vw] sm:h-[90vh] bg-black flex justify-center items-center p-4">
        <div className="w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
          <div
            ref={messagesEndRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`rounded-full py-3 px-5 max-w-[95%] ${
                    message.sender === "bot"
                      ? "bg-indigo-800 text-white"
                      : "bg-indigo-800 text-white"
                  } shadow-md transition-all duration-300 hover:shadow-lg`}
                >
                  <p className="text-white text-lg sm:text-xl font-normal">
                    {message.text}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-indigo-700 rounded-full p-3 shadow-md">
                  <div ref={typingDotsRef} className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {choices.length > 0 && (
            <div className="p-4">
              <div
                ref={choicesRef}
                className="flex flex-wrap gap-6 justify-center"
              >
                {choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoice(choice)}
                    className="bg-purple-800 text-white px-4 py-2 rounded-full hover:bg-purple-900 transition-all duration-300 text-lg sm:text-xl  font-normal shadow-md hover:shadow-lg"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </section>
  );
}

export default Chat;
