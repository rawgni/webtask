def isPalindrome(s):
    return s == s[::-1]

print not isPalindrome('hello') and isPalindrome('racecar')
