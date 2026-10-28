import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { registerWebMcpTools } from '@/lib/webmcp';

// Register in-browser WebMCP tools for AI agents
registerWebMcpTools();

ReactDOM.createRoot(document.getElementById('root')).render(
	<App />
);
