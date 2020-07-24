import IMailProvider from "../models/IMailProvider";

interface IMensagem {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private mensagem: IMensagem[] = [];

  public async enviarEmail(to: string, body: string): Promise<void> {
    this.mensagem.push({
      to,
      body
    })
  }
}
