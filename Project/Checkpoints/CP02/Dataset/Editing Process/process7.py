import pandas as pd

dataframe = pd.read_csv("clean_data.csv")
dataframe['whyplay'] = None

def update_whyplay(df):
    for index, row in df.iterrows():
        result = ''
        ogResult = []

        ogResult.append(df['whyplay_winning'])
        ogResult.append(df['whyplay_fun'] )
        ogResult.append(df['whyplay_improving'])
        ogResult.append(df['whyplay_relaxing'])
        ogResult.append(df['whyplay_otherpeople'])
        ogResult.append(df['whyplay_habit'])

        if all(str(txt)== 'Yes' for txt in ogResult):
            df.loc[index, 'whyplay'] = 'all'   
        else:
            if (df.loc[index, 'whyplay_winning'] == 'Yes'):
                result = result + 'winning, '
            if (df.loc[index, 'whyplay_fun'] == 'Yes'):
                result = result + 'fun, '
            if (df.loc[index, 'whyplay_improving'] == 'Yes'):
                result = result + 'improving, '
            if (df.loc[index, 'whyplay_relaxing'] == 'Yes'):
                result = result + 'relaxing, '
            if (df.loc[index, 'whyplay_habit'] == 'Yes'):
                result = result + 'habit, '

            if result == '':
                result = 'Undefined'
            else: 
                result = result[:-2]
            
            df.loc[index, 'whyplay'] = result


update_whyplay(dataframe)
dataframe = dataframe.drop(columns=['whyplay_winning', 'whyplay_fun', 'whyplay_relaxing', 'whyplay_improving', 'whyplay_otherpeople', 'whyplay_habit'], axis=1)

#Specify the file path where you want to save the CSV 

# Save the DataFrame to a CSV file
dataframe.to_csv('clean_data2.csv', index=False)  # Set index=False to exclude the index column