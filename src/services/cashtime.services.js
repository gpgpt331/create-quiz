import axios from "axios";
const CASHTIME_SK = "sk_live_DwK6Yt9z1WSLkkIpoJYiyHG9LE5MJiThFPMPsWJipX"


const cashtimeservices = async (
  userId,
  userName,
  userEmail,
  planId,
  planName,
  amount) => {
  try {
      const { data: transaction } = await axios.post(
          "https://api.sandbox.hopysplit.com.br/v1/transfers",
          {
              postbackUrl: "https://adequate-amazement-production.up.railway.app/api/webhooks/subscribe",
              amount: parseFloat(amount) * 100 || 0,
              paymentMethod: "pix",
              metadata: {
                  userId,
                  planId
              },
              customer: {
                  name: userName,
                  email: userEmail,
                  document: {
                      type: "cpf",
                      number: "" // Assumindo que o número de CPF será preenchido aqui
                  }
              },
              items: [
                  {
                      title: planName || `Plano de Assinatura`,
                      unitPrice: parseFloat(amount) * 100 || 0,
                      quantity: 1,
                      tangible: false
                  }
              ]
          },
          {
              headers: {
                  accept: "application/json",
                  "content-type": "application/json",
                  authorization:
                      "Basic " + Buffer.from(`${CASHTIME_SK}:x`).toString("base64")
              }
          }
      );

      // Verifica se a transação retornou com sucesso e possui os dados do PIX
      if (transaction.status === 'processing' || transaction.status === 'waiting_payment') {
          return { qrcode: transaction.pix.qrcode };
      } else {
          throw new Error(`Transação falhou com status: ${transaction.status}`);
      }

  }   catch (error) {
    // Captura e exibe a resposta completa do erro para debugging
    console.log("Erro na requisição para Cashtime:", error.response?.data || error.message);
    throw new Error("failed to fetch qrcode");
}
};



export default cashtimeservices;