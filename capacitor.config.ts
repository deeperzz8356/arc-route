import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.4544a2e0d3924742a817e86282dcdf7c',
  appName: 'arc-route',
  webDir: 'dist',
  server: {
    url: 'https://4544a2e0-d392-4742-a817-e86282dcdf7c.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      presentationStyle: 'fullscreen'
    }
  }
};

export default config;
