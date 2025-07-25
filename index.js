import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = "AduIr4lQrGxsU04Gs_B1VfPec_MuEVNcPeHYyu55Y31npr9XgkbuamHWLa4DAKW-OA6R-d_wtaEZlHul";
const CLIENT_SECRET = "EA_fxID0DQcp6X4p1NGOvbP3J2fcBFzIZCXDRE1cmE9f-QbA6tz4meyBeN4YuFJoxaPcTN2D8-e25ka_"; // ← احصلي عليه من PayPal Dashboard
const BASE = "https://api-m.paypal.com"; // غيّريه إلى sandbox لو كنتِ في وضع التجربة

async function generateAccessToken() {
  const response = await axios({
    url: `${BASE}/v1/oauth2/token`,
    method: "post",
    auth: {
      username: CLIENT_ID,
      password: CLIENT_SECRET
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: "grant_type=client_credentials"
  });

  return response.data.access_token;
}

app.post("/create-order", async (req, res) => {
  const accessToken = await generateAccessToken();
  const order = await axios.post(`${BASE}/v2/checkout/orders`, {
    intent: "CAPTURE",
    purchase_units: [{
      amount: {
        currency_code: "USD",
        value: "250.00"
      }
    }]
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  res.json({ orderID: order.data.id });
});

app.post("/capture-order", async (req, res) => {
  const { orderID } = req.body;
  const accessToken = await generateAccessToken();

  const capture = await axios.post(`${BASE}/v2/checkout/orders/${orderID}/capture`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  res.json(capture.data);
});

app.listen(3000, () => console.log("Server running on port 3000"));
