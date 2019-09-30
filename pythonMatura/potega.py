with open("Dane_PR2\liczby.txt", "rt") as myfile:  
    contents = myfile.read()
#print(contents)

import math
num = 82

logliczby = math.log(num)
logpodstawy = math.log(3)
log3liczby = logliczby / logpodstawy

if(math.ceil(log3liczby) == math.floor(log3liczby)):
    print(num, "jest potega liczby 3")
else:
    print(num, "nie jest potega liczby 3")
