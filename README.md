# NHL_Analytics

#Data collection

This project scoring trends in the National Hockey Leagure (NHL) by tracking shots taken and goals scored.

The project utilizes Google Apps Script, a cloud based Javascript platform, to extract data from an NHL statistics API.

The API can be found here: https://gitlab.com/dword4/nhlapi

Data on "goals" and "shots" shooting coordinates are extracted for Exploratory Data Analysis.

The example code provided extract data from the first 12 games in the 2019-2020 NHL season. 

# Data Cleaning
CSV files from the data extracted for the first 12 games are provided.

The data is currently stored as separate csv files, and is all stored as rows.

Python pandas will be used to transpose the data and provide id numbers for shots and goals. However, this is still in progress.

As of now, id numbers and transposing have been done on Microsoft Excel.

# Data visualization
Through Tableau Public, a dashboard has been created comparing density maps of shots taken and goals scored.

# Exploratory Data Analysis comments
The sample game size of 12 is too small extract meaningful insights. However, the current data has shown a high volume of shots taken in x,y coordinates of (-30,0) to (-60,-20), with few goals scored in that region. This may indicate players who take shots in those region may provide less value overall in terms of goals scored. 




