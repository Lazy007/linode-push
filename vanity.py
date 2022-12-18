from bit import Key
lst = list('0123456789abcdef')
with open('allhex.txt','a') as db:
for hex1 in lst:
for hex2 in lst:
for hex3 in lst:
for hex4 in lst:
for hex5 in lst:
for hex6 in lst:
for hex7 in lst:
for hex8 in lst:
for hex9 in lst:
for hex10 in lst:
for hex11 in lst:
for hex12 in lst:
for hex13 in lst:
for hex14 in lst:
for hex15 in lst:
for hex16 in lst:
hexxed = '000000000000000000000000000000000000000000000003'+hex1+hex2+hex3+hex4+hex5+hex6+hex7+hex8+hex9+hex10+hex11+hex12+hex13+hex14+hex15+hex16+'\n')
Private_Key = Key.from_hex(hexxed)
addr = Private_Key.address
count += 1
iffer = '19ES2QDGNnqPxcArmvhYMvYDDU62YnZPLu'
if addr == iffer:
    found += 1
    with open('FoundValue.txt', 'a') as vf:
    vf.write(f" {addr}        \n {Privatekey}\n {'=' * 55}\n")
    vf.close()
    else :
    print(f" {count} Address: {addr} \n {Privatekey}")