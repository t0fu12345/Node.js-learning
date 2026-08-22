const palindrome = (req, res) => {
    //http://localhost:3000/palindrome?text=radars
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const method = req.method;
    const text = parsedUrl.searchParams.get('text');

    if (method === 'GET') {
        let reversed = '';
        for (let i = text.length - 1; i >= 0; i--) {
            reversed += text[i];
        }

        const isPalindrome = (text === reversed);

        const result = {
            original_text: text,
            reversed_text: reversed,
            is_palindrome: isPalindrome
        };

        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
        res.end(JSON.stringify(result));
    }
};
module.exports = palindrome;
