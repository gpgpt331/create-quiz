import axios from "axios";

const CASHTIME_SK = "sk_live_59JPuRgs95SF8M8y4ZxeT1HBjhRCQIYyQiJVqUx4zT";

async function generateSubscribeQrcode({
  userId,
  userName,
  userEmail,
  planId,
  planName,
  amount
}) {
  try {
    // Logando os dados recebidos para depuração
    console.log("Dados recebidos:", {
      userId,
      userName,
      userEmail,
      planId,
      planName,
      amount
    });


    const response = await axios.post(
      "https://api.pagmex.com/v1/transactions",
      {
        postbackUrl: "https://api.semlimitesenvios.com/api/webhooks/subscribe",
        amount: parseFloat(amount) * 100, // Convertendo para centavos
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
            number: "31847909086" // Certifique-se de que o CPF está correto
          }
        },
        items: [
          {
            title: planName || "Plano de Assinatura",
            unitPrice: parseFloat(amount) * 100, // Convertendo para centavos
            quantity: 1,
            tangible: false
          }
        ]
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: "Basic " + btoa(`${CASHTIME_SK}:x`)
        }
      }
    );

    const _cashtime = response.data;
    return { qrcode: _cashtime.pix.qrcode };
  } catch (error) {
    if (error.response) {
      // A resposta do servidor está disponível
      console.error("Erro ao gerar QR Code de assinatura:", error.response.data);
    } else {
      // Outro erro (rede, configuração, etc.)
      console.error("Erro ao gerar QR Code de assinatura:", error.message);
    }
    throw new Error("Falha ao buscar o QR code");
  }
}


export default generateSubscribeQrcode ;
