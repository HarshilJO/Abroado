export interface Course {
  id: string;
  provider: string;
  country: string;
  campus_locations: string[];
  course: {
    name: string;
    level: string;
    specialization: string | null;
  };
  intakes: {
    raw: string;
    list: string[];
  };
  fees: {
    currency: string;
    tuition_numeric: number;
    period: string;
  };
  link: string;
}