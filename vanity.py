lst = list('0123456789abcdefABCDEF')
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
                                            db.write(hex1+hex2+hex3+hex4+hex5+hex6+hex7+hex8+hex9+hex10+'\n')