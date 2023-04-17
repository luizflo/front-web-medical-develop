export interface ModuleOptions {
  onPrescriptionPrinted: (prescriptionData: unknown) => void;
  onPrescriptionExclude: (prescriptionId: number) => void;
}
