/*
Encryption II: Vigenère Cipher
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.

Vigenère cipher is a type of polyalphabetic substitution. It uses the Vigenère square to encrypt and decrypt plaintext with a keyword.

  Vignenère square:
         A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
       +----------------------------------------------------
     A | A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
     B | B C D E F G H I J K L M N O P Q R S T U V W X Y Z A
     C | C D E F G H I J K L M N O P Q R S T U V W X Y Z A B
     D | D E F G H I J K L M N O P Q R S T U V W X Y Z A B C
     E | E F G H I J K L M N O P Q R S T U V W X Y Z A B C D
                ...
     Y | Y Z A B C D E F G H I J K L M N O P Q R S T U V W X
     Z | Z A B C D E F G H I J K L M N O P Q R S T U V W X Y

For encryption each letter of the plaintext is paired with the corresponding letter of a repeating keyword. For example, the plaintext DASHBOARD is encrypted with the keyword LINUX:
   Plaintext: DASHBOARD
   Keyword:   LINUXLINU
So, the first letter D is paired with the first letter of the key L. Therefore, row D and column L of the Vigenère square are used to get the first cipher letter O. This must be repeated for the whole ciphertext.

 */

const alpha = [...Array(26)].map((c, i) => String.fromCharCode(65 + i))

export function decryptCaesar(inp)
{
  const [plain, shift] = inp
  return plain.split('').map(c => alphaRot(shift, c)).join('')
}

export function decryptVigenere(inp)
{
  const [plain, key] = inp
  return plain.split('').map((a, i) =>  alphaRot(alpha.indexOf(key[i % key.length]), a)).join('')
}

function alphaRot(shift, sign){
  return alpha[((sign.charCodeAt(sign) - 65) + shift) % 26]
}

const testVigenere = [
  {
    input: ["PRINTMOUSELINUXDEBUGMEDIA", "BROWSER"],
    result: 'QIWJLQFVJSHARLYUSXMKDFUWW'
  }
]
