export interface Sensor {
  id: number;
  active: boolean;
  name: string;
  battery: number;
  last_communication: string;
  timestamps: string[];
  units: {
    battery: string;
    temperature: string;
    humidity: string;
    pressure: string;
  };
  data: {
    battery: number[];
    temperature: number[];
    humidity: number[];
    pressure: number[];
  };
}
