arr = []
with open("Dane_PR2\liczby.txt","rt") as file:
    for line in file:
        arr.append(line)

print(arr[1])
import math
num = 53
length = len(str(num))
eq = 1

res = [int(x) for x in str(arr[1])]
print("zbior 1 liczby",res)

if(eq == arr[1]):
    print(eq)

#print(math.factorial(3))
print(eq)
