"use client";
import Chat from "@/components/Chat";
import FloatingChits from "@/components/FloatingChits";
import Intro from "@/components/Intro";
import LandingPage from "@/components/LandingPage"; // Import LandingPage component
import { useEffect, useState } from "react";

const Page = () => {
  const [childData, setChildData] = useState<boolean>(); 
  const [showChat, setShowChat] = useState<boolean>(); 
  const [onChatEndDetails, setOnChatEndDetails] = useState<boolean>()
  const handleDataFromChild = (data: boolean) => {
    if(data){
      setShowChat(data)
      setChildData(data);
    }else if(!data) {
      setShowChat(data)
      setChildData(data);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setShowChat(false)
    }, 1000)
  }, [onChatEndDetails])
  
  return (
    <main>
      <div className="transition-container">
        {typeof childData === "boolean" ? (
          childData ? (
            showChat ? (
              <div key="chat" className="page-transition">
                <Chat onChatEnd={() => setOnChatEndDetails(true)} /> 
              </div>
            ) : (
              <div key="landing-page" className="page-transition">
                <LandingPage />
                <FloatingChits/>
              </div>
            )
          ) : (
            <div key="intro" className="page-transition">
              <LandingPage/>
              <FloatingChits/>
            </div>
          )
        ) : (
          <div key="intro-default" className="page-transition">
            <Intro onDataTransfer={handleDataFromChild} />
          </div>
        )}
      </div>
      <style jsx>{`
        .transition-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .page-transition {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          animation: fadeIn 0.5s ease-in-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
};

export default Page;
