import { ModuleOptions } from "../memedDomain";
import { MdHubNotInitializedError } from "../errors";

export default function setupOptions(options: ModuleOptions): void {
  if (!("MdHub" in window)) {
    throw MdHubNotInitializedError;
  }

  const { onPrescriptionPrinted, onPrescriptionExclude } = options;

  window.MdHub.event.add("prescricaoImpressa", onPrescriptionPrinted);
  window.MdHub.event.add("prescricaoExcluida", onPrescriptionExclude);
}
