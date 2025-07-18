import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ApiUsagePage = () => {
  const [activeTab, setActiveTab] = useState('javascript');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const codeSnippets = {
    javascript: `const form = document.getElementById('registerForm');
const resultDiv = document.getElementById('result');

// ✅ Your API link here
const apiLink = '{your api link}'; 

// When the form is submitted
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Stop the page from reloading

  // Get the values entered by the user
  const username = form.username.value;
  const email = form.email.value;
  const password = form.password.value;

  // Create a data object to send
  const data = {
    username: username,
    email: email,
    password: password
  };

  // Send the data to the API using fetch
  fetch(apiLink, { // Using apiLink variable instead of writing full URL here
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // We are sending JSON data
    },
    body: JSON.stringify(data) // Convert JS object to JSON string
  })
  .then(response => response.json()) // Convert the response to JS object
  .then(result => {
    // Show success or error message
    if (result.detail) {
      resultDiv.innerText = 'Error: ' + result.detail;
    } else {
      resultDiv.innerText = result.message + ' | Email: ' + result.user_email;
    }
  })
  .catch(error => {
    // If something goes wrong (network error etc.)
    console.log(error);
    resultDiv.innerText = 'Error: ' + error.message;
  });
});`,

    python: `import requests

# ✅ Your API link here
api_link = '{your api link}'

# Get user input (similar to form inputs)
username = input("Enter username: ")
email = input("Enter email: ")
password = input("Enter password: ")

# Create a data dictionary to send
data = {
    'username': username,
    'email': email,
    'password': password
}

try:
    # Send POST request to API
    response = requests.post(api_link, json=data)
    result = response.json()

    # Show success or error message
    if 'detail' in result:
        print('Error:', result['detail'])
    else:
        print(result.get('message', 'Success'), '| Email:', result.get('user_email'))

except Exception as e:
    # If something goes wrong (network error etc.)
    print('Error:', str(e))
`,

    nodejs: `// ✅ Your API link here
const apiLink = '{your api link}'; 

// To read user input from terminal
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask questions
function ask(question) {
  return new Promise(resolve => {
    readline.question(question, answer => resolve(answer));
  });
}

async function registerUser() {
  const username = await ask('Enter username: ');
  const email = await ask('Enter email: ');
  const password = await ask('Enter password: ');

  const data = {
    username: username,
    email: email,
    password: password
  };

  try {
    const response = await fetch(apiLink, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.detail) {
      console.log('Error:', result.detail);
    } else {
      console.log(result.message, '| Email:', result.user_email);
    }

  } catch (error) {
    console.log('Error:', error.message);
  }

  readline.close();
}

registerUser();
`,

    java: `import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class RegisterUser {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // ✅ Your API link here
        String apiLink = "{your api link}"; 

        // Get user input
        System.out.print("Enter username: ");
        String username = scanner.nextLine();

        System.out.print("Enter email: ");
        String email = scanner.nextLine();

        System.out.print("Enter password: ");
        String password = scanner.nextLine();

        scanner.close();

        // Create JSON data
        String jsonData = String.format("{\"username\":\"%s\", \"email\":\"%s\", \"password\":\"%s\"}",
                username, email, password);

        try {
            // Setup connection
            URL url = new URL(apiLink);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; utf-8");
            conn.setDoOutput(true);

            // Send JSON data
            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonData.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            // Read response
            Scanner responseScanner = new Scanner(conn.getInputStream(), "utf-8");
            StringBuilder response = new StringBuilder();
            while (responseScanner.hasNextLine()) {
                response.append(responseScanner.nextLine());
            }
            responseScanner.close();

            System.out.println("Response: " + response.toString());

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
`,

    php: `<?php

// ✅ Your API link here
$apiLink = '{your api link}'; 

// Get user input from CLI
echo "Enter username: ";
$username = trim(fgets(STDIN));

echo "Enter email: ";
$email = trim(fgets(STDIN));

echo "Enter password: ";
$password = trim(fgets(STDIN));

// Create data array
$data = array(
    'username' => $username,
    'email' => $email,
    'password' => $password
);

// Convert to JSON
$jsonData = json_encode($data);

// Initialize cURL
$ch = curl_init($apiLink);

// Set cURL options
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($jsonData)
));

// Execute request and get response
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    echo 'Error: ' . curl_error($ch);
} else {
    // Decode and print response
    $result = json_decode($response, true);
    if (isset($result['detail'])) {
        echo 'Error: ' . $result['detail'] . PHP_EOL;
    } else {
        echo ($result['message'] ?? 'Success') . ' | Email: ' . ($result['user_email'] ?? '') . PHP_EOL;
    }
}

// Close cURL
curl_close($ch);

?>
`,

    react: `import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [result, setResult] = useState('');

  // ✅ Your API link here
  const apiLink = '{your api link}'; 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiLink, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const resultData = await response.json();

      if (resultData.detail) {
        setResult('Error: ' + resultData.detail);
      } else {
        setResult(resultData.message + ' | Email: ' + resultData.user_email);
      }

    } catch (error) {
      console.log(error);
      setResult('Error: ' + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <div>{result}</div>
    </div>
  );
};

export default RegisterForm;
`,
  };

  return (
    <div className="min-h-full text-gray-100">
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-200 mb-2">API Integration Guide</h1>
        <p className="text-gray-300 italic">
          Learn how to use our API with code examples in different programming languages.
        </p>
      </header>

      <div className="mb-6">
        <div className="flex justify-start items-center">
          {Object.keys(codeSnippets).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={`px-4 py-2 mr-2 rounded font-medium ${
                activeTab === lang
                  ? 'bg-zinc-800 text-yellow-300'
                  : 'bg-zinc-900 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-zinc-800">
        <div className="flex justify-between items-center bg-zinc-800 p-3">
          <span className="text-sm text-gray-200 font-semibold">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Example
          </span>
          <button
            onClick={() => copyToClipboard(codeSnippets[activeTab])}
            className="flex items-center text-sm text-white hover:text-blue-300"
          >
            <FiCopy className="mr-1" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="p-4 bg-zinc-950 text-gray-300">
          <code>{codeSnippets[activeTab]}</code>
        </pre>
      </div>

      <div className="mt-8 bg-zinc-950 p-6 rounded-lg shadow border-zinc-800 border">
        <h2 className="text-xl font-bold text-gray-300 mb-4">API Reference</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-400">Base URL</h3>
            <p className="mt-1 text-gray-200 font-mono bg-zinc-800 p-2 rounded">
                https://saas-password.onrender.com/{'{Your Api Key}'}/user
            </p>
          </div>
        </div>
      </div>
    </div></div>
  );
};

export default ApiUsagePage;