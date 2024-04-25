//Microsoft (R) Visual C# Compiler version 3.4.0-beta4-19562-05 (ff930dec)
//Copyright (C) Microsoft Corporation. All rights reserved.


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Rextester
{
    public static class NewMethodClass {
  
                // Method 4
                public static bool IsPalindrome(this string myString)
                {
                return myString.SequenceEqual(myString.Reverse());;
                }
  
                // Method 5
                public static int ReverseDigits(this int num)
                {
                        int result=0;
                        while (num>0) 
                        {
                           result = result*10 + num%10;
                           num /= 10;
                        }
                        return result;
                }
    }
    public class Program
    {
        
        public static void Main(string[] args)
        {
            string s = "abc";
            Console.WriteLine(s + " is " + (s.IsPalindrome()?"":"not ") + "palindrome");
            s = "abcba";
            Console.WriteLine(s + " is " + (s.IsPalindrome() ? "" : "not ") + "palindrome");
            int i = 1234;
            Console.WriteLine("Reverse of " + i + " is " + i.ReverseDigits());

            Console.WriteLine("Hello, world!");
        }
    }
}