//Microsoft (R) Visual C# Compiler version 3.4.0-beta4-19562-05 (ff930dec)                   
//Copyright (C) Microsoft Corporation. All rights reserved.                   


using System;                    
using System.Collections.Generic;                     
using System.Linq;                     
using System.Text.RegularExpressions;                    

namespace Rextester{

public class Program
{
       public class Time2
       {

                private int timeStampFromMidnight;

                // constructor can be called with zero, one, two or three arguments
                public Time2(int hour = 0, int minute = 0, int second = 0)
                {
                   SetTime(hour, minute, second); // invoke SetTime to validate time
                }

                // Time2 constructor: another Time2 object supplied as an argument
                public Time2(Time2 time)
                   : this(time.Hour, time.Minute, time.Second) { }

                // set a new time value using universal time; invalid values
                // cause the properties' set accessors to throw exceptions
                public void SetTime(int hour, int minute, int second)
                {

                   Hour = hour; // set the Hour property
                   Minute = minute; // set the Minute propertys
                   Second = second; // set the Second property
                }

                // property that gets and sets the hour
                public int Hour
                {
                   get
                   {
                      return timeStampFromMidnight/3600;
                   }
                   set
                   {
                      if (value < 0 || value > 23)
                      {
                         throw new ArgumentOutOfRangeException(nameof(value),
                            value, $"{nameof(Hour)} must be 0-23");
                      }

                      timeStampFromMidnight -=((timeStampFromMidnight/3600)*3600);
                      timeStampFromMidnight +=value*3600;
                   }
                }

                // property that gets and sets the minute
                public int Minute
                {
                   get
                   {
                      return (timeStampFromMidnight % 3600)/60;
                   }
                   set
                   {
                      if (value < 0 || value > 59)
                      {
                         throw new ArgumentOutOfRangeException(nameof(value),
                            value, $"{nameof(Minute)} must be 0-59");
                      }
                      int hoursInSec=(timeStampFromMidnight/3600)*3600;
                      int muniteInSec=((timeStampFromMidnight-hoursInSec)/60)*60;
                      int restOfSec=timeStampFromMidnight-hoursInSec-muniteInSec;
                      timeStampFromMidnight -=muniteInSec;
                      timeStampFromMidnight +=value*60;
                   }
                }

                // property that gets and sets the second
                public int Second
                {
                   get
                   {
                      return (timeStampFromMidnight % 3600)%60;
                   }
                   set
                   {
                      if (value < 0 || value > 59)
                      {
                         throw new ArgumentOutOfRangeException(nameof(value),
                            value, $"{nameof(Second)} must be 0-59");
                      }

                      int hoursInSec=(timeStampFromMidnight/3600)*3600;
                      int muniteInSec=((timeStampFromMidnight-hoursInSec)/60)*60;
                      int restOfSec=timeStampFromMidnight-hoursInSec-muniteInSec;
                      timeStampFromMidnight -=restOfSec;
                      timeStampFromMidnight +=value;
                   }
                }

                // convert to string in universal-time format (HH:MM:SS)
                public string ToUniversalString() =>
                   $"{Hour:D2}:{Minute:D2}:{Second:D2}";

                // convert to string in standard-time format (H:MM:SS AM or PM)
                public override string ToString() =>
                   $"{((Hour == 0 || Hour == 12) ? 12 : Hour % 12)}:" +
                   $"{Minute:D2}:{Second:D2} {(Hour < 12 ? "AM" : "PM")}";
        }


            public static void Main(string[] args)
            {
                           var t1 = new Time2();
                var t2 = new Time2(2);
                var t3 = new Time2(21, 34);
                var t4 = new Time2(12, 25, 42);
                var t5 = new Time2(t4);
                t5.Hour = 15;
                t5.Minute = 30;
                t5.Second = 45;
                Console.WriteLine("t1:");
                Console.WriteLine($"{t1.ToUniversalString()}");
                Console.WriteLine($"{t1.ToString()}\n");
                Console.WriteLine("t2:");
                Console.WriteLine($"{t2.ToUniversalString()}");
                Console.WriteLine($"{t2.ToString()}\n");
                Console.WriteLine("t3:");
                Console.WriteLine($"{t3.ToUniversalString()}");
                Console.WriteLine($"{t3.ToString()}\n");
                Console.WriteLine("t4:");
                Console.WriteLine($"{t4.ToUniversalString()}");
                Console.WriteLine($"{t4.ToString()}\n");
                Console.WriteLine("t5:");
                Console.WriteLine($"{t5.ToUniversalString()}");
                Console.WriteLine($"{t5.ToString()}\n");

                Console.WriteLine("Hello, world!");
            }
}
}