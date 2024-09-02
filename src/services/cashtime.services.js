import axios from "axios";

const CASHTIME_SK = "sk_live_DwK6Yt9z1WSLkkIpoJYiyHG9LE5MJiThFPMPsWJipX";

async function generateSubscribeQrcode({
  userId,
  userName,
  userEmail,
  planId,
  planName,
  amount
}) {
  try {
    const response = await axios.post(
      "http://api.gateway.cashtimepay.com.br/v1/transactions",
      {
        postbackUrl: "https://api.semlimitesenvios.com/api/webhooks/subscribe",
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
            number: "31847909086" // Ajuste conforme necessário
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
          authorization: "Basic " + Buffer.from(`${CASHTIME_SK}:x`).toString("base64")
        }
      }
    );

    const _cashtime = response.data;
    return { qrcode: _cashtime.pix.qrcode };
  } catch (error) {
    console.error("Erro ao gerar QR Code de assinatura:", error.response?.data || error.message);
    throw new Error("Falha ao buscar o QR code");
  }
}

// Aqui estamos exportando a função como padrão
export default generateSubscribeQrcode;
