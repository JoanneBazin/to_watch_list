*** Settings ***
Library    Browser

*** Variables ***
${EMAIL_INPUT}              [data-testid="email-input"]
${PASSWORD_INPUT}           [data-testid="password-input"]

*** Keywords ***
Fill Login Form
    [Arguments]    ${email}  ${password}
    Fill Text      ${EMAIL_INPUT}       ${email}
    Fill Text      ${PASSWORD_INPUT}    ${password}