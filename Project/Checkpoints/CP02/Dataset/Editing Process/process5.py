import pandas as pd

def createQuestionIds(prefix, nrQuestions):
    ids = []
    for i in range(1, nrQuestions+1):
        currentQuestion = prefix + str(i)
        ids.append(currentQuestion)

    return ids

dataframe = pd.read_csv("clean_data.csv")
gadIds = createQuestionIds("GAD", 7)
gadIds.append('GAD_T')
dataframe = dataframe.drop(columns=gadIds, axis=1)

dataframe.to_csv('clean_data.csv', index=False)
