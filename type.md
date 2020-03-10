# LUMO Message Types

### General guidelines

Each message type triggers different actions on the receiving node. Messages can be saved in a node's DB, and  sent in realtime (such as over a websocket), to client devices.

If the `sender.pub_key` of a received message is not recognized by the node, a new Contact record can be created. Similarly, if an unrecognized `chat.uuid` is received, a new Chat record can be created.

### 0. message

A standard `LUMO` chat message, must send at least one sat to be recognized. `message.content` contains the text, encrypted with the senders RSA key (on their client device).

### 1. confirmation

Message confirmation, that sends the `message.id` field back to the sender, so they know their message was received.

### 2. invoice

Lightning invoice string, contained in `message.invoice`

### 3. payment

Lightning invoice payment

### 4. Cancellation

### 5. Direct Payment

Lightning `keysend` payment

### 6. Attachment

The `message` contains `mediaToken`, `mediaType`, and `mediaKey` fields.
 - `mediaToken`: can be complete, or unfinished, indicating that the media is for sale. (See mediaToken.md for more info).
 - `mediaType`: MIME type of the meida file
 - `mediaKey`: AES key for decrypting the file (encrypted with the receiver's RSA public key)

### 7. Purchase

Purchase of an attachment

### 8. Purchase Accept

If a purchase message includes the indicated price, the completed `mediaToken` and `mediaKey` will be returned to the buyer.

### 9. Purchase Deny

If the purchase message does not include the right amount of sats, they should be returned.

### 10. Contact Key

Share your RSA public key in `sender.contact_key`

### 11. Contact Key Confirmation

After receiving an RSA public key from a contact, share yours as well.

### 12. Group Create

### 13. Group Invite

### 14. Group Join

### 15. Group Leave

### 16. Group Leave
