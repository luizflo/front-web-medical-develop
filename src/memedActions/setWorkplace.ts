import { Professional } from "src/interfaces";
import { MdHubNotInitializedError } from "../errors";

export default function setWorkplace(): void {
  if (!("MdHub" in window)) {
    throw MdHubNotInitializedError;
  }
  window.MdHub.command.send("plataforma.prescricao", "setWorkplace", {
    city: "Londrina",
    state: "PR",
    local_name: "El Shadai",
    address: "Avenida Santos Dumont, 1035",
    phone: 4333054370,
  });
}
