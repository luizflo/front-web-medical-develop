import { MdHubNotInitializedError } from "../errors";
import { PacientInterface } from "src/interfaces/pacient";

export default async function setMemedPatient(
  patient: PacientInterface
): Promise<void> {
  if (!("MdHub" in window)) {
    throw MdHubNotInitializedError;
  }

  const { nome, endereco, cidade, telefone, peso, altura, idExterno, cpf } =
    patient;
  await window.MdHub.command.send("plataforma.prescricao", "setPaciente", {
    nome,
    endereco,
    cidade,
    telefone,
    peso,
    altura,
    idExterno,
    cpf,
  });
}
