# NHL Analytics

# Data Collection

Tableau Public Data Visualization: https://public.tableau.com/app/profile/justin.han2491/viz/NHLShootingPercentageAnalysis/Dashboard1

NHL stats API: https://gitlab.com/dword4/nhlapi

This project investigates scoring trends in the National Hockey Leagure (NHL) by tracking the Key Performance Indicator of Shot Percentage by clustered shooting region. Shot Percentage is defined as Goals Scored in cluster divided by Shots Taken in cluster.

Semi-structured data was in the form of a JSON response was extracted off NHL stats API. Both Google Apps Script and node.js Javascript were utilized in the data extraction process. The data was structured utilizing PL/SQL on Microsoft SSMS. Data visualization was conducted on Tableau Public. 

Data was modelled in scatter plots and density maps to find clusters with outlier high shot percentages and identify insights on undiscovered scoring opportunities.






