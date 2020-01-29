export enum EntryType {
  FOLDER = 'folder',
  GENERIC = 'generic',
  WEBSITE = 'website',
  PHONE = 'phone',
  CRYPTOKEY = 'cryptokey',
  EMAIL = 'email',
  CREDITCARD = 'creditcard',
  SHELL = 'shell',
  DOOR = 'door',
  DATABASE = 'database',
  FTP = 'ftp',
  VNC = 'desktop windows',
  REMOTEDESKTOP = 'remote desktop'
}

export enum RawFieldType {
  // CreditCard
  CREDITCARD_CARDTYPE = "creditcard-cardtype",
  CREDITCARD_CARDNUMBER = "creditcard-cardnumber",
  CREDITCARD_EXPIRYDATE = "creditcard-expirydate",
  CREDITCARD_CCV = "creditcard-ccv",

  // Phone
  PHONE_PHONENUMBER = "phone-phonenumber",

  // generic
  GENERIC_HOSTNAME = "generic-hostname",
  GENERIC_CERTIFICATE = "generic-certificate",
  GENERIC_KEYFILE = "generic-keyfile",
  GENERIC_LOCATION = "generic-location",
  GENERIC_CODE = "generic-code",
  GENERIC_USERNAME = "generic-username",
  GENERIC_PASSWORD = "generic-password",
  GENERIC_DATABASE = "generic-database",
  GENERIC_EMAIL = "generic-email",
  GENERIC_PORT = "generic-port",
  GENERIC_DOMAIN = "generic-domain",
  GENERIC_PIN = "generic-pin",
  GENERIC_URL = "generic-url",

  // fix fields
  NAME = 'name',
  DESCRIPTION = 'description',
  NOTES = 'notes',
  UPDATED = 'updated',
}

export enum HumanizedFieldType {
  // CreditCard
  CREDITCARD_CARDTYPE = "Card type",
  CREDITCARD_CARDNUMBER = "Card number",
  CREDITCARD_EXPIRYDATE = "Expiry date",
  CREDITCARD_CCV = "CCV",

  // Phone
  PHONE_PHONENUMBER = "Phone number",

  // generic
  GENERIC_HOSTNAME = "Hostname",
  GENERIC_CERTIFICATE = "Certificate",
  GENERIC_KEYFILE = "Keyfile",
  GENERIC_LOCATION = "Location",
  GENERIC_CODE = "Code",
  GENERIC_USERNAME = "Username",
  GENERIC_PASSWORD = "Password",
  GENERIC_DATABASE = "Database",
  GENERIC_EMAIL = "E-Mail",
  GENERIC_PORT = "Port",
  GENERIC_DOMAIN = "Domain",
  GENERIC_PIN = "Pin",
  GENERIC_URL = "URL",

  // fix fields
  DESCRIPTION = 'Description',
  NOTES = 'Notes',
  UPDATED = 'Updated',
  NAME = 'Name'
}