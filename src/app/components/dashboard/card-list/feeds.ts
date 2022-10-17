export interface feed {
  color: string;
  icon: string;
  title: string;
  subtitle: string;
}

export const feeds: feed[] = [
  {
    color: 'warn',
    icon: 'domain',
    title: 'Silo item deleted',
    subtitle: '21 minutes ago',
  },
  {
    color: 'primary',
    icon: 'domain',
    title: 'New Silo item added',
    subtitle: '20 minutes ago',
  },
  {
    color: 'primary',
    icon: 'settings_input_antenna',
    title: 'New Sensor item added',
    subtitle: '3 days ago',
  },
  {
    color: 'warn',
    icon: 'settings_input_antenna',
    title: 'Sensor item deactivated',
    subtitle: '10 days ago',
  },
  {
    color: 'primary',
    icon: 'domain',
    title: 'Silo item updated',
    subtitle: '11 days ago',
  },
  {
    color: 'primary',
    icon: 'domain',
    title: 'Silo item updated',
    subtitle: '13 days ago',
  },
];
