<div id="paypal-button-container"></div>

<script src="https://www.paypal.com/sdk/js?client-id=AduIr4lQrGxsU04Gs_B1VfPec_MuEVNcPeHYyu55Y31npr9XgkbuamHWLa4DAKW-OA6R-d_wtaEZlHul&currency=USD"></script>
<script>
  paypal.Buttons({
    createOrder: function(data, actions) {
      return fetch("https://your-server.com/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: [
            { id: 1, name: "استشارة تسويقية", quantity: 1, price: 250 }
          ]
        })
      })
      .then(res => res.json())
      .then(data => data.orderID);
    },
    onApprove: function(data, actions) {
      return fetch("https://your-server.com/capture-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderID: data.orderID
        })
      })
      .then(res => res.json())
      .then(details => {
        alert("تم الدفع بنجاح! شكراً لك، " + details.payer.name.given_name);
      });
    }
  }).render("#paypal-button-container");
</script>
