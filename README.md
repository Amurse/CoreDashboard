# DEACTIVATED
Note that this project is no longer active and all links have been deactivated. You are free to scroll through the code and the README to gain a general idea on the purpose of Amurse.

# CoreDashboard
This is the main repository which handles client side and the server side logic of Amurse.

## What is Amurse?

Amurse is a lightweight, easy to implement communication service for intercom, peer-to-peer chats, and group chats between any on-chain and off-chain identity. Amurse provides SDKs and biased frontend solutions to allow for easy interaction with the protocol.  
Our goal is to provide solutions which can be setup and integrated within 5-minutes across any platform.  Currently on any React/Next application!
![image](https://github.com/Amurse/CoreDashboard/assets/52187061/c45bf3c4-21eb-4000-b709-2aee3a8fcb6c)

Amurse does not store data on-chain. It requires wallet signature verification before sending or receiving messages. Amurse can verify all wallet addresses for the chains listed above via MetaMask.

## Technology
Amurse has a strong passion to be aligned with the views of the web3 community. Amurse has always wanted to be an on-chain solution.


### Live Message Streams
Amurse uses web-sockets to provide real-time functionality to receive and send messages between different users. A message is sent to the server upon creation, where it is processed and relayed to the connected peers of a conversation. The web-sockets allow for secure real-time communication between multiple parties.

![image](https://github.com/Amurse/CoreDashboard/assets/52187061/01d164f8-9fc8-43f2-8675-71aff669fdaf)

### Data Processing
Amurse uses multiple https microservices to process requests from different users. As the data comes in, Amurse validates data integrety and ensures the user has valid permissions to either write or read from a certain conversation.
The servers are hosted on Google Cloud for fast processing of data. On-chain nodes are not required as the users are not making any transaction with the chains.

### Data Storage 
Data is stored in a noSQL database, MongoDB, as of currently. Why? Amurse's goal is to provide services for general communications across any-chain, such as intercom, group chats and normal peer-to-peer chats. Stroing data on-chain is expensive.Additionally, storing data in a decentral manner serves no greater purpose than storing in MongoDB. Many argue, "What if MongoDB shuts down one day and all data is lost?", to which the answer is that the data is often sharded across multiple disks even on these centralized databases. Although yes, the possibility is there, in this current day and age, the possibility of established databases breaking is very little, maybe even less than the blockchains breaking through the increased influx of transactions.
On this note, Amurse is built for general conversations and is not meant to provide a framework for secure peer-to-peer type of conversations such as on WhatsApp, where privacy may be of a great concern.

### End-to-End Encryption
Currently Amurse communications are not encrypted due to the nature of conversations, where privacy is not a big concern. In the future, as Amurse looks to enter the field of private messaging for social media, all messages will be end-to-end encrypted through hybrid encryption. 
The plan is (subjected to change) Amurse will generate a symmetric key to encrypt data, which will be asymmetrically encrypted before it is shared amongst the peers. The messages will then be encrypted or decrypted using this symmetric key with AES-256 encryption. Symmetric encryption is faster as compared to asymmetric encryption. One of the frameworks which may be utilized includes the Noise Protocol Framework.

## Wallet SDK
Amuse SDK is a JavaScript package which enables easy integration with Amurse protocol. It allows for custom frontends to be created for any specific purpose without much complexity. 

### Installation
```
// yarn
yard add @amurse/chat_sdk

// npm
npm install @amurse/chat_sdk

```

### Initialization
```
import {amurseChatSDK} from '@amurse/chat_sdk';

const chatSDK = new amurseChatSDK('WALLET_ADDRESS');

// before accessing other functions, user identity must be verified
chatSDK.verifyUser();
```

### Chat Functions
Outline of all the chat functions provided by Amurse SDK for easy implementation.

#### Verify Users
To ensure the messages are delivered to the right user, the user identity is first validated through the user's wallet address. Validating identity establishes a secure connection with the backend.
```
// Must be called before any other chat functions
let success = await chatSDK.verifyUser();
```

#### Get Conversations
Gets a list of conversations that the user is a part of.
```
let conversations = await chatSDK.getConversations();
Get Messages
Gets the messages for a conversation which the user is a part of.
let currentMessages = await chatSDK.getMessages('conversation_id');
```
#### Create Conversation
Creates a conversation with the current user and a list of provided wallet addresses. Returns a Boolean upon success.
```
let success = await chatSDK.createConversation(
    ['WALLET_ADDRESS', 'WALLER_ADDRESS']
);
```
Once the conversation is created, we must listen to the created conversation through live events. See New Conversation (next).

#### Receive New Conversation (Real-time)
This is a live event where all peers connected to a conversation will receive the live update.
```
const callBack = (newConvo) => {
    // DO SOMETHING WITH NEW CONVERSATION
    console.log(newConvo);   
}

// calls the callback with a the conversation object
chatSDK.onNewConversation(callback);
```

#### Receive New Message (Real-time)
This is a live event where all peers a part of conversation will receive the live update. When a message belongs to a new conversation, the real-time event for new conversation will always be triggered before the new message event.
```
const callBack = (newMsg) => {
    // DO SOMETHING WITH NEW MESSAGE
    console.log(newMsg);   
}

// calls the callback with a the conversation object
chatSDK.onNewMessage(callback);
```

#### Send New Message (Real-time)
Creates a message within the provided conversation.
```
let success = await chatSDK.newMessage({
    msg: 'STRING',
    convoId: 'conversation_id',
});
```

# How to use
The repository is follows a monolith structure. There are 2 sub-sections to this project; the server side and the client side.

The client side code uses React.JS and communicates with the server using axios. For development, the client side code can be run as a standalone entity for faster development. For production, the react code is built and put into a build folder. The static code inside in the build folder is served directed through the Express.JS server.

## Development

### 1. Configure .env files
The sample .env files are provided in the code. Please get your own keys for the respective services and insert them in the .env files

### 2. Build and run the client
```
// from the project root directory
cd client

// build the code
yarn build

// run the code
yarn start
```

After configuring the .env file in the client code, run `yarn build` to build the client side code into a static directory. Run the client side using `yarn start`. The server is accessible on port 3000 of localhost.

### 3. Run the server
You can run the server with `node` or `nodemon` using the command `nodemon index.js`. By default, the Express.js will serve the client side files from the build folder from step 2. The server runs of port 5000 of localhost. This is a reflection of what will be seen in productiion, however, for local development of the the frontend, it is sufficient to use port 3000.

