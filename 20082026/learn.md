**** What am I learning today?
** HTTP stuff: Exploring how the client interacts with the server through HTTP by analyzing URLs.

Example 1: Basic Local URL
http://localhost:3000/orders?status=completed&payment=credit_card

http: (Protocol): Simply think of it as a language so the client and server can communicate.

localhost (Address): The location of the resources.

3000 (Port): Where the server "listens" for requests from the client.

/orders (Path): Used to find the specific resource we want from the database/server.

?status=completed&payment=credit_card (Query String): Key-value pairs that can be used for filtering, pagination, or sorting.

Example 2: Real-World Secure URL
https://gemini.google.com/u/0/app/5f726eb2d9f143c9?hl=en-IN&pageId=none

(A lil diff than the url up there)

https: (Protocol): Has the "s" which means "secure" (u know what it mean).

gemini.google.com (Domain): google.com is the domain and gemini is the subdomain.

Hidden Port: This one has no port cuz HTTPS normally uses port 443, so it is hidden.

/u/0/app/5f726eb2d9f143c9 (Path & Path Parameter): The path to find the resource. That random string of letters and numbers at the end is a path parameter. It basically acts like a unique ID to find this exact chat session (they just put it directly in the URL instead of using a querystring like ?chatId=5f72...).

?hl=en-IN&pageId=none (Query String): Just like the first example, still key-value pairs. But instead of filtering database stuff, these are used for system config, like setting the display language to English-India (hl=en-IN).

** Request/Response headers/body
How Client and Server talk: Headers & Body
Every time they communicate, they send a "package" to each other. Each package (Request or Response) has 2 main parts.

1. HTTP Request (Client -> Server)
What the client sends when u click a link or submit a form.

Request Headers: The "envelope" or metadata. It tells the server background info like who is asking, what browser they use, or what type of data is attached (e.g., User-Agent, Content-Type).

Request Body: The actual data u want the server to process (like the username/password u type when logging in). Usually used in POST or PUT methods. GET requests normally don't have a body.

2. HTTP Response (Server -> Client)
What the server sends back after doing its job.

Response Headers: Metadata about the result. Tells the client how to handle the data. Includes the Status Code (like 200 OK or 404 Not Found) and Content-Type (telling the browser "hey, this is HTML, render it").

Response Body: The final result you actually asked for. It can be HTML code, a JSON object with database info, an image, video, etc.

TL;DR Analogy:

Headers = The envelope (addresses, stamps, instructions).

Body = The actual letter inside the envelope.