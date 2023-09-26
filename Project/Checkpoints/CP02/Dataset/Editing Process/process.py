import pandas as pd

df = pd.read_csv("data.csv")

def update_value(text):
    result = []

    if 'all' in text.lower() or 'everything' in text.lower():
        return 'all'

    if 'winning' in text.lower() or 'top' in text.lower() or 'goal' in text.lower() or 'win' in text.lower() or 'well' in text.lower() or 'competition' in text.lower() or 'competing' in text.lower():
        result.append('winning')
    if 'fun' in text.lower():
        result.append('having fun')
    if 'improving' in text.lower() or 'better' in text.lower() or 'learning' in text.lower() or 'improve' in text.lower() or 'satisfaction' in text.lower():
        result.append('improving')
    if 'relaxing' in text.lower() or 'relax' in text.lower() or 'distraction' in text.lower() or 'distracting' in text.lower() or 'time' in text.lower() or 'bored' in text.lower() or 'forgetting' in text.lower() or 'escaping' in text.lower():
        result.append('relaxing')
    if 'friends' in text.lower() or 'person' in text.lower() or 'people' in text.lower() or 'socializing' in text.lower() or 'cooperating' in text.lower() or 'team' in text.lower():
        result.append('playing with others')
    if 'habit' in text.lower():
        result.append('habit')

    if result:
       #print(f"Original Text: {text}")
       #print(f"Result: {result}")
        return ' and '.join(result)
    return text

df['whyplay'] = df['whyplay'].apply(update_value)

def not_changed(text2):
    
    if 'all' not in text2.lower() and 'winning' not in text2.lower() and 'having fun' not in text2.lower() and 'improving' not in text2.lower() and 'relaxing' not in text2.lower() and 'playing with others' not in text2.lower() and 'habit' not in text2.lower():
      return True
    return False

for index, row in df.iterrows():
    if not_changed(row['whyplay']):
        print(f"Index: {index}")
        print(f"Whyplay: {row['whyplay']}")  

#Specify the file path where you want to save the CSV 

# Save the DataFrame to a CSV file
df.to_csv('output.csv', index=False)  # Set index=False to exclude the index column
