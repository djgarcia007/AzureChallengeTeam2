# Login to Azure 
Connect-AzAccount

#- deploy template and parameters for storage account
New-AzResourceGroupDeployment -ResourceGroupName 'team2' -TemplateFile 'D:\Users\dorien.garcia\source\repos\AzureChallengeTeam2\template.json' -TemplateParameterFile 'D:\Users\dorien.garcia\source\repos\AzureChallengeTeam2\templateparameters.json'