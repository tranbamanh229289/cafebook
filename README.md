# Environment Requirement:
* npm: `8.11.1` or higher.
* node: `v16.15.1` or higher.
* Install Expo app on your phone.

# How to run project:
1. Clone project: `git clone https://gitlab.com/crossplatform_it4788_20221/cafebook_app.git`.
1. Go into folder: `cd ./caFebook_app`.
1. Intall expo-cli: `npm i -g expo-cli`.
1. Install dependencies: `npm install --legacy-peer-deps`.
1. run: `expo start`.
1. Scan QR code on Expo app.

# Create development builds
1. `npm install -g eas-cli`
1. `npx expo install expo-dev-client`
1. `eas build --profile development --platform android`
1. `expo start --dev-client`