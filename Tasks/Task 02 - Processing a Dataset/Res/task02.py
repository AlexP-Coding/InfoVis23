import pandas as pd

# Read the files into DataFrames.
codes_df = pd.read_csv("src/country_codes.csv", encoding='latin1', delimiter=',')
gdp_df = pd.read_excel("src/Income by Country.xlsx", sheet_name="GDP per capita", thousands=",", na_values="..")

# Sort and remove duplicates while keeping the first record.
gdp_df.drop_duplicates(subset='Country', keep='first',inplace=True)

# Drop irrelevant column
gdp_df.drop(['Info'], axis=1, inplace=True)

# Generate the mean values of each country and add it as a new column.
gdp_df['mean_gdp'] = gdp_df.mean(axis=1, skipna=True, numeric_only=True)

# Merge with country code dataframe
output_df = gdp_df.merge(codes_df[['name', 'iso_3166-2']], left_on='Country', right_on='name')

# Drop irrelevant columns in the DataFrame.
years1990s = list(range(1990, 2006, 5))
years2010s = list(range(2010, 2018+1))
all_years = years1990s
all_years.extend(years2010s)
output_df.drop(['name'], axis=1, inplace=True)
output_df.drop(all_years, axis=1, inplace=True)

# Drop irrelevant rows in the DataFrame.
output_df.dropna(axis=0, subset='mean_gdp', inplace=True)

# Export as a csv.
output_df.to_csv('task02.csv', index=False, header=True)