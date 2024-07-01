import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.unioneinc.app',
  appName: 'chat-app-ionic',
  webDir: 'www',
  // bundledWebRuntime: false,
  android: {
    packageName: 'com.unioneinc.app'
  },
  // 필요한 경우 iOS 설정도 추가할 수 있습니다
  // ios: {
  //   bundleId: 'com.unioneinc.app'
  // },
  // 기타 플랫폼별 설정이나 전역 설정을 여기에 추가할 수 있습니다
};

export default config;