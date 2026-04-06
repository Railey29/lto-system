import type { ModuleGroup } from "../types/uaa";

export const MODULE_GROUPS: ModuleGroup[] = [
  {
    title: "Driver's Licensing System (DLS)",
    options: [
      {
        value: "DLS Access and Examination",
        label: "DLS Access and Examination",
      },
      {
        value: "Interface for Clinic Users",
        label: "Interface for Clinic Users",
        chiefOnly: true,
      },
      {
        value: "Client Care Officer – Link Client",
        label: "Client Care Officer – Link Client",
      },
      {
        value: "Client Care Officer Search DL",
        label: "Client Care Officer Search DL",
      },
    ],
  },
  {
    title: "Motor Vehicle Inspection and Registration System (MVIRS)",
    options: [
      { value: "MV Approving Officer", label: "MV Approving Officer" },
      {
        value: "MV Officer w/o Biometrics",
        label: "MV Officer w/o Biometrics",
      },
      { value: "MV Releasing Officer", label: "MV Releasing Officer" },
      { value: "MV DO Inspector", label: "MV DO Inspector" },
      {
        value: "MV Super Administrator",
        label: "MV Super Administrator",
        chiefOnly: true,
      },
      {
        value: "Plate Management Requests (Regional Office)",
        label: "Plate Management Requests (Regional Office)",
      },
      {
        value: "Plate Management Requests (Requestor Office)",
        label: "Plate Management Requests (Requestor Office)",
      },
      {
        value: "Plate Management Tracking (NRU)",
        label: "Plate Management Tracking (NRU)",
      },
      {
        value: "MVIRS Plate Admin Role (NRU)",
        label: "MVIRS Plate Admin Role (NRU)",
      },
      {
        value: "MVIRS – Overview",
        label: "MVIRS – Overview",
      },
    ],
  },
  {
    title: "Law Enforcement and Traffic Adjudication System",
    options: [
      {
        value: "Law Enforcer/ Deputized Agent (Handheld)",
        label: "Law Enforcer/ Deputized Agent (Handheld)",
      },
      {
        value: "Data Control Officer (Apprehension Encoder)",
        label: "Data Control Officer (Apprehension Encoder)",
      },
      { value: "TAS Hearing Officer", label: "TAS Hearing Officer" },
      {
        value: "TAS Approving Officer/Director",
        label: "TAS Approving Officer/Director",
        chiefOnly: true,
      },
      {
        value: "Alarm Internal Account – Requestor",
        label: "Alarm Internal Account – Requestor",
      },
      {
        value: "Alarm Internal Account – Approving",
        label: "Alarm Internal Account – Approving",
        chiefOnly: true,
      },
      {
        value: "Alarm Internal Account – Tagging/Lifting",
        label: "Alarm Internal Account – Tagging/Lifting",
      },
      {
        value: "Custodian and Releasing Section (CRS Officer)",
        label: "Custodian and Releasing Section (CRS Officer)",
      },
      {
        value: "Intervention Program",
        label: "Intervention Program",
      },
      {
        value: "Lift Suspension – Requestor",
        label: "Lift Suspension – Requestor",
      },
      {
        value: "Lift Suspension – Approving",
        label: "Lift Suspension – Approving",
      },
      {
        value: "LETAS: View Apprehensions",
        label: "LETAS: View Apprehensions",
      },
      {
        value: "Closing/Lifting of Pending Migrated Apprehension/Alarm",
        label: "Closing/Lifting of Pending Migrated Apprehension/Alarm",
        chiefOnly: true,
      },
    ],
  },
  {
    title: "Inter-Agency Collaboration (OGA)",
    options: [
      { value: "Apprehension", label: "Apprehension" },
      { value: "Alarm", label: "Alarm" },
    ],
  },
  {
    title: "Revenue Collection System",
    options: [
      {
        value: "RCS Primary Cashier User",
        label: "RCS Primary Cashier User",
      },
      {
        value: "RCS Cashier User",
        label: "RCS Cashier User",
      },
      {
        value: "RCS Official Receipt (Office)",
        label: "RCS Official Receipt (Office)",
      },
      {
        value: "RCS Official Receipt (Region Office)",
        label: "RCS Official Receipt (Region Office)",
      },
      {
        value: "RCS OR Cancellation Requestor",
        label: "RCS OR Cancellation Requestor",
        chiefOnly: true,
      },
      {
        value: "RCS Resident Auditor",
        label: "RCS Resident Auditor",
      },
    ],
  },
  {
    title: "Others",
    options: [
      {
        value: "Frontliner - Client Assistance",
        label: "Frontliner - Client Assistance",
      },
      {
        value: "Clients Admin – Client Verification",
        label: "Clients Admin – Client Verification",
        chiefOnly: true,
      },
      {
        value: "Clients Admin – Biometrics Enroll",
        label: "Clients Admin – Biometrics Enroll",
      },
      {
        value: "Client Care Officer – View Address Only",
        label: "Client Care Officer – View Address Only.",
      },
      {
        value: "OAAS – View Appointment",
        label: "OAAS – View Appointment",
      },
      {
        value: "Stakeholder - RO OD Evaluator",
        label: "Stakeholder - RO OD Evaluator",
      },
      {
        value: "Stakeholder – Stakeholder Enrollment Access",
        label: "Stakeholder – Stakeholder Enrollment Access",
      },
      {
        value: "Client Care Officer Edit Stakeholder Details",
        label: "Client Care Officer Edit Stakeholder Details",
      },
      {
        value: "Client Care Officer Edit Stakeholder Representative Details",
        label: "Client Care Officer Edit Stakeholder Representative Details",
      },
      {
        value: "Imported Legacy Motor Vehicle (Regular Only)",
        label: "Imported Legacy Motor Vehicle – (Regular Only)",
      },
      {
        value: "Client Care Edit Plate from 7 to 6 digits",
        label: "Client Care Edit Plate from 7 to 6 digits",
        chiefOnly: true,
      },
      {
        value: "Others. Please specify",
        label: "Others. Please specify",
      },
    ],
  },
];
