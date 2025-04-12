import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  RectangleEllipsis,
  Timer,
} from 'lucide-react';

export const labels = [
  {
    value: 'Pending',
    label: 'Pending',
  },
  {
    value: 'Processing',
    label: 'Processing',
  },
  // {
  //   value: 'Approved',
  //   label: 'Approved',
  // },
];

export const types = [
  {
    value: 'Barangay Indigency',
    label: 'Barangay Indigency',
    // icon: HelpCircle,
  },
  {
    value: 'Barangay Residency',
    label: 'Barangay Residency',
    // icon: HelpCircle,
  },
  {
    value: 'Barangay Clearance',
    label: 'Barangay Clearance',
    // icon: HelpCircle,
  },

  // {
  //   value: 'todo',
  //   label: 'Todo',
  //   icon: Circle,
  // },
  // {
  //   value: 'in progress',
  //   label: 'In Progress',
  //   icon: Timer,
  // },
  // {
  //   value: "done",
  //   label: "Done",
  //   icon: CheckCircle,
  // },
  // {
  //   value: "canceled",
  //   label: "Canceled",
  //   icon: CircleOff,
  // },
];

export const statuses = [
  {
    value: 'Pending',
    label: 'Pending',
    icon: Timer,
  },
  {
    value: 'Processing',
    label: 'Processing',
    icon: RectangleEllipsis,
  },
  {
    value: 'Approved',
    label: 'Approved',
    icon: CheckCircle,
  },
  // {
  //   value: 'in progress',
  //   label: 'In Progress',
  //   icon: Timer,
  // },
  // {
  //   value: "done",
  //   label: "Done",
  //   icon: CheckCircle,
  // },
  // {
  //   value: "canceled",
  //   label: "Canceled",
  //   icon: CircleOff,
  // },
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDown,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRight,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUp,
  },
];
