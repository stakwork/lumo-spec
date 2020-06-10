
interface LUMO {
    type: Type;
    sender: Contact;
    chat: Chat;
    message: Message;
}

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

interface Contact {
    pub_key: string; // LND public key
    contact_key: string; // RSA public key for e2e encryption
    alias?: string; // name
    photo_url?: string;
}

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

interface Message {
    id: number;
    content: string; // encrypted with RSA key
    amount: number;
    invoice: string;
    mediaKey: string;
    mediaType: string;
    mediaToken: MediaToken;
}
interface MediaToken extends String{};