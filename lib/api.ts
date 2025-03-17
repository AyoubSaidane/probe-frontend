/**
 * API client for communicating with the FastAPI backend
 */

const API_BASE_URL = 'http://localhost:8000';

export interface QueryRequest {
  message: string;
  chat_id?: string;
}

export interface Document {
  title: string;
  url: string;
  page?: number;
  array_buffer?: string; // base64
}

export interface Expert {
  name: string;
  email: string;
  image: string; // URL
  documents: string[]; // list of document titles
}

export interface QueryResponseData {
  text: string;
  documents: Document[];
  experts: Expert[];
}

export interface QueryResponse {
  response: QueryResponseData;
}

/**
 * Send a query to the FastAPI backend
 */
export async function sendQuery(request: QueryRequest): Promise<QueryResponseData> {
  try {
    const response = await fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: QueryResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error querying API:', error);
    // Return fallback response
    return {
      text: "I'm sorry, I encountered an error processing your request. Please try again later.",
      documents: [],
      experts: []
    };
  }
}

/**
 * Connect to Google Drive
 * @returns Promise with the response from the server
 */
export async function connectToDrive(): Promise<{ response: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/connect`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error connecting to drive:', error);
    return {
      response: "Failed to connect to Google Drive."
    };
  }
}
