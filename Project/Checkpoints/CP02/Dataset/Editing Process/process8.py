import pandas as pd

dataframe = pd.read_csv("clean_data2.csv")

def update_whyplay(df):
    for index, row in df.iterrows():
        if (',' in df.loc[index, 'whyplay']):
            df.loc[index, 'whyplay'] = 'various'


update_whyplay(dataframe)
#Specify the file path where you want to save the CSV 

# Save the DataFrame to a CSV file
dataframe.to_csv('clean_data3.csv', index=False)  # Set index=False to exclude the index column