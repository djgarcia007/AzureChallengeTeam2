# Bypass execution policy
#Get-ChildItem *.ps1, *.psd1, *.ps1xml, *.psm1 -Recurse | Unblock-File

# Import Azure ARM TTK
#Import-Module ".\arm-ttk\arm-ttk\arm-ttk.psd1"

# Test Template
#Test-AzTemplate -TemplatePath 'D:\Users\dorien.garcia\source\repos\AzureDeploy\azuredeploy.json' | Out-File "testtemplateoutput.txt"

#- End of testing tool

# Login to Azure 
Connect-AzAccount

#- deploy template and parameters for storage account
New-AzResourceGroup -Name 'team2' -Location "eastus"
New-AzResourceGroupDeployment -ResourceGroupName 'team2' -TemplateFile 'D:\Users\dorien.garcia\source\repos\AzureChallengeTeam2\template.json' -TemplateParameterFile 'D:\Users\dorien.garcia\source\repos\AzureChallengeTeam2\templateparameters.json'