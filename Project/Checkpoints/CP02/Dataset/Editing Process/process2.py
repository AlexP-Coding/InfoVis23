import pandas as pd

df = pd.read_csv("output2.csv")

df['Multiplayer'] = None
df['Online'] = None
df['Relation'] = None


def update_value(text):

    result=[None,None,None]    

    if ('all' in text.lower() and 'call' not in text.lower() and 'equally' not in text.lower() and 'usually' not in text.lower() and 'alludes' not in text.lower()) or 'm'==text.lower() or "i'm versatile" in text.lower() or 'everything almost equally' in text.lower() or 'depends' == text.lower() or 'everything' == text.lower() or 'usually combination of all' == text.lower() or 'an equal mix' in text.lower() or 'i do te 5 choices above' in text.lower():
        m3 = 'various'
        result = ['both','both', m3]
    elif 'watching' in text.lower() or 'Porn' in text:
        m3 = 'various'
        result = ['no','yes', m3]
    elif 'with my partner' in text.lower():
        m3 = 'friends'
        result = ['no','no', m3]
    elif 'multiplayer 2&3' in text.lower():
        m3 = 'various'
        result = ['yes','both',m3]
    elif 'online-both 4 and 5'in text.lower() or 'the last 2' in text.lower():
        m3 = 'various'
        result = ['yes','both',m3]
    elif 'let me cross more stuff. sp and mp equally'in text.lower() or 'As much Online as Offline' in text:
        m3 = 'various'
        result = ['yes','both',m3]
    elif 'league' == text.lower():
        m3 = 'various'
        result = ['yes','yes',m3]
    elif 'everything from above in the same amount'in text.lower():
        m3 = 'various'
        result = ['both','both',m3]
    elif 'mostly multiplayer but a bit each reply-option'in text.lower():
        m3 = 'various'
        result = ['yes','both',m3]
    elif 'options 3,4 & 5' in text.lower() or 'last 3 options' in text.lower():
        m3 = 'various'
        result = ['both','both', m3]
    elif 'mix of the last 2 options' in text.lower() or '3 last options.' in text.lower() or 'mix of the last 3' == text.lower():
        m3 = 'various'
        result = ['both','both', m3]
    elif 'Multiplayer, such as League of Legends, and then many single-player steam games like Skyrim, Binding of Isaac, Borderlands, etc.' in text:
        m3 = 'various'
        result = ['both','both', m3]
    elif 'Both Offline and Online' in text or 'Both'==text:
        m3 = 'various'
        result = ['both','both', m3]
    elif 'with my ear' in text:
        m3 = 'alone'
        result = ['no','no', m3]
    elif 'aram' in text or 'Yolo queue' in text:
        m3 = 'strangers'
        result = ['yes','yes', m3]
    elif "It's an online game" in text:
        m3 = 'strangers'
        result = ['yes','yes', m3]
    elif "online - duo - ranked with friend." in text:
        m3 = 'friends'
        result = ['yes','yes', m3]
    else:
        m3 = []

    if 'multiplayer' in text.lower() or 'rlf' in text.lower() or 'matchmaking' in text.lower() or 'co-op' in text.lower() or 'multi' in text.lower() or 'one person' == text.lower():
        result[0] = 'yes'

    if 'singleplayer' in text.lower() or 'solo' in text.lower() or 'single' in text.lower() or 'single player' in text.lower() or 'multiplayer with bots' in text.lower():
        result[0] = 'no'

    if ('multiplayer' in text.lower() and 'singleplayer' in text.lower()) or ('multi' in text.lower() and 'single' in text.lower()):
        result[0] = 'both'

    if 'online' in text.lower() or 'matchmaking' in text.lower() or 'one person' == text.lower():
        result[1] = 'yes'
    
    if 'offline' in text.lower() or 'multiplayer' not in text.lower() or 'multiplayer with bots' in text.lower():
        result[1] = 'no'

    if 'online' in text.lower() and 'offline' in text.lower() or 'rlf' in text.lower() or 'co-op' in text.lower():
        result[1] = 'both'

    if 'strangers'in text.lower() or 'rlf' in text.lower() or 'matchmaking' in text.lower() or 'stragers' in text.lower() or 'randomers' in text.lower(): ##RLF and making a living
        m3.append('strangers')

    if 'online acquaintances' in text.lower() or 'teammates' in text.lower() or 'online friends' in text.lower() or 'with friend i never met' in text.lower() or 'internet buddies'in text.lower() or 'acquaintances' in text.lower():
        m3.append('online acquaintaces')

    if 'singleplayer' in text.lower() or 'alone' in text.lower() or 'solo' in text.lower() or 'single player' in text.lower() or 'multiplayer with bots' in text.lower():
        m3.append('alone')

    if 'real life friends' in text.lower() or 'same room' in text.lower() or ('friends' in text.lower() and 'online friends' not in text.lower()) or 'rlf' in text.lower() or 'co-op' in text.lower() or 'gf' in text.lower() or 'one person' == text.lower():
        m3.append('friends')

    if 'varying multiplayer online' in text.lower() or 'people in and not in the room' in text.lower(): #Caso específico 
        m3.append('various') 

    if 'single/multi' in text.lower(): #Caso específico 
        m3.append('various') 
    
    if 'a bit of everything mostly multiplayer games tho' in text.lower(): #Caso específico 
        m3.append('various') 

    if 'various' in text.lower() or 'Multiplayer - online - mix' == text: #Caso específico 
        m3.append('various')

    if 'multiplayer, various' in text.lower():
        result[1] = 'both'


    if len(m3) > 1 :
        result[2] = 'various'
    
    if len(m3) <= 1:
        result[2] = m3[0]

    

    

    return result

for index, row in df.iterrows():
    result = update_value(row['Playstyle'])
    df.loc[index, 'Multiplayer'] = result[0]
    df.loc[index, 'Online'] = result[1]
    df.loc[index,'Relation'] = result[2]
print(df[['Multiplayer','Online','Relation']])


df = df.drop(columns=['Playstyle'])

# Save the modified DataFrame to a new CSV file
df.to_csv("modified_data.csv", index=False)




