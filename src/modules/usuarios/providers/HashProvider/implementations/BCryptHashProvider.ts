import IHashProvider from "../models/IHashProvider";
import { hash, compare } from "bcryptjs";

export default class BCryptHashProvider implements IHashProvider {
  public async gerarHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
  public async compararHash(payload: string, hashGerado: string): Promise<boolean> {
    return compare(payload, hashGerado);
  }

}
