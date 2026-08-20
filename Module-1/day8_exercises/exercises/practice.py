

def total(nums):
    if len(nums) == 0:  # base case
        return 0
    return nums[0] + total(nums[1:])  # recursive case


def count_down(n):
    if n < 1:  # base case
        return
    print(n)
    count_down(n - 1)  # recursive case


print(total([100, 250, 400]))
count_down(5)

print("--------------------------------------------------")

# 2. Binary search

def binary_search(items, target):
    lo, hi = 0, len(items) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1


balances = [200, 450, 800, 1200, 1500, 3000, 4200]

print(binary_search(balances, 1500))  # should find it
print(binary_search(balances, 999))   # not present, should be -1

print("--------------------------------------------------")

# 3. Merge sort

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result


def merge_sort(items):
    if len(items) <= 1:  # base case
        return items
    mid = len(items) // 2
    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])
    return merge(left, right)


import random

random_list = random.sample(range(1, 1000), 15)
print(f"Unsorted: {random_list}")
print(f"merge_sort: {merge_sort(random_list)}")
print(f"sorted():  {sorted(random_list)}")
print(f"Match: {merge_sort(random_list) == sorted(random_list)}")

print("--------------------------------------------------")

# 4. Sort with a key

accounts = [("Abebe", 1200), ("Sara", 4500), ("Kebede", 800), ("Mimi", 3000)]

sorted_accounts = sorted(accounts, key=lambda acc: acc[1], reverse=True)
print(sorted_accounts)

print("--------------------------------------------------")

# 5. Two pointers

def has_pair(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        s = nums[lo] + nums[hi]
        if s == target:
            return True
        elif s < target:
            lo += 1
        else:
            hi -= 1
    return False


sorted_nums = [100, 250, 400, 600, 900]

print(has_pair(sorted_nums, 1000))  
print(has_pair(sorted_nums, 50))    