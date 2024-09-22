import hashlib

# Function to hash input text using MD5
def hash_with_md5(text):
    # Encode the input string to bytes and hash it
    hash_object = hashlib.md5(text.encode())
    
    # Convert the hash object to a hexadecimal string
    hash_hex = hash_object.hexdigest()
    
    return hash_hex

# Main function to get input from user and display the MD5 hash
def main():
    # Get user input
    text = input("Enter the text to hash: ")
    
    # Hash the input text using MD5
    hash_result = hash_with_md5(text)
    
    # Display the hash result
    print(f"MD5 Hash: {hash_result}")

# Run the program
if __name__ == "__main__":
    main()


# example ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# input: Hello World!
# output: ed076287532e86365e841e92bfc50d8c

# Simulation website: https://emn178.github.io/online-tools/md5.html