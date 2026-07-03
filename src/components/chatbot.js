import React, { useState, useRef, useEffect } from 'react';
import '../styles/chatbot.css';

// ── FILL THESE IN ──────────────────────────────────────────────
const REGION           = 'ap-southeast-1';
const IDENTITY_POOL_ID = 'ap-southeast-1:0236cfe3-c103-4fbc-94b4-7794b3d780c6';
const BOT_ID           = 'FYWSRSFLQQ';   // your bot ID
const BOT_ALIAS_ID     = '1BYSYLRBWJ';
const LOCALE_ID        = 'en_US';
// ───────────────────────────────────────────────────────────────

const sessionId = 'user-' + Math.random().toString(36).substring(2, 10);

// Get temporary AWS credentials from Cognito Identity Pool
async function getCognitoCredentials() {
  const idUrl = `https://cognito-identity.${REGION}.amazonaws.com/`;

  // Step 1: Get identity ID
  const idRes = await fetch(idUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityService.GetId',
    },
    body: JSON.stringify({
        AccountId: '176778311612',
      IdentityPoolId: IDENTITY_POOL_ID,
    }),
  });
  const idData = await idRes.json();
console.log(idRes.status);
console.log(idRes.headers.get('content-type'));
console.log(idData);

if (!idRes.ok) {
  throw new Error(JSON.stringify(idData));
}

const { IdentityId } = idData;

  // Step 2: Get credentials for that identity
  const credRes = await fetch(idUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityService.GetCredentialsForIdentity',
    },
    body: JSON.stringify({ IdentityId }),
  });
  const credData = await credRes.json();
console.log('GetCredentials:', credData);

if (!credRes.ok) {
  throw new Error(JSON.stringify(credData));
}

return credData.Credentials;// { AccessKeyId, SecretKey, SessionToken, Expiration }
}

// AWS Signature V4 signing for Lex API call
async function signedLexRequest(text, credentials) {
  const { AccessKeyId, SecretKey, SessionToken } = credentials;
  const endpoint = `https://runtime-v2-lex.${REGION}.amazonaws.com`;
  const path = `/bots/${BOT_ID}/botAliases/${BOT_ALIAS_ID}/botLocales/${LOCALE_ID}/sessions/${sessionId}/text`;
  const url = endpoint + path;

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '').slice(0, 15) + 'Z';
  const dateStamp = amzDate.slice(0, 8);

  const body = JSON.stringify({ text });
  const bodyHash = await sha256hex(body);

  const headers = {
    'content-type': 'application/json',
    host: `runtime-v2-lex.${REGION}.amazonaws.com`,
    'x-amz-date': amzDate,
    'x-amz-security-token': SessionToken,
    'x-amz-content-sha256': bodyHash,
  };

  const signedHeaders = Object.keys(headers).sort().join(';');
  const canonicalHeaders = Object.keys(headers).sort()
    .map(k => `${k}:${headers[k]}\n`).join('');

  const canonicalRequest = [
    'POST', path, '',
    canonicalHeaders,
    signedHeaders,
    bodyHash,
  ].join('\n');

  const credentialScope = `${dateStamp}/${REGION}/lex/aws4_request`;
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    await sha256hex(canonicalRequest),
  ].join('\n');

  const signingKey = await getSigningKey(SecretKey, dateStamp, REGION, 'lex');
  const signature  = await hmacHex(signingKey, stringToSign);

  const authHeader =
    `AWS4-HMAC-SHA256 Credential=${AccessKeyId}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { ...headers, Authorization: authHeader },
    body,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Lex error ${res.status}: ${err}`);
  }
  return res.json();
}

// Crypto helpers (browser Web Crypto API)
async function sha256hex(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hmac(key, message) {
  const cryptoKey = await crypto.subtle.importKey(
    'raw', typeof key === 'string' ? new TextEncoder().encode(key) : key,
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  return crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(message));
}

async function hmacHex(key, message) {
  const sig = await hmac(key, message);
  return Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}

async function getSigningKey(secret, date, region, service) {
  const kDate    = await hmac('AWS4' + secret, date);
  const kRegion  = await hmac(kDate, region);
  const kService = await hmac(kRegion, service);
  return hmac(kService, 'aws4_request');
}

// ── REACT COMPONENT ───────────────────────────────────────────
export default function ChatBot({ isOpen: externalIsOpen, setIsOpen: setExternalIsOpen, prefillMessage, onClearPrefill }) {
  const [isOpen,   setIsOpen]   = useState(false);
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: '🙏 Namaste! Welcome to LuxeStay Hotels. I can help you book a room or cancel an existing booking. What would you like to do?',
    },
  ]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll chat to bottom when messages change, when the
  // chat opens/closes, or while the user types so the latest
  // messages and input remain visible without manual scrolling.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isOpen, input]);

  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);

  useEffect(() => {
    if (isOpen && !loading) {
      inputRef.current?.focus();
    }
  }, [isOpen, loading]);

  useEffect(() => {
    if (prefillMessage && isOpen) {
      setInput(prefillMessage);
      onClearPrefill?.();
    }
  }, [prefillMessage, isOpen, onClearPrefill]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput('');
    setLoading(true);

    try {
      const creds    = await getCognitoCredentials();
      const response = await signedLexRequest(text, creds);

      const botReplies = (response.messages || []).map(m => ({
        from: 'bot',
        text: m.content,
      }));

      setMessages(prev => [
        ...prev,
        ...(botReplies.length > 0
          ? botReplies
          : [{ from: 'bot', text: "I didn't catch that. Could you rephrase?" }]),
      ]);
    } catch (err) {
      console.error('Error:', err);
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: '⚠️ Connection error. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      <button
        className={`chat-fab ${isOpen ? 'fab-open' : ''}`}
        onClick={() => {
          setIsOpen(o => !o);
          setExternalIsOpen?.(o => !o);
        }}
        aria-label="Open chat"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-avatar">🏨</div>
            <div>
              <div className="chat-header-name">LuxeBot</div>
              <div className="chat-header-status">
                <span className="status-dot" /> AI Concierge · Online
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => {
              setIsOpen(false);
              setExternalIsOpen?.(false);
            }}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`msg-row ${msg.from}`}>
                {msg.from === 'bot' && <div className="msg-avatar-bot">🤖</div>}
                <div className={`msg-bubble ${msg.from}`}>
                  {msg.text.split('\n').map((line, j) => (
                    <span key={j}>{line}<br /></span>
                  ))}
                </div>
              </div>
            ))}

            {loading && (
              <div className="msg-row bot">
                <div className="msg-avatar-bot">🤖</div>
                <div className="msg-bubble bot typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="quick-replies">
            {['Book a room', 'Cancel booking', 'Room types'].map(q => (
              <button
                key={q}
                className="qr-btn"
                onClick={() => {
                  setInput(q);
                  inputRef.current?.focus();
                }}
              >
                {q}
              </button>
            ))}
          </div>

          <div className="chat-input-row">
            <input
              ref={inputRef}
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message..."
              disabled={loading}
            />
            <button className="chat-send-btn" onClick={sendMessage} disabled={loading}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}