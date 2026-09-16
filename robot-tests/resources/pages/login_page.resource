*** Settings ***
Library    Browser

Variables   ../..variables/common.robot

*** Variables ***
${EMAIL_INPUT}              [data-testid="email-input"]
${PASSWORD_INPUT}           [data-testid="password-input"]

*** Keywords ***
Go To Login Page
    Go To           ${BASE_URL}/auth

Fill Login Form
    [Arguments]    ${email}  ${password}
    Fill Text      ${EMAIL_INPUT}       ${email}
    Fill Text      ${PASSWORD_INPUT}    ${password}