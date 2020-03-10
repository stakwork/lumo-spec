# LUMO: Lightning Universal Messaging Objects

`LUMO` is a data format and set of utility libraries for sending messages over the Lighting Network. It includes capabilites for scenarios such as:

 - messages with confirmations
 - end-to-end encryption
 - sending and receiving BTC payments
 - automatically creating new contacts from messages
 - group chats, with admins and mods
 - media and file attachments
 - buying and selling access to media

### Why chat on Lightning?

`LUMO` messages are sent as Lightning Network `keysend` invoices, so BTC micropayments are supported natively. Each message sends a mimimum of 1 satoshi. Lightning-based chat incentivizes the creation of Lighting Network "hubs" (nodes that manage channels with large amounts of other nodes), and provides built-in mechanisms for monetizing other digital services (such as file storage). Our apps built with `LUMO` aim to enable secure and private chat, as well as empowering content producers to sell their digital creations online.

### spec

`LUMO` messages are comprised of a set of standard fields, so client can know exactly how to respond to each message type. Fields other than specified in this document should be ignored.

The basic structure of a `LUMO` message is:
```ts
interface LUMO {
    type: Type;
    sender: Contact;
    chat: Chat;
    message?: Message;
}
```

**type**

The "type" field determines how a client responds to a received message. See type.md for guidelines about how to respond to each message type.
```ts
enum Type {
    message,
    confirmation,
    invoice,
    payment,
    cancellation,
    direct_payment,
    attachment,
    purchase,
    purchase_accept,
    purchase_deny,
    contact_key,
    contact_key_confirmation,
    group_create,
    group_invite,
    group_join,
    group_leave,
    group_query,
}
```

**contact**

The "sender" field specifies the Contact

```ts
interface Contact {
    pub_key: string; // LND public key
    contact_key: string; // RSA public key for e2e encryption
    alias: string; // name
}
```

**chat**

The "chat" field give details about the chat room that the message is destined for

```ts
interface Chat {
    uuid: string; // unique ID 
    type: ChatType;
    name?: string; // Chat room name
    members?: {[pub_key:string]: ChatMember};
    rsa_sig?: string;
}
enum ChatType {
    conversation,
    group,
}
interface ChatMember {
    key: string;
    alias?: string;
    role?: ChatRole;
}
enum ChatRole {
    owner,
    admin,
    mod,
    writer,
    reader,
}
```

**message**

The "message" field contains the actual message data

```ts
interface Message {
    id: number;
    content?: string; // encrypted with RSA key
    amount?: number; // this field is injected from the keysend
    invoice?: string; // Lightning invoice string
    mediaKey?: string;
    mediaType?: string;
    mediaToken?: MediaToken;
}
 // see mediaTokens.md for details
interface MediaToken extends String{};
```