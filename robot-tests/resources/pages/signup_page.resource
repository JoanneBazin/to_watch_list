*** Settings ***
Library    Browser

*** Variables ***
${TOGGLE_AUTH_FORM}         [data-testid="toggle-auth-form"]
${NAME_INPUT}               [data-testid="name-input"]
${EMAIL_INPUT}              [data-testid="email-input"]
${PASSWORD_INPUT}           [data-testid="password-input"]

*** Keywords ***
Go To Signup Form
    Click           ${TOGGLE_AUTH_FORM}

Fill Signup Form
    [Arguments]    ${name}  ${email}  ${password}
    Fill Text      ${NAME_INPUT}        ${name}
    Fill Text      ${EMAIL_INPUT}       ${email}
    Fill Text      ${PASSWORD_INPUT}    ${password}