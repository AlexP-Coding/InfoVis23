import pandas as pd

dataframe = pd.read_csv("clean_data4.csv")

def update_residence_SPINM(df):
    for index, row in df.iterrows():
        if pd.isna(df.loc[index, 'Residence']):
            df.loc[index, 'Residence'] = 'Undefined'
        elif df.loc[index, 'SPIN_M'] == 'Very severe':
            df.loc[index, 'SPIN_M'] = 'VerySevere'

update_residence_SPINM(dataframe)
#Specify the file path where you want to save the CSV 

# Save the DataFrame to a CSV file
dataframe.to_csv('clean_data5.csv', index=False)  # Set index=False to exclude the index column