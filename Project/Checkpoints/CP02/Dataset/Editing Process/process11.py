import pandas as pd

dataframe = pd.read_csv("clean_data5.csv")
dataframe['ResidenceISO'] = dataframe['Residence']
dataframe['Residence'] = dataframe['ResidenceName']
dataframe = dataframe.drop(columns=['ResidenceName'], axis=1)


# Save the DataFrame to a CSV file
dataframe.to_csv('clean_data7.csv', index=False)  # Set index=False to exclude the index column

