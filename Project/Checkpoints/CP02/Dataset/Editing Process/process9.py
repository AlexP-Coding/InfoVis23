import pandas as pd

dataframe = pd.read_csv("clean_data3.csv")
dataframeOG = pd.read_csv("data.csv")

dataframe['ResidenceName'] = dataframe['Residence']
dataframe.drop(columns=['Residence'], axis=1)
dataframe['Residence'] = None

def update_residence(df, df2):
    for index, row in df.iterrows():
        for index2, row2 in df2.iterrows():
            if df.loc[index, 'ResidenceName'] == df2.loc[index2, 'Residence']:
                df.loc[index, 'Residence'] = df2.loc[index2, 'Residence_ISO3']
               #print("Match found! " + df.loc[index, 'ResidenceName'] + " = " + df2.loc[index2, 'Residence'])
               #print(df.loc[index, 'Residence'])
                break
    return

def update_SPIN_M(df):
    for index, row in df.iterrows():
        if pd.isna(df.loc[index, 'SPIN_M']):
            df.loc[index, 'SPIN_M'] = '_None'
        elif df.loc[index, 'SPIN_M'] == 'Very Severe':
            df.loc[index, 'SPIN_M'] = 'VerySevere'
    return

update_residence(dataframe, dataframeOG)
update_SPIN_M(dataframe)
#Specify the file path where you want to save the CSV 

# Save the DataFrame to a CSV file
dataframe.to_csv('clean_data4.csv', index=False)  # Set index=False to exclude the index column