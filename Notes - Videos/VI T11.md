# Complexity

Sometimes there is too much data, or untidy data

We can reduce complexity through:
- #Items
- #Attributes

## Filtering
Item-based/nr items/rows:
- Panning (show sub-parts, exclude parts outside viewport)
- Zooming (brushing - click and drag)

Attribute-based/nr attributes/columns:
- Select only the ones relevant for specific analysis
- Filter based on attribute value:
    - Slicing, represent one subset at a time (establishing a fixed value for one of the attributes and showing how things vary based on the rest) 
    - Cutting, like slicing but with v1 < x < v2 rather than x = v1 to see internal structure of what's left
    - Projections, for dimensionality/attribute reduction

- Aggregation (heatmap counts):
    - Have one, before we have "many"
    - Variations:
        - Sampling (pick most relevant of items within a specific group)
        - Statistics (average, median, count with histogram, binning, ...), but don't forget they may be hiding some content
        - Clustering (decide which item belongs to which cluster, then represent centroid of cluster)

Principal Component Analysis (find longest axis, then 2nd longest axis while fixing the 1st): 
- Remove items that are the same as the others (if things get too complex, users can't identify patterns or other relevant info)



# Evaluation
Aesthetics are important but the Vis needs to work too

## Interface Design
User Experience:
- Quality of experience while interacting with Vis (aesthetics are important here)

Usability:
- How efficiently and effectively users can achieve their tasks
- "The extent to which a product can be used by specified users to achieve specified goals with effectiveness, efficiency, and satisfaction in a specified context"

Conclusion:
- Achieve goals efficiently and effectively
- Achieve goals with satisfaction

## Methods
Analytical:
- Based on good practices which have been studied
- Predictive analysis (see if techniques used match the ones good for our items and tasks; not even needed to see Vis)
- Heuristic evaluation (sets of heuristics):
    - Nielsen's:
        - Information coding (everything properly mapped)
        - Minimal actions 
        - Flexibility
        - Orientation and help (user knows where theyre at and what they can do)
        - Spatial organization (aspect ratio and space needeed must be complied with)
        - Consistency of encodings
        - Recognition, not recall (of what we can do)
        - Prompting
        - Remove extraneous info
        - Dataset reduction (just use the data/attributes truly needed)
    -  Fixing:
        - 4-5 evaluators find poorly done things by themselves, then join them up
        - Can be performed early on
- Empirical/User eval:
1.   Give users pre-arranjed questions to answer
2. Measure:
    - Time taken
    - Mistakes (wrong answers, select wrong thing)

Utility:
- Ability to give useful answers
Usability:
- Easy to use to get useful answers
- Things that go against it:
    - Misleading
    - Bothersome
    - Tiresome