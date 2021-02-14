# Demo system designed with Microservice architecture

## Diagram

---

## Services

### Gateway

#### Role 

API Gateway for frontend

#### Technology

GraphQL

TypeScript

- apollo-server

---

### Message Broker

#### Role

Communication between services

#### Technology

Apache Kafka (Confluent)

---

## Development environment

Install firebase cli

```
yarn global add firebase-tools
```

Generate token

```
firebase login:ci
```

Visit displayed URL and authentication

Copy displayed token and create `.env` file to firebase directory

```bash:firebase/.env
FIREBASE_TOKEN=<Your token>
```

Generate `.firebaserc` and `firebase.json`

```shell
cd firebase
FIREBASE_TOKEN=<Your token> firebase init
...
# Select or create project
? Please select an option: (Use arrow keys)
❯ Use an existing project
  Create a new project
  Add Firebase to an existing Google Cloud Platform project
  Don't set up a default project
...
? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices.
 ◯ Database: Configure Firebase Realtime Database and deploy rules
 ◯ Firestore: Deploy rules and create indexes for Firestore
 ◯ Functions: Configure and deploy Cloud Functions
 ◯ Hosting: Configure and deploy Firebase Hosting sites
 ◯ Storage: Deploy Cloud Storage security rules
❯◉ Emulators: Set up local emulators for Firebase features
 ◯ Remote Config: Get, deploy, and rollback configurations for Remote Config
...
=== Emulators Setup
? Which Firebase emulators do you want to set up? Press Space to select emulators, then Enter to confirm your choices. (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◉ Authentication Emulator
 ◯ Functions Emulator
 ◯ Firestore Emulator
 ◯ Database Emulator
 ◯ Hosting Emulator
 ◯ Pub/Sub Emulator
...
? Would you like to download the emulators now? (y/N) y
```

Back to root directory

```
cd ../
```

Run containers with docker-compose

```
docker-compose up -d --build
```
