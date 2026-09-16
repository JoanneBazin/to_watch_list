*** Settings ***
Library    Browser

*** Variables ***
${SUBMIT_BTN}         [data-testid="auth-submit"]
${AUTH_ERROR}         [data-testid="auth-error"]

*** Keywords ***
Auth Page Is Displayed
    Get Url     contains    /auth

Submit Auth Form
    Click    ${SUBMIT_BTN}

Auth Error Message Is Displayed
    Auth Page Is Displayed
    Get Element States    ${AUTH_ERROR}      contains    visible

Validation Error Message Is Displayed
    [Arguments]    ${field}
    Auth Page Is Displayed
    Get Element States    [data-testid="${field}-validation-error"]    contains    visible