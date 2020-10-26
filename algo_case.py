import math

# 1: Create a function that, given a list of integers, 
# returns the highest product between three of those numbers.
# For example, given the list [1, 10, 2, 6, 5, 3] the highest product would be 10 * 6 * 5 = 300


def highest_prod(arr):
    #The 3 highest positive integers, index 0: highest --> index 2: lowest; [3, 2, 1]
    highest = [-math.inf]*3
    
    #2 highest abs(negative integers), index 0: lower --> index 2: lowest; [-3, -2]
    lowest = [math.inf]*2

    for i in range(len(arr)):
        if(arr[i] > highest[0]):
            highest.insert(0, arr[i])
        elif(arr[i] > highest[1]):
            highest.insert(1, arr[i])
        elif(arr[i] > highest[2]):
             highest.insert(2, arr[i])
        
        if(arr[i] < lowest[0]):
            lowest.insert(0, arr[i])
        elif(arr[i] < lowest[1]):
            lowest.insert(1, arr[i])

    # Checks the two negative integers
    if lowest[0]*lowest[1] > highest[1]*highest[2]:
        highest[1], highest[2] = lowest[0], lowest[1]

    return highest[0]*highest[1]*highest[2]



