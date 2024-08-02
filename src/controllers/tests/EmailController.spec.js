// DESCRIBE --> declara um bloco de testes, reunindo eles (testsuites)
// IT OR TEST --> declara um único teste unitário (testcases)
// EXPECT --> faz asserções acerca do resultado do teste unitário 

const EmailController = require('../EmailController');
const EmailQueue = require('../../queue/MailQueue');
const MailQueue = require('../../queue/MailQueue');

jest.mock('../../queue/MailQueue');

describe("Email Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test("Should sent email successfully", async () => {
        const request = {
            body: {
                email: "teste@example.com",
                firstName: "John",
                lastName: "Hill"
            }
        }

        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn()
        }

        const template = `
        Olá ${request.body.firstName} ${request.body.lastName}, sua assinatura foi confirmada!
        Para acessar seus recursos exclusivos você precisa basta clicar aqui.
    `

        await EmailController.sendEmail(request, reply);

        expect(EmailQueue.add).toHaveBeenCalledTimes(1);
        expect(EmailQueue.add).toHaveBeenCalledWith({
            to: "teste@example.com",
            from: process.env.EMAIL_FROM,
            subject: "Assinatura Confirmada",
            text: template
        });
        expect(reply.code).toHaveBeenCalledWith(200);
    })

    test("Should return error when not send email", async () => {
        const request = {
            body: {
                email: "teste@example.com",
                firstName: "John",
                lastName: "Hill"
            }
        }

        const reply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn()
        }

        MailQueue.add.mockRejectedValue(new Error("Mocking exception"));

        await EmailController.sendEmail(request, reply);

        expect(EmailQueue.add).toHaveBeenCalledTimes(1);
        expect(reply.code).toHaveBeenCalledWith(500);
        expect(reply.send).toHaveBeenCalledWith("Internal Server Error");
    })
})