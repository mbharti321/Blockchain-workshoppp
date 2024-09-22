# Function to encrypt the message
def caesar_encrypt(text, shift):
    encrypted_text = ""
    
    for char in text:
        if char.isalpha():
            # Determine if the character is uppercase or lowercase
            offset = 65 if char.isupper() else 97
            # Shift the character and wrap it around using modulo 26
            encrypted_text += chr((ord(char) - offset + shift) % 26 + offset)
        else:
            # Keep non-alphabet characters unchanged
            encrypted_text += char
    
    return encrypted_text

# Function to decrypt the message
def caesar_decrypt(cipher_text, shift):
    return caesar_encrypt(cipher_text, -shift)

# Example usage
message = "Hello, World!"
shift_value = 3

# Encrypting the message
encrypted_message = caesar_encrypt(message, shift_value)
print(f"Encrypted Message: {encrypted_message}")

# Decrypting the message
decrypted_message = caesar_decrypt(encrypted_message, shift_value)
print(f"Decrypted Message: {decrypted_message}")
