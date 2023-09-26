import pandas as pd

dataframe = pd.read_csv("modified_data.csv")
def create_whyplay_several(df):
    df['whyplay_winning'] = None
    df['whyplay_fun'] = None
    df['whyplay_improving'] = None
    df['whyplay_relaxing'] = None
    df['whyplay_otherpeople'] = None
    df['whyplay_habit'] = None

def update_whyplay_several(text):
    result = ['No', 'No', 'No', 'No', 'No', 'No']
    yes_val = 'Yes'

    if ('all' in text.lower()):
        result = ['Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes']
        return result
    if ('winning' in text.lower()):
        result[0] = yes_val
    if ('having fun' in text.lower()):
        result[1] = yes_val
    if ('improving' in text.lower()):
        result[2] = yes_val
    if ('relaxing' in text.lower()):
        result[3] = yes_val
    if ('playing with others' in text.lower()):
        result[4] = yes_val
    if ('habit' in text.lower()):
        result[5] = yes_val

    return result
    

def update_whyplay(df):
    for index, row in df.iterrows():
        result = update_whyplay_several(row['whyplay'])
        df.loc[index, 'whyplay_winning'] = result[0]
        df.loc[index, 'whyplay_fun'] = result[1]
        df.loc[index, 'whyplay_improving'] =result[2]
        df.loc[index, 'whyplay_relaxing'] = result[3]
        df.loc[index, 'whyplay_otherpeople'] = result[4]
        df.loc[index, 'whyplay_habit'] = result[5]


def clean_attributes(df):
    for index, row in df.iterrows():
        clean_attr(df, index, ['Hours'], -1)
        clean_attr(df, index, ['GAD_T', 'SPIN_T'], -1)
        clean_attr(df, index, ['SPIN1', 'SPIN2', 'SPIN3', 'SPIN4', 'SPIN5', 'SPIN6', 'SPIN7', 'SPIN8', 'SPIN9', 'SPIN10', 'SPIN11', 'SPIN12','SPIN13', 'SPIN14', 'SPIN15', 'SPIN16', 'SPIN17'], -1)
        clean_attr(df, index, ['Work', 'Residence'], 'Undefined') 
        clean_attr(df, index, ['Multiplayer', 'Online'], 'Undefined') 

def clean_attr(df, index, ids, val):
    for id in ids:
        valComp = df.loc[index, id]
        
        if (valComp == None or pd.isna(valComp) or valComp == 'Unknown'):
            df.loc[index, id] = val

def createQuestionIds(prefix, nrQuestions):
    ids = []
    for i in range(1, nrQuestions+1):
        currentQuestion = prefix + str(i)
        ids.append(currentQuestion)

    return ids

def createSPINQuestionMeaning():
    meanings = []

    meanings.append('I am afraid of people in authority.')
    meanings.append('I am bothered by blushing in front of people.')
    meanings.append('Parties and social events scare me.')
    meanings.append('I avoid talking to people I don’t know.')
    meanings.append('Being criticized scares me a lot.')
    meanings.append('I avoid doing things or speaking to people for fear of embarrassment.')
    meanings.append('Sweating in front of people causes me distress.')
    meanings.append('I avoid going to parties.')
    meanings.append('I avoid activities in which I am the center of attention.')
    meanings.append('Talking to strangers scares me.')
    meanings.append('I avoid having to give speeches.')
    meanings.append('I would do anything to avoid being criticized.')
    meanings.append('Heart palpitations bother me when I am around people.')
    meanings.append('I am afraid of doing things when people might be watching.')
    meanings.append('Being embarrassed or looking stupid are among my worst fears.')
    meanings.append('I avoid speaking to anyone in authority.')
    meanings.append('Trembling or shaking in front of others is distressing to me.')
    return meanings

def createGADQuestionMeaning():
    meanings = []

    meanings.append('Feeling nervous, anxious, or on edge.')
    meanings.append('Not being able to stop or control worrying.')
    meanings.append('Worrying too much about different things.')
    meanings.append('Trouble relaxing.')
    meanings.append('Being so restless that it\'s hard to sit still.')
    meanings.append('Becoming easily annoyed or irritable.')
    meanings.append('Feeling afraid as if something awful might happen.')
    return meanings

def createGADdata():
    gadQ_data = []
    GAD_ids = createQuestionIds("GAD", 7)
    GAD_meanings = createGADQuestionMeaning()
    print(GAD_ids)
    print(GAD_meanings)
    for i, j in GAD_ids, GAD_meanings:
        gadQ_data.append([i, j])

    return gadQ_data

def createSPINdata():
    SPINQ_data = []
    SPIN_ids = createQuestionIds("SPIN", 17)
    SPIN_meanings = createSPINQuestionMeaning()
    print(SPIN_ids)
    print(SPIN_meanings)
    for i, j in zip(SPIN_ids, SPIN_meanings):
        SPINQ_data.append([i, j])

    return SPINQ_data



create_whyplay_several(dataframe)
update_whyplay(dataframe)
dataframe = dataframe.drop(columns=['Unnamed: 0', 'whyplay', 'Residence_ISO3', 'Birthplace_ISO3'], axis=1)
clean_attributes(dataframe)

data_aGAD = [[0, 'Not at all'], [1, 'Several days'], [2, 'Over half the days'], [3, 'Nearly every day']]
dataframe_aGAD = pd.DataFrame(data_aGAD, columns=['Answer Id', 'Meaning'])

data_aSPIN = [[0, 'Not at all'], [1, 'A little bit'], [2, 'Somewhat'], [3, 'Very much'],  [4, 'Severely']]
dataframe_aSPIN = pd.DataFrame(data_aSPIN, columns=['Answer Id', 'Meaning'])

data_qGAD= createGADdata()
dataframe_qGAD = pd.DataFrame(data_qGAD, columns=['Question Id', 'Meaning'])


data_qSPIN = createSPINdata()
dataframe_qSPIN = pd.DataFrame(data_qSPIN, columns=['Question Id', 'Meaning'])


#Specify the file path where you want to save the CSV 

# Save the DataFrame to a CSV file
dataframe.to_csv('clean_data.csv', index=False)  # Set index=False to exclude the index column
dataframe_aGAD.to_csv('gad_answers.csv', index=False)
dataframe_aSPIN.to_csv('spin_answers.csv', index=False)
dataframe_qGAD.to_csv('gad_questions.csv', index=False)
dataframe_qSPIN.to_csv('spin_questions.csv', index=False)
