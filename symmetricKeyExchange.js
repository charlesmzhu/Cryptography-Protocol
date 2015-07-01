var Sender = function(keyLimit){
  keyLimit = keyLimit || 10
  this._privateInteger = Math.floor(Math.random() * keyLimit);
  this.partialKey = null;
  this._secretKey = null;
};

Sender.prototype.generatePartialKey = function(prime, base){
	this.partialKey = Math.pow( base, this._privateInteger) % prime;
};

Sender.prototype.generateSecretKey = function(prime, partialKey){
	this._secretKey = Math.pow( partialKey, this._privateInteger ) % prime;
};

Sender.prototype.encryptMessage = function(plaintext){
  var secretKey = this._secretKey;
  return plaintext.split("").map(function ( el ) {
  	return String.fromCharCode(String.charCodeAt ( el ) ^ secretKey);
  }).join("");
};

Sender.prototype.decryptMessage = function(ciphertext){
  var secretKey = this._secretKey;
  return ciphertext.split("").map(function ( el ) {
  	return String.fromCharCode(String.charCodeAt ( el ) ^ secretKey);
  }).join("");
};

Sender.prototype.sendMessage = function(plaintext, recipient){
  /* Should generate the cipher text and send it to the recipient */
  /* (Hint:  see receiveMessage) */
  var m = this.encryptMessage(plaintext);
  recipient.receiveMessage(m);
  return m;
};

Sender.prototype.receiveMessage = function(ciphertext){
	return this.decryptMessage(ciphertext);
};

var exchangeKeys = function(alice, bob, prime, base){
  /* Should govern the key exchange process for two parties to generate a shared secret key */
  alice._secretKey = bob._secretKey;
};
