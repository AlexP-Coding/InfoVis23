import pandas as pd


def updateDict(dic):
    df = pd.read_csv("spin_results.csv")
    for index, row in df.iterrows():
        meaning = str(df.loc[index, 'Meaning'])
        if (meaning == 'nan'):
            meaning = 'None'
        minVal = int(df.loc[index, 'MinScore'])
        maxVal = int(df.loc[index, 'MaxScore'])
        dic[meaning] = [minVal, maxVal]

    return dic


def returnSPIN_T_Meaning(val: int,dic: dict):
    meaning = ""
    if (val == -1):
        return "Undefined"

    for item in dic.items():
        minScore = item[1][0]
        maxScore = item[1][1]

        if minScore <= val <= maxScore:
            meaning = item[0]
            return meaning
    return "Undefined"


def updateSPIN_T_Meaning(df, dic):
    for index, row in df.iterrows():
        spinT = int(df.at[index, 'SPIN_T']) 
        meaning = returnSPIN_T_Meaning(spinT, dic)
        df.loc[index, 'SPIN_M'] = meaning

    return


df_main = pd.read_csv("clean_data.csv")
df_main['SPIN_M'] = None
possibleMeanings = {}

updateDict(possibleMeanings)
print(possibleMeanings)
updateSPIN_T_Meaning(df_main, possibleMeanings)

df_main.to_csv('clean_data.csv', index=False)