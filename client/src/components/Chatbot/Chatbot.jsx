import { useEffect, useRef, useState } from "react";
import "./Chatbot.css";
import { Configuration, OpenAIApi } from "openai";
import { FiChevronDown } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import Logo from "../../assets/icon.png";

const Chatbot = ({ setBotIsOpen }) => {
  
  const [chats, setChats] = useState([
    {
      id: 212,
      text: "Hi, what would you like to ask?",
      sender: "robot",
    },
  ]);
  const [input, setInput] = useState('');
  const boxRef = useRef(0);
  const [typing, setTyping] = useState(false);
  const KEY = (process.env.REACT_APP_OPEN_API_KEY).toString().substring(0, 51);
  const configuration = new Configuration({
    apiKey: KEY,
  });
  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    boxRef.current.scrollTo(-20, 10000000000);
  }, [chats]);

  const sendMessage = async (e) => {
    e.preventDefault();
    setChats((prev) => [
      ...prev,
      { id: Date.now(), text: input, sender: "user" },
    ]);
    boxRef.current.scrollTo(-20, 10000000000);
    setTyping(true);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: input,
      temperature: 0.3,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
      stop: ["You:"],
    });
    setInput("");
    setTyping(false);
    setChats((prev) => [
      ...prev,
      { id: Date.now(), text: response.data.choices[0].text, sender: "robot" },
    ]);
    // console.log(response);
  };
  return (
    <div className="chatbot-outer">
      <div className="chatbox-container">
        <div className="header">
          <div className="left-header">
            <div className="stack-logo">
              <img src={Logo} alt="" />
            </div>
            <span className="header-title">Stack-Bot</span>
          </div>
          <button onClick={() => setBotIsOpen(false)}>
            <FiChevronDown />
          </button>
        </div>
        <div className="chats-box" ref={boxRef}>
          {chats?.map((chat) => {
            return (
              <div className={chat.sender} key={chat.id}>
                <span>{chat.text}</span>
              </div>
            );
          })}
          {typing && <span className="typing">Typing...</span>}
        </div>
        <form onSubmit={sendMessage}>
          <div className="footer">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button type="submit">
              <IoSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
