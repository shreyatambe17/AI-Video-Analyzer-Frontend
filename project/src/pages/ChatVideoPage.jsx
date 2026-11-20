import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { NodeHeader } from '../components/pages/chatVideo/NodeHeader';
import { CyberVideoPlayer } from '../components/pages/chatVideo/CyberVideoPlayer';
import { MetricsRow } from '../components/pages/chatVideo/MetricsRow';
import { FastTriggerBar } from '../components/pages/chatVideo/FastTriggerBar';
import { AiChatStream } from '../components/pages/chatVideo/AiChatStream';
import { MultimodalInputBar } from '../components/pages/chatVideo/MultimodalInputBar';

export const ChatVideoPage = () => {
  const [messages, setMessages] = useState([
    {
      query: "Summarize memory bottlenecks between 12:00 and 14:15, and translate core thesis to Spanish.",
      timestamp: "14:29:10"
    }
  ]);
  const [activeTimestamp, setActiveTimestamp] = useState("00:14:28.450");

  const handleSendMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { query: text, timestamp: new Date().toLocaleTimeString() }
    ]);
  };

  const handleTimestampClick = (timeStr) => {
    setActiveTimestamp(`00:${timeStr}.000`);
  };

  return (
    <AppLayout>
      <div className="space-y-4">
        <NodeHeader />
        <CyberVideoPlayer currentTime={activeTimestamp} />
        <MetricsRow />
        <FastTriggerBar onTrigger={handleSendMessage} />
        <AiChatStream messages={messages} onTimestampClick={handleTimestampClick} />
        <MultimodalInputBar onSendMessage={handleSendMessage} />
      </div>
    </AppLayout>
  );
};

export default ChatVideoPage;
