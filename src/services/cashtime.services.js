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
                        number: "12345678900" // Substitua por um CPF de teste válido
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
                    authorization: "Basic " + btoa(`${CASHTIME_SK}:x`)
                }
            }
        );
  
        console.log("Resposta da Transação:", transaction);
  
        if (transaction.status === 'processing' || transaction.status === 'waiting_payment') {
            return { qrcode: transaction.pix.qrcode };
        } else {
            throw new Error(`Transação falhou com status: ${transaction.status}`);
        }
  
    } catch (error) {
        console.log("Erro na requisição para Cashtime:", error.response?.data || error.message);
        throw new Error(`Falha ao buscar o QR code: ${error.response?.data?.message || error.message}`);
    }
  };
  
  export default cashtimeservices;
  