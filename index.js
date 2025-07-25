Welcome to Node.js v22.17.1.
Type ".help" for more information.
> {
...   "name": "paypal-server",
...   "version": "1.0.0",
...   "main": "index.js",
...   "type": "module",
...   "scripts": {
...     "start": "node index.js"
...   },
...   "dependencies": {
...     "axios": "^1.6.0",
...     "cors": "^2.8.5",
...     "express": "^4.18.2"
...   }
... }
{
  name: 'paypal-server',
  version: '1.0.0',
  main: 'index.js',
  type: 'module',
  scripts: { start: 'node index.js' },
  dependencies: { axios: '^1.6.0', cors: '^2.8.5', express: '^4.18.2' }
}
> import express from "express";
import express from "express";
^^^^^^

Uncaught:
SyntaxError: Cannot use import statement inside the Node.js REPL, alternatively use dynamic import: const { default: express } = await import("express");
> import axios from "axios";
import axios from "axios";
^^^^^^

Uncaught:
SyntaxError: Cannot use import statement inside the Node.js REPL, alternatively use dynamic import: const { default: axios } = await import("axios");
> import cors from "cors";
import cors from "cors";
^^^^^^

Uncaught:
SyntaxError: Cannot use import statement inside the Node.js REPL, alternatively use dynamic import: const { default: cors } = await import("cors");
>
> const app = express();
Uncaught ReferenceError: express is not defined
> app.use(cors());
Uncaught ReferenceError: app is not defined
> app.use(express.json());
Uncaught ReferenceError: app is not defined
>
> const CLIENT_ID = "AduIr4lQrGxsU04Gs_B1VfPec_MuEVNcPeHYyu55Y31npr9XgkbuamHWLa4DAKW-OA6R-d_wtaEZlHul";
undefined
> const CLIENT_SECRET = "YOUR_CLIENT_SECRET_HERE"; // ← استبدل هذا من PayPal
undefined
> const BASE = "https://api-m.paypal.com"; // أو sandbox لو أردت تجريب
undefined
>
> // توليد التوكن
undefined
> async function generateAccessToken() {
...   const response = await axios({
...     url: `${BASE}/v1/oauth2/token`,
...     method: "post",
...     auth: {
...       username: CLIENT_ID,
...       password: CLIENT_SECRET
...     },
...     headers: {
...       "Content-Type": "application/x-www-form-urlencoded"
...     },
...     data: "grant_type=client_credentials"
...   });
...   return response.data.access_token;
... }
undefined
>
> // إنشاء الطلب
undefined
> app.post("/create-order", async (req, res) => {
...   const accessToken = await generateAccessToken();
...   const order = await axios.post(`${BASE}/v2/checkout/orders`, {
...     intent: "CAPTURE",
...     purchase_units: [{
...       amount: {
...         currency_code: "USD",
...         value: "250.00"
...       }
...     }]
...   }, {
...     headers: {
...       Authorization: `Bearer ${accessToken}`
...     }
...   });
...
...   res.json({ orderID: order.data.id });
... });
Uncaught ReferenceError: app is not defined
>
> // تنفيذ الطلب
undefined
> app.post("/capture-order", async (req, res) => {
...   const { orderID } = req.body;
...   const accessToken = await generateAccessToken();
...
...   const capture = await axios.post(`${BASE}/v2/checkout/orders/${orderID}/capture`, {}, {
...     headers: {
...       Authorization: `Bearer ${accessToken}`
...     }
...   });
...
...   res.json(capture.data);
... });
Uncaught ReferenceError: app is not defined
>
> app.listen(3000, () => console.log("Server running on port 3000"));
Uncaught ReferenceError: app is not defined
>
