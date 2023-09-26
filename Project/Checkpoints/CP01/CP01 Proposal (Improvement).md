# Checkpoint I: Project Proposal

## Domain
The popularity of online games has been increasing in recent years due to easy internet access – to the point where games that have traditionally been single-player are being modified to incorporate some form of online gameplay.

Typically, these online games are played with other gamers in competitive or collaborative modes.

The social interactions that some of these games require can have an impact on people's lifestyle. Depending on the playstyle, gamers sometimes need to talk, give directions and collaborate with both strangers and friends in order to succeed.
However, the same way gaming can be used to create a sense of community and belonging through the interactions above, it may also be a tool of self-isolation (by reducing contact with real-life people, in the case of non-local multiplayer games).

Given these social requirements and usage variations, we aim to analyze the impact, in terms of anxiety (general anxiety and social phobia), that online games have on the community of people that play games regularly, and whether their motivation for play and location correlate to this condition.


## Dataset Description
- There is a single dataset, with information collected as part of a survey among gamers worldwide. This survey asked questions that psychologists generally ask people as a base for a diagnosis on general anxiety disorder and social phobia, as well as questions regarding the participant’s  demographic and play (for a total of 13.464 items and 55 attributes). For the Vis’ purpose, we’ve selected 34 to visualize, and will derive the necessary data directly in the Vis’ algorithm.
- The data selected includes information about the participant’s:  
    - Survey participant id, gender, age, work status, and country of residence;
    - Preferred play style (multiplayer, online, …), playmates (friends, strangers), and play motivation (winning, fun, …) – the content of which will be filtered, as the answers on this portion of the survey had an open-ended component;
    - GAD (General Anxiety Disorder) and SPIN (Social Phobia Inventory) test scores – global, and per symptom.
- The original dataset and survey are available at https://www.kaggle.com/datasets/divyansh22/online-gaming-anxiety-data and https://osf.io/vnbxk/?view_only=. We will build a smaller dataset containing only the selected attributes, and replace the GAD and SPIN test symptom ids to their string equivalents (e.g.: GAD4 = “Trouble relaxing”) so users of our Vis can understand the scores’ meaning.

## Example Questions
In order to analyze the impact of online gaming on anxiety levels in the gaming community, we put together a few relevant questions to be answered in our visualization:
- Do people who play online with friends tend to experience less social phobia than people who do so with strangers? (Explore whether physical human presence during gaming is correlated to lesser social phobia)
- How does the prevalence of social phobia symptoms vary throughout countries across different player ages? (Explore the distribution of several social phobia symptoms per country, within a variable age range)
- Environments like school and work are used to socialize. Do players who are unemployed play online multiplayer games with strangers more often than those who are not? (Explore whether humans tend to search for human interaction when this is not made readily available to them)
- Given a similar amount of hours played, do victory-motivated players have less general anxiety disorder symptoms than fun-motivated players? (Explore trend variation of anxiety disorder symptoms in players with different play motivation)
- How do levels of social phobia change between genders, for each playing style? (Explore the difference between social phobia levels according to gender)

## Data Sample
(from “GamingStudy_data.csv”)
| S.No | Hours | Playstyle                               | Age |
|------|-------|-------------------------------------|-----|
| 86   | 10    | Multiplayer <br>- Online  <br>- With Friends | 30  |

| S.No | SPIN1 | SPIN2 | AGE | Residence | SPIN_T |
|------|-------|-------|-----|-----------|--------|
| 86   | 1     | 4     | 20  | USA       | 30     |

| S.No | Hours | Playstyle    | Work     |
|------|-------|--------------|----------|
| 8    | 25    | Singleplayer | Employed |

| S.No | GAD1 | GAD2 | Hours | WhyPlay    | GAD_T |
|------|------|------|-------|------------|-------|
| 8    | 0    | 0    | 25    | Having Fun | NA    |

| S.No | SPIN1 | SPIN2 | Gender | Playstyle                             | SPIN_T |
|------|-------|-------|--------|---------------------------------------|--------|
| 86   | 1     | 4     | Female | Multiplayer <br>- Online<br>- With Friends | 30     |

